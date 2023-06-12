const { LemmyHttp } = require('lemmy-js-client')

exports.handler = async (event, context, callback) => {
  try {
    const query = event.queryStringParameters
    console.log(query)

    const tld = new URL(query.instanceUrl).host
    const config = {
      name: query.name,
      auth: query.auth
    }

    const client = new LemmyHttp(query.instanceUrl)
    const community = await client.getCommunity(config)

    return {
      statusCode: 200,
      body: JSON.stringify(community)
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}