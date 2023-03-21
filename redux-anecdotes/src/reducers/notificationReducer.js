import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message + '"' + action.payload.content + '"',
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
export default notificationSlice.reducer