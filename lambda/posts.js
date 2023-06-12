const { LemmyHttp } = require('lemmy-js-client')

exports.handler = async (event, context, callback) => {
  try {
    const { auth, communityId, page = 1, sort, limit = 15, instanceUrl, version } = event.queryStringParameters
    const config = {
      auth,
      community_id: communityId,
      limit, page, sort
    }

    console.log("[URL]", instanceUrl)
    const client = new LemmyHttp(instanceUrl)
    const posts = await client.getPosts(config)

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}