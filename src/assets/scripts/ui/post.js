const { toRelativeTime, toReadableTime } = require('../utils/time')

class UIPost {
  post = document.createElement('article')
  #elements = {
    postId: null,
    username: null,
    timestamp: null,
    link: null,
    upvote: null,
    downvote: null,
    votes: null,
    comments: null,
    commentLink: null,
    share: null,
    save: null
  }

  /**
   * Creates an instance of UIPost.
   * @author Francis Rubio
   * @param {HTMLTemplateElement} template the post template to use
   * @memberof UIPost
   */
  constructor(template) {
    if (template == null || !(template instanceof HTMLElement)) {
      throw new Error('Given argument is not an instance of HTMLTemplateElement')
    }

    this.post = template.content.cloneNode(true).firstElementChild
  }

  get username() { return this.post.querySelector('[data-post=username]').innerText }
  set username(value) {
    const username = this.post.querySelector('[data-post=username]')
    username.innerText = value
    username.setAttribute('href', `/user?username=${value}`)
  }

  get postId() { return this.post.dataset.postId }
  set postId(value) { this.post.dataset.postId = value }

  get timestamp() { return this.post.querySelector('[data-post=timestamp]').getAttribute('datetime') }
  set timestamp(value) { 
    const date = new Date(value)
    const timestamp = this.post.querySelector('[data-post=timestamp]')
    timestamp.setAttribute('datetime', date.toISOString())
    timestamp.innerText = `${toRelativeTime(date) } at ${toReadableTime(date)}`
  }

  get link() { return this.post.querySelector('[data-post=link]') }
  set link(value) {
    const link = this.post.querySelector('[data-post=link]')
    link.setAttribute('href', value)

    const comments = this.post.querySelector('[data-post=commentLink]')
    comments.setAttribute('href', value)
  }

  get votes() { return this.post.querySelector('[data-post=votes]') }
  set votes(value) { this.post.querySelector('[data-post=votes]').innerText = value }

  get comments() { return +this.post.querySelector('[data-post=comments]').innerText.match(/\d/)[0] }
  set comments(value) { this.post.querySelector('[data-post=comments]').innerText = pluralizeComment(value) }

  get title() { return this.post.querySelector('[data-post=link]').innerText }
  set title(value) { this.post.querySelector('[data-post=link]').innerText = value }
}

function pluralizeComment(count) {
  switch (new Intl.PluralRules('en-US').select(count)) {
    case 'one':
      return `${count} comment`
    default:
      return `${count} comments`
  }
}

export { UIPost }