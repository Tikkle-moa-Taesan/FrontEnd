import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL

// 로그인 페이지에서만 사용할 인스턴스
export const loginInstance = axios.create({
  baseURL: BASE_URL,
})

// 로그인 외 모든 페이지에서 사용할 인스턴스
export const baseInstance = axios.create({
  baseURL: BASE_URL,
})

baseInstance.interceptors.request.use(
  function (config) {
    config.withCredentials = true

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)
