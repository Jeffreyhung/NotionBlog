import { generateRss } from '@/lib/utils/rss'
import { fetchGlobalAllData } from '@/lib/db/SiteDataApi'

export async function getServerSideProps ({ res }) {
  res.setHeader('Content-Type', 'text/xml')
  const globalNotionData = await fetchGlobalAllData({ from: 'rss' })
  const xmlFeed = await generateRss(globalNotionData?.latestPosts || [])
  res.write(xmlFeed)
  res.end()
  return {
    props: {}
  }
}

const feed = () => null
export default feed
