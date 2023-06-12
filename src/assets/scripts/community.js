const { Community } = require('./controllers/Community')

async function initializeController() {
  const controller = new Community()
  await controller.login().then(initializeCommunity(controller))
}

async function initializeCommunity(controller) {
  controller.setSearchFormVisibility(false)
  controller.setLoadingIndicatorVisibility(true)
  const queries = controller.getQueryParams()

  if (queries.id == null && queries.c == null && queries.name == null) {
    controller.setSearchFormVisibility(true)
    controller.setLoadingIndicatorVisibility(false)
    controller.searchForm.addEventListener('submit', async e => {
      e.preventDefault()
      controller.setSearchFormVisibility(false)
      controller.setLoadingIndicatorVisibility(true)
      controller.setCommunity(controller.searchForm['name'].value)
    })
  }
}

initializeController()