class Communities {
  instanceUrl = ""
  version = ""
  endpoint = ""
  #auth = null

  constructor(instanceUrl, version = "v3", auth) {
    this.instanceUrl = instanceUrl
    this.version = version

    this.endpoint = `${window.location.origin}/.netlify/functions`
    this.#auth = auth
  }

  /**
   * @description Gets the community by its name
   * @author Francis Rubio
   * @param {string} name the name of the community
   * @memberof Communities
   */
  async get(name) {
    const url = new URL(this.endpoint + '/getCommunity')
    url.searchParams.append("instanceUrl", this.instanceUrl)
    url.searchParams.append("version", this.version)
    url.searchParams.append("name", name)
    url.searchParams.append("auth", this.#auth)

    console.info('[COMMUNITIES]', url.toString())
    return await fetch(url.toString()).then(response => response.json())
  }

  /**
   * @description Gets posts by community
   * @author Francis Rubio
   * @param {number} id the community ID
   * @memberof Communities
   */
  async getPostsByCommunity(id) {
    const url = new URL(this.endpoint + '/posts')
    url.searchParams.append('instanceUrl', this.instanceUrl)
    url.searchParams.append('version', this.version)
    url.searchParams.append('auth', this.#auth)
    url.searchParams.append('communityId', id)

    console.info('[COMMUNITIES] POSTS', url.toString())
    return (await fetch(url).then(response => response.json())).posts
  }
}

export { Communities }