class UICommunity {
  article = null
  elements = null

  /**
   * Creates an instance of UICommunity.
   * @author Francis Rubio
   * @param {HTMLElement} article the HTML element
   * @memberof UICommunity
   */
  constructor(article) {
    if (article == null || !(article instanceof HTMLElement)) {
      throw new Error('Given argument is not an instance of HTMLElement')
    }

    this.article = article
    this.elements = {
      banner: this.article.querySelector('[data-community=banner]'),
      icon: this.article.querySelector('[data-community=icon]'),
      title: this.article.querySelector('[data-community=title]'),
      posts: this.article.querySelector('[data-community=posts]'),
      description: this.article.querySelector('[data-community=description]'),
    }
  }

  get communityId() { return this.article.dataset.communityId }
  set communityId(value) { this.article.dataset.communityId = value }

  get banner() { return this.elements.banner.getAttribute('src') }
  set banner(value) { this.elements.banner.setAttribute('src', value) }

  get icon() { return this.elements.icon.getAttribute('src') }
  set icon(value) { this.elements.icon.setAttribute('src', value) }

  get title() { return this.elements.title.innerText }
  set title(value) { this.elements.title.innerText }

  get posts() { return this.elements.posts }
  
  get description() { return this.elements.description.innerHTML }
  set description(value) { this.elements.description.innerHTML = value }
}

export { UICommunity }