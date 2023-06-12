import { LemmyClient } from "../lemmy"
import { UICommunity } from "../ui/community"
import { UIPost } from "../ui/post"
import { fixHeadings, render } from "../ui/markdown"
import { GenericController } from "./GenericController"

class Community extends GenericController {
  /** @type { LemmyClient } */
  client = null

  /** @type {HTMLElement} */
  communityElement = null

  constructor() {
    super()

    this.loadingIndicator = document.getElementById('loader')
    this.client = new LemmyClient('https://lemmy.world', 'v3')
    this.communityElement = document.querySelector('article[data-community=article]')
  }

  async login() {
    this.client
      .login({ usernameOrEmail: 'teacherbuknoy', password: "3Si'Vu]QJ,56>;$" })
      .then(() => this.setSearchFormVisibility(true))
      .catch(e => {
        alert("Cannot login to Lemmy")
        console.log(e)
      })
  }

  /**
   * @description Shows or hides the community search form
   * @author Francis Rubio
   * @param {boolean} visible shows the form if true, hides it if false
   * @memberof Community
   */
  setSearchFormVisibility(visible) {
    if (visible) {
      document.forms['community'].removeAttribute('hidden')
    } else {
      document.forms['community'].setAttribute('hidden', '')
    }
  }

  /**
   * @description Sets this page's community
   * @author Francis Rubio
   * @param {string} name
   * @memberof Community
   */
  async setCommunity(name) {
    this.client.communities.get(name)
      .then(communityData => this.#setupCommunity(communityData))
      .catch(e => this.#showCommunitySetupError(e))
  }

  #showCommunitySetupError(e) {
    alert("Something went wrong")
    console.error(e)
    this.setSearchFormVisibility(true)
  }

  async #setupCommunity(data) {
    this.setLoadingIndicatorVisibility(false)
    this.setSearchFormVisibility(false)

    const { community_view, moderators } = data
    const { community, counts, subscribed } = community_view

    if (data != null) {
      document.getElementById('page-title').remove()

      const uiCommunity = new UICommunity(this.communityElement)
      uiCommunity.communityId = community.id
      uiCommunity.banner = community.banner
      uiCommunity.icon = community.icon
      uiCommunity.title = community.title
      uiCommunity.description = fixHeadings(render(community.description), 2)
      uiCommunity.article.removeAttribute('hidden')
      uiCommunity.posts = await this.getCommunityPosts(community.id)
    }
    else {
      this.#showCommunitySetupError({ message: "No data found for search term" })
    }
  }

  /**
 * @description Fetches and renders posts of a community
 * @author Francis Rubio
 * @param {number} communityId the community ID
 * @returns {UIPost[]}
 */
  async getCommunityPosts(communityId) {
    const posts = await this.client.communities.getPostsByCommunity(communityId)
      .catch(e => this.#showCommunitySetupError(e))

    if (posts instanceof Array) {
      return posts.map(post => this.#createUIPost(post))
    }
  }

  #createUIPost(thread) {
    const { counts, post, creator, community } = thread
    const uiPost = new UIPost(document.getElementById('tmpl-post'))
    uiPost.comments = counts.comments
    uiPost.link = `/post/?id=${post.id}`
    uiPost.postId = post.id
    uiPost.timestamp = post.published
    uiPost.username = creator.name
    uiPost.votes = counts.score
    uiPost.title = post.name

    return uiPost.post
  }

  get searchForm() { return document.forms.namedItem('community') }
}

export { Community }