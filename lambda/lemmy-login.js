const { LemmyHttp } = require('lemmy-js-client')

exports.handler = async (event, context, callback) => {
  try {
    const query = event.queryStringParameters
    const client = new LemmyHttp(query.instanceUrl)
    const jwt = (await client.login({ username_or_email: query.usernameOrEmail, password: query.password })).jwt

    if (jwt == null) {
      throw new Error("Login failed")
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ jwt })
    }
  }
  catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.toString() })
    }
  }
}