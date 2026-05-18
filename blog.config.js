// 注: process.env.XX是Vercel的环境变量，配置方式见：https://docs.tangly1024.com/article/how-to-config-notion-next#c4768010ae7d44609b744e79e2f9959a

const BLOG = {
  // Important page_id！！！Duplicate Template from  https://www.notion.so/tanghh/02ab3b8678004aa69e9e415905ef32a5
  API_BASE_URL: process.env.API_BASE_URL || 'https://www.notion.so/api/v3', // API默认请求地址,可以配置成自己的地址例如：https://[xxxxx].notion.site/api/v3
  NOTION_PAGE_ID: process.env.NOTION_PAGE_ID || '',
  PSEUDO_STATIC: false, // 伪静态路径，开启后所有文章URL都以 .html 结尾。
  NEXT_REVALIDATE_SECOND: process.env.NEXT_PUBLIC_REVALIDATE_SECOND || 5, // 更新内容缓存间隔 单位(秒)；即每个页面有5秒的纯静态期、此期间无论多少次访问都不会抓取notion数据；调大该值有助于节省Vercel资源、同时提升访问速率，但也会使文章更新有延迟。
  THEME: 'hexo', // 主题， 支持 ['next','hexo',"fukasawa','medium','example'] @see https://preview.tangly1024.com
  THEME_SWITCH: false, // 是否显示切换主题按钮
  LANG: 'en-US', // e.g 'zh-TW','en-US'  see /lib/lang.js for more.
  SINCE: 2022, // e.g if leave this empty, current year will be used.
  APPEARANCE: 'light', // ['light', 'dark', 'auto'], // light 日间模式 ， dark夜间模式， auto根据时间和主题自动夜间模式

  AUTHOR: 'Jeffrey Hung', 
  BIO: '', 
  LINK: 'https://blog.jeffreyhung.com', 
  KEYWORDS: 'Notion, blog', 
  // 社交链接，不需要可留空白，例如 CONTACT_WEIBO:''
  CONTACT_EMAIL: 'contact@jeffreyhung[.]com',
  CONTACT_GITHUB: 'https://github.com/jeffreyhung',

  // 网站字体
  FONT_STYLE: 'font-sans', // ['font-serif','font-sans'] 两种可选，分别是衬线和无衬线: 参考 https://www.jianshu.com/p/55e410bd2115
  FONT_URL: [// 字体CSS 例如 https://npm.elemecdn.com/lxgw-wenkai-webfont@1.6.0/style.css
    'https://fonts.googleapis.com/css?family=Bitter&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@500&display=swap',
    'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500&display=swap'
  ],
  FONT_SANS: [// 无衬线字体 例如'LXGW WenKai'
    'Bitter', '"PingFang SC"', '-apple-system', 'BlinkMacSystemFont', '"Hiragino Sans GB"',
    '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Segoe UI"', '"Noto Sans SC"', 'HarmonyOS_Regular',
    '"Microsoft YaHei"', '"Helvetica Neue"', 'Helvetica', '"Source Han Sans SC"',
    'Arial', 'sans-serif', '"Apple Color Emoji"'],
  FONT_SERIF: [// 衬线字体 例如'LXGW WenKai'
    'Bitter', '"Noto Serif SC"', 'SimSun', '"Times New Roman"', 'Times', 'serif',
    '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Apple Color Emoji"'],
  FONT_AWESOME: '/css/all.min.css', // font-awesome 字体图标地址

  APPEARANCE_DARK_TIME: process.env.NEXT_PUBLIC_APPEARANCE_DARK_TIME || [18, 6],
  BLOG_FAVICON: process.env.NEXT_PUBLIC_FAVICON || '/favicon.ico',
  ENABLE_RSS: process.env.NEXT_PUBLIC_ENABLE_RSS || true,
  CUSTOM_MENU: process.env.NEXT_PUBLIC_CUSTOM_MENU || true,
  CAN_COPY: process.env.NEXT_PUBLIC_CAN_COPY || true,
  GREETING_WORDS:
    process.env.NEXT_PUBLIC_GREETING_WORDS ||
    'Security Engineer, Podcaster, Hello There',

  // Spread configs from conf/ (comment, contact, post, analytics, image, font, code, animation, widget, ad, plugin, performance, top-tag, layout-map, notion, dev, etc.)
  ...require('./conf/comment.config'),
  ...require('./conf/contact.config'),
  ...require('./conf/post.config'),
  ...require('./conf/analytics.config'),
  ...require('./conf/image.config'),
  ...require('./conf/font.config'),
  ...require('./conf/right-click-menu'),
  ...require('./conf/code.config'),
  ...require('./conf/animation.config'),
  ...require('./conf/widget.config'),
  ...require('./conf/ad.config'),
  ...require('./conf/plugin.config'),
  ...require('./conf/performance.config'),
  ...require('./conf/top-tag.config'),
  ...require('./conf/layout-map.config'),
  ...require('./conf/notion.config'),
  ...require('./conf/dev.config'),
  ...require('./conf/techgrow.config'),

  // Custom overrides (your site-specific values below take precedence over conf/ defaults)
  CUSTOM_EXTERNAL_JS: [''],
  CUSTOM_EXTERNAL_CSS: [''],

  LAYOUT_SIDEBAR_REVERSE: false,

  FACEBOOK_PAGE_TITLE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_TITLE || null,
  FACEBOOK_PAGE: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || null,
  FACEBOOK_PAGE_ID: process.env.NEXT_PUBLIC_FACEBOOK_PAGE_ID || '',
  FACEBOOK_APP_ID: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '',

  BEI_AN: process.env.NEXT_PUBLIC_BEI_AN || '',
  BEI_AN_LINK: process.env.NEXT_PUBLIC_BEI_AN_LINK || 'https://beian.miit.gov.cn/',
  BEI_AN_GONGAN: process.env.NEXT_PUBLIC_BEI_AN_GONGAN || '',

  POST_URL_PREFIX: process.env.NEXT_PUBLIC_POST_URL_PREFIX || 'article',
  POST_LIST_STYLE: 'page',
  POST_LIST_PREVIEW: process.env.NEXT_PUBLIC_POST_PREVIEW || 'false',
  POST_PREVIEW_LINES: 12,
  POST_RECOMMEND_COUNT: 6,
  POSTS_PER_PAGE: 12,
  POSTS_SORT_BY: 'notion',

  PREVIEW_CATEGORY_COUNT: 16,
  PREVIEW_TAG_COUNT: 16,

  UUID_REDIRECT: process.env.UUID_REDIRECT || false,

  NOTION_PROPERTY_NAME: {
    password: process.env.NEXT_PUBLIC_NOTION_PROPERTY_PASSWORD || 'password',
    type: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE || 'type', // 文章类型，
    type_post: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_POST || 'Post', // 当type文章类型与此值相同时，为博文。
    type_page: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_PAGE || 'Page', // 当type文章类型与此值相同时，为单页。
    type_notice: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TYPE_NOTICE || 'Notice', // 当type文章类型与此值相同时，为公告。
    title: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TITLE || 'title', // 文章标题
    status: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS || 'status',
    status_publish: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_PUBLISH || 'Published', // 当status状态值与此相同时为发布，可以为中文
    status_invisible: process.env.NEXT_PUBLIC_NOTION_PROPERTY_STATUS_INVISIBLE || 'Invisible', // 当status状态值与此相同时为隐藏发布，可以为中文 ， 除此之外其他页面状态不会显示在博客上
    summary: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SUMMARY || 'summary',
    slug: process.env.NEXT_PUBLIC_NOTION_PROPERTY_SLUG || 'slug',
    category: process.env.NEXT_PUBLIC_NOTION_PROPERTY_CATEGORY || 'category',
    date: process.env.NEXT_PUBLIC_NOTION_PROPERTY_DATE || 'date',
    tags: process.env.NEXT_PUBLIC_NOTION_PROPERTY_TAGS || 'tags',
    icon: process.env.NEXT_PUBLIC_NOTION_PROPERTY_ICON || 'icon'
  },

  // 作废配置
  AVATAR: '/avatar.png', // 作者头像，被notion中的ICON覆盖。若无ICON则取public目录下的avatar.png
  TITLE: process.env.NEXT_PUBLIC_TITLE || 'NotionNext BLOG', // 站点标题 ，被notion中的页面标题覆盖
  HOME_BANNER_IMAGE: './bg_image.jpg', // 首页背景大图, 会被notion中的封面图覆盖，若无封面图则会使用代码中的 /public/bg_image.jpg 文件
  DESCRIPTION: process.env.NEXT_PUBLIC_DESCRIPTION || '这是一个由NotionNext生成的站点', // 站点描述，被notion中的页面描述覆盖

  NOTION_ACCESS_TOKEN: process.env.NOTION_ACCESS_TOKEN || ''
}

module.exports = BLOG
