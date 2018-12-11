import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {

    return [...store, { content: action.content.content, id: action.content.id, votes:0 }]
  }

  if (action.type === 'INIT_ANECDOTES') {
    return action.data
  }

  return store
}

export const anecdoteCreation = (content) => {
  return async (dispatch) => {
    const newPost = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      content: newPost
    })
  }
}

export const voting = (anecdote) => {
  return async (dispatch) => {
    const voted = await anecdoteService.axiosVote(anecdote)
    dispatch({
      type: 'VOTE',
      id: voted.id
    })
  }
}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer