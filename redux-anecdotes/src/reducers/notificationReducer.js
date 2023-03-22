import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        display: action.payload.display
      }
    },
    removeNotification(state, action) {
      const previousState = JSON.parse(JSON.stringify(state))
      return { ...previousState, display: 'none' }
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const notify = (message, display, timeout) => {
  return async dispatch => {
    dispatch(setNotification({
      message: message,
      display: display
    }))

    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000);
  }
}
export default notificationSlice.reducer