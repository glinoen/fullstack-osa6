
const initialState = { content: '' }

const filterReducer = (store = initialState, action) => {
  switch(action.type) {
    case 'FILTER' :
      return { content: action.content }
    default :
      return store
  }
}

export const filter = (content) => {
  return {
    type: 'FILTER',
    content
  }
}

export default filterReducer