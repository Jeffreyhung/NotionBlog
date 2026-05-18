import BLOG from '@/blog.config'
import useNotification from '@/components/Notification'
import TechGrow from '@/components/TechGrow'
import { siteConfig } from '@/lib/config'
import { resolvePostProps } from '@/lib/db/SiteDataApi'
import { isExport } from '@/lib/utils/buildMode'
import { useGlobal } from '@/lib/global'
import { getPageTableOfContents } from '@/lib/db/notion/getPageTableOfContents'
import {
  getPasswordQuery,
  getPasswordStoragePath,
  sha256Digest
} from '@/lib/utils/password'
import { checkSlugHasNoSlash } from '@/lib/utils/post'
import { DynamicLayout } from '@/themes/theme'
import md5 from 'js-md5'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { getStaticPathsBase } from '@/lib/build/staticPaths'

/**
 * 根据notion的slug访问页面
 * 只解析一级目录例如 /about
 * @param {*} props
 * @returns
 */
const Slug = props => {
  const { post } = props
  const router = useRouter()
  const { locale } = useGlobal()

  // 文章锁🔐
  const [lock, setLock] = useState(post?.password && post?.password !== '')
  const { showNotification, Notification } = useNotification()

  /**
   * 验证文章密码
   * @param {*} passInput
   */
  const validPassword = passInput => {
    if (!post) {
      return false
    }
    const passHash = sha256Digest(passInput)
    const legacy = md5(String(post?.slug ?? '') + passInput)
    // 兼容两类输入：明文（手动输入）与摘要（从本地存储/URL历史读取）
    const isValidBySha256 = passHash === post?.password || passInput === post?.password
    const isValidByLegacy = legacy === post?.password
    if (isValidBySha256 || isValidByLegacy) {
      setLock(false)
      // 输入密码仅存摘要到 localStorage；键仅含 pathname，避免 query/hash 导致读写不一致（PR #3389）
      localStorage.setItem(
        'password_' + getPasswordStoragePath(router.asPath),
        passHash
      )
      showNotification(locale.COMMON.ARTICLE_UNLOCK_TIPS) // 设置解锁成功提示显示
      return true
    }
    return false
  }

  // 文章加载
  useEffect(() => {
    // 文章加密
    if (post?.password && post?.password !== '') {
      setLock(true)
    } else {
      setLock(false)
    }

    // 读取上次记录 自动提交密码
    const passInputs = getPasswordQuery(router.asPath)
    if (passInputs.length > 0) {
      for (const passInput of passInputs) {
        if (validPassword(passInput)) {
          break // 密码验证成功，停止尝试
        }
      }
    }
  }, [post])

  // 文章加载
  useEffect(() => {
    if (lock) {
      return
    }
    // 文章解锁后生成目录与内容
    if (post?.blockMap?.block) {
      post.content = Object.keys(post.blockMap.block).filter(
        key => post.blockMap.block[key]?.value?.parent_id === post.id
      )
      post.toc = getPageTableOfContents(post, post.blockMap)
    }
  }, [router, lock])

  props = { ...props, lock, validPassword }
  const theme = siteConfig('THEME', BLOG.THEME, props.NOTION_CONFIG)
  return (
    <>
      {/* 文章布局 */}
      <DynamicLayout theme={theme} layoutName='LayoutSlug' {...props} />
      {/* 解锁密码提示框 */}
      {post?.password && post?.password !== '' && !lock && <Notification />}
      {/* 导流工具 */}
      <TechGrow lock={lock} />
    </>
  )
}

Slug.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    slug: PropTypes.string,
    password: PropTypes.string,
    content: PropTypes.array,
    toc: PropTypes.array,
    blockMap: PropTypes.shape({
      block: PropTypes.object
    })
  }),
  NOTION_CONFIG: PropTypes.object
}

export async function getStaticPaths() {
  return getStaticPathsBase({
    from: 'slug-paths',
    filterFn: row => checkSlugHasNoSlash(row),
    mapPageToParams: row => ({ params: { prefix: row.slug } })
  })
}

export async function getStaticProps({ params: { prefix }, locale }) {
  const props = await resolvePostProps({
    prefix,
    locale,
  })

  return {
    props,
    revalidate: isExport()
      ? undefined
      : siteConfig(
        'NEXT_REVALIDATE_SECOND',
        BLOG.NEXT_REVALIDATE_SECOND,
        props.NOTION_CONFIG
      ),
    notFound: !props.post
  }
}

export default Slug
