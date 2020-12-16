let views = 0

export const limitNumberOfViews = (e) => {
  views = localStorage.getItem('numberOfViews')
  if (!localStorage.getItem('x-auth-token') ) {
    if (views >= 10) {
      e.preventDefault()
      alert("Please, log in to continue")
    }
    localStorage.setItem('numberOfViews', ++views)
  }
}

export function getVideoTopics(array) {
  let set = new Set()
  array.forEach(video => {
    set.add(video.topic)
  })
  return Array.from(set)
}

export function logoff() {
  localStorage.setItem('auth-token', '')
  localStorage.removeItem('userId')
  localStorage.removeItem('username')
  localStorage.removeItem('userRole')
  localStorage.setItem('isAuth', false)
  localStorage.removeItem('x-auth-token')
}