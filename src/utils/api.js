import instance from './instance'

export const getLogin = async (code) => {
  try {
    const response = await instance.get(`/api/oauth/kakao/login/${code}`)

    return response.data
  } catch (error) {
    console.error(error)
  }
}

export const getProfile = async () => {
  try {
    const response = await instance.get('/api/member/profile')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const getTotalBalance = async () => {
  try {
    const response = await instance.get('/api/account/balance')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const getFreeAccountList = async () => {
  try {
    const response = await instance.get('/api/account/free')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const postFreeAccount = async (accountId, page, condition) => {
  try {
    const response = await instance.post(`/api/account/free/${accountId}?page=${page}`, condition)

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const getSavingAccountList = async () => {
  try {
    const response = await instance.get('/api/account/savings')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const postSavingAccount = async (accountId, page, condition) => {
  try {
    const response = await instance.post(
      `/api/account/savings/${accountId}?page=${page}`,
      condition,
    )

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const getExpenseStatistic = async () => {
  try {
    const response = await instance.get('/api/budget/expense')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'
    else if (error.status == 404) return -1

    console.error(error)
  }
}

export const getBudgetStatistic = async () => {
  try {
    const response = await instance.get('/api/budget/rate')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'
    else if (error.status == 404) return -1

    console.error(error)
  }
}

export const postBudgetCreate = async (monthBudget) => {
  try {
    await instance.post('/api/budget/create', {
      monthBudget: monthBudget,
    })
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const postBudgetUpdate = async () => {
  try {
    const response = await instance.post('/api/budget/download')

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'
    else if (error.status == 404) location.href = '/budget/set/total'

    console.log(error)
  }
}

export const putCategoryBudget = async (budget) => {
  try {
    const response = await instance.put('/api/budget/category', budget)

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'
  }
}

export const getFinancialLedgerId = async (date) => {
  try {
    const response = await instance.get(`/api/budget/date/${date}`)

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'
    else if (error.status == 404) return -1

    console.error(error)
  }
}

export const getFinancialLedger = async (budgetId, page) => {
  try {
    const response = await instance.get(`/api/budget/${budgetId}?page=${page}`)

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}

export const getAllFinancialLedger = async (budgetId) => {
  try {
    const response = await instance.get(`/api/budget/${budgetId}/all`)

    return response.data
  } catch (error) {
    if (error.status == 403) location.href = '/login'

    console.error(error)
  }
}
