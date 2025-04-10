import axios from 'axios'
import fakeApi from './fakeApi'

const api = axios.create({
  baseURL: 'http://localhost:3000' // JSON Server URL
})

// Use fake API if JSON Server is not available
export default process.env.NODE_ENV === 'development' ? fakeApi : api