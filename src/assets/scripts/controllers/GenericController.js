class GenericController {
  constructor() {
    this.loadingIndicator = document.querySelector('[data-loader]')
  }

  /**
   * @description Gets current page's query parameters
   * @author Francis Rubio
   * @returns {Object}
   * @memberof Community
   */
  getQueryParams() {
    const params = new URL(window.location).searchParams
    const json = {}

    const keys = params.keys()
    for (const key of keys) {
      json[key] = params.get(key)
    }

    return json
  }

  /**
   * @description Sets the visibility of the current page's main loading indicator
   * @author Francis Rubio
   * @param {boolean} visible shows the loading indicator if true, and hides it otherwise
   * @memberof GenericController
   */
  setLoadingIndicatorVisibility(visible) {
    if (visible) {
      this.loadingIndicator.removeAttribute('hidden')
    } else {
      this.loadingIndicator.setAttribute('hidden', '')
    }
  }

  #loadingIndicator = document.createElement('div')
  get loadingIndicator() { return this.#loadingIndicator }
  set loadingIndicator(value) { this.#loadingIndicator = value }
}

export { GenericController }