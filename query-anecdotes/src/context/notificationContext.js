import { createContext, useReducer, useContext } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      const content = 'anecdote ' + "'" + action.payload.content + "'" + ' voted'
      return content
    case "ADD":
      const addedContent = 'anecdote ' + "'" + action.payload + "'" + ' added'
      return addedContent
    case "NULL":
      return null
    case 'LENGTHERROR':
      return "too short anecdote, must have length 5 or more"
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export default NotificationContext
