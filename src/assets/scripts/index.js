const { LemmyClient } = require("./lemmy");

async function init() {
  const client = new LemmyClient('https://lemmy.world', 'v3')
  await client.login({ usernameOrEmail: 'teacherbuknoy', password: "3Si'Vu]QJ,56>;$" })
    .then(response => console.log(response))
  client.communities.get('philippines').then(response => console.log(response))
}

/* init() */