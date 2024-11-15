import instance from './instance'

export const getLogin = async (code) => {
  try {
    const response = await instance.get(`/api/oauth/kakao/login/${code}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
