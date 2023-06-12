import { Communities } from "./communities"

class LemmyClient {
  instanceUrl = ""
  version = ""
  /** @type {Communities} */
  communities = null

  #jwt = null

  constructor(instanceUrl, version = "v3") {
    this.instanceUrl = instanceUrl
    this.version = version
  }

  async login(form = { usernameOrEmail, password }) {
    const endpoint = new URL(`${window.location.origin}/.netlify/functions/lemmy-login`)
    endpoint.searchParams.append('usernameOrEmail', form.usernameOrEmail)
    endpoint.searchParams.append('password', form.password)
    endpoint.searchParams.append('instanceUrl', this.instanceUrl)


    console.info("[LOGIN]", 'Sending login request', endpoint.toString())
    const auth = await fetch(endpoint.toString()).then(response => response.json()).catch(e => console.error(e))
    this.#jwt = auth.jwt
    
    this.#initializeComponents()
    return this.#jwt
  }

  #initializeComponents() {
    this.communities = new Communities(this.instanceUrl, this.version, this.#jwt)
  }
}

export { LemmyClient }