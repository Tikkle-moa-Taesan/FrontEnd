import instance from './instance'

export const getLogin = async (code) => {
  try {
    const response = await instance.get(`/api/oauth/kakao/login/${code}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getFreeAccountList = async () => {
  try {
    const response = await instance.get('/api/account/free')

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getFreeAccount = async (accountId) => {
  try {
    const response = await instance.get(`/api/account/free/${accountId}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getSavingAccountList = async () => {
  try {
    const response = await instance.get('/api/account/savings')

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getSavingAccount = async (accountId) => {
  try {
    const response = await instance.get(`/api/account/savings/${accountId}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getExpenseStatistic = async () => {
  try {
    const response = await instance.get('/api/budget/expense')

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getBudgetStatistic = async () => {
  try {
    const response = await instance.get('/api/budget/rate')

    return response.data
  } catch (error) {
    console.error(error)
  }
}
