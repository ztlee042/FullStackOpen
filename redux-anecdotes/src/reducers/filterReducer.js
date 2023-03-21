

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter
  }
}

const filterReducer = (state = '', action) => {
  console.log('action', action)
  switch (action.type) {
    case 'SET_FILTER':
      const filter = action.payload
      return filter
    default:
      return state
  }
}

export default filterReducer