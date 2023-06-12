class Communities {
  instanceUrl = ""
  version = ""
  endpoint = ""
  #auth = null

  constructor(instanceUrl, version = "v3", auth) {
    this.instanceUrl = instanceUrl
    this.version = version

    this.endpoint = `${window.location.origin}/.netlify/functions/getCommunity`
    this.#auth = auth
  }

  /**
   * @description Gets the community by its name
   * @author Francis Rubio
   * @param {string} name the name of the community
   * @memberof Communities
   */
  async get(name) {
    const url = new URL(this.endpoint)
    url.searchParams.append("instanceUrl", this.instanceUrl)
    url.searchParams.append("version", this.version)
    url.searchParams.append("name", name)
    url.searchParams.append("auth", this.#auth)

    console.info('[COMMUNITIES]', url.toString())
    return await fetch(url.toString()).then(response => response.json())
  }
}

export { Communities }