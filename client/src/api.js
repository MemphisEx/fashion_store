const API_URL = "http://localhost:5000"

function setAccessToken(token) {
  localStorage.setItem('token', token)
}
function getAccessToken() {
  return localStorage.getItem('token')
}

function setUser(user) {
  localStorage.setItem('user', JSON.stringify(user))
}
function getUser() {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

async function registerUser({fullname, email, password}) {
  const resp = await fetch(API_URL+"/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({fullname, email, password}),
  })
  return await resp.json()
}

async function loginUser({email, password}) {
  const resp = await fetch(API_URL+"/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password}),
  })
  const data = await resp.json()

  if (data.accessToken) {
    setAccessToken(data.accessToken)
    await fetchUserDetails()
  }
  return data
}

async function fetchUserDetails() {
  const resp =  await fetch(API_URL+"/users/me", {
    headers: {
      "x-access-token": getAccessToken(),
    }
  })
  const user = await resp.json()
  if (user.status == "ok") {
    setUser(user.user)
  }
  return user
}

export default {
  registerUser,
  loginUser,
  getUser,
  fetchUserDetails,
}