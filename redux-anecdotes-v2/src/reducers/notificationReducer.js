const defaultMessage = ''

const initialState = { content: defaultMessage }

const notificationReducer = (store = initialState, action) => {
  switch(action.type) {
    case 'NEW_VOTE' :
    return  { content : 'you voted: ' + action.content }
    case 'NEW_ANECDOTE' :
    return { content: 'new anecdote created: ' + action.content }
    case 'RESET' :
    return { content: '' }
  default :
    return store
  }
}

export const newVote = (content) => {
  return {
    type: 'NEW_VOTE',
    content
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    content
  }
}

export const reset = () => {
  return {
    type: 'RESET'
  }
}

export default notificationReducer