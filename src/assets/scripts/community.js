const { LemmyClient } = require('./lemmy/index')
const { UICommunity } = require('./ui/community')
const { render, fixHeadings } = require('./ui/markdown')

const communityArticle = document.querySelector('article[data-community=article]')
const client = new LemmyClient('https://lemmy.world', 'v3')
login()

const communitySearch = document.forms.namedItem("community")
communitySearch.addEventListener('submit', async e => {
  e.preventDefault()
  showLoader()
  console.log(communitySearch)
  const communityName = communitySearch['name'].value

  const community = await client.communities.get(communityName)
  initializeCommunity(community)

})

async function login() {
  await client.login({ usernameOrEmail: 'teacherbuknoy', password: "3Si'Vu]QJ,56>;$" })
  showForm()
}

function showForm() {
  communitySearch.removeAttribute('hidden')
  document.querySelector('#loader').setAttribute('hidden', '')
}

function showLoader() {
  document.querySelector('#loader').removeAttribute('hidden')
  communitySearch.setAttribute('hidden', '')
}

function hideLoader() {
  document.querySelector('#loader').setAttribute('hidden', '')
}

async function initializeCommunity(communityData) {
  hideLoader()
  console.log(communityData)
  const { community_view, moderators } = communityData
  const { community, counts, subscribed } = community_view

  if (communityData != null) {
    communitySearch.setAttribute('hidden', '')
    document.getElementById('page-title').remove()

    console.log(communityArticle)
    const article = new UICommunity(communityArticle)
    article.communityId = community.id
    article.banner = community.banner
    article.icon = community.icon
    article.title = community.title
    article.description = fixHeadings(render(community.description), 2)
    article.article.removeAttribute('hidden')
    
    console.log(article.description)
  }
}
