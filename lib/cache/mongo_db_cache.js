import { MongoClient } from 'mongodb'

const DB_URL = process.env.MONGO_DB_URL // e.g. mongodb+srv://mongo_user:[password]@xxx.mongodb.net//?retryWrites=true&w=majority
const DB_NAME = process.env.MONGO_DB_NAME // e.g. tangly1024
const DB_COLLECTION = 'posts'

async function getClient () {
  const client = new MongoClient(DB_URL)
  await client.connect()
  return client
}

export async function getCache (key) {
  const client = await getClient().catch(err => { console.error(err) })
  if (!client) return null
  try {
    const dbo = client.db(DB_NAME)
    const query = { block_id: key }
    return await dbo.collection(DB_COLLECTION).findOne(query)
  } catch (err) {
    console.error(err)
    return null
  } finally {
    await client.close()
  }
}

/**
 * 并发请求写文件异常； Vercel生产环境不支持写文件。
 * @param key
 * @param data
 * @returns {Promise<null>}
 */
export async function setCache (key, data) {
  const client = await getClient().catch(err => { console.error(err) })
  if (!client) return data
  try {
    const dbo = client.db(DB_NAME)
    data.block_id = key
    const query = { block_id: key }
    const jsonObj = JSON.parse(JSON.stringify(data))

    const updRes = await dbo.collection(DB_COLLECTION).updateOne(query, { $set: jsonObj })
    console.log('更新结果', key, updRes)
    if (updRes.matchedCount === 0) {
      const insertRes = await dbo.collection(DB_COLLECTION).insertOne(jsonObj)
      console.log('插入结果', key, insertRes)
    }
    return data
  } catch (err) {
    console.error(err)
    return data
  } finally {
    await client.close()
  }
}

export async function delCache (key, data) {
  const client = await getClient().catch(err => { console.error(err) })
  if (!client) return null
  try {
    const dbo = client.db(DB_NAME)
    const query = { block_id: key }
    const res = await dbo.collection(DB_COLLECTION).deleteOne(query)
    console.log('删除结果', key, res)
    return null
  } catch (err) {
    console.error(err)
    return null
  } finally {
    await client.close()
  }
}

export default { getCache, setCache, delCache }
