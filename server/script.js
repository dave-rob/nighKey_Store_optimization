// import http from 'k6/http'
// import { check, sleep } from 'k6'

// export default function () {
//   const data = { username: 'username', password: 'password' }
//   let res = http.post('https://myapi.com/login/', data)

//   check(res, { 'success login': (r) => r.status === 200 })

//   sleep(0.3)
// }

import http from 'k6/http'
import { sleep } from 'k6'

export let options = {
    duration: '10s',
    vus: 30,
  thresholds: {
    http_req_duration: ['p(95)<500', 'p(99)<1500'],
  },
}

export default function () {
  const BASE_URL = 'https://nighkey-jo77.onrender.com'

  // http.get(`${BASE_URL}/api/shoedata`)
  http.get(`${BASE_URL}/api/shoedata/1`)

  sleep(0.3)
}
