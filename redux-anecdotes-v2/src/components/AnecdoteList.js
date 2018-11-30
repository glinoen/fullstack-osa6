import React from 'react'
import { voting } from '../reducers/anecdoteReducer'
import { newVote, reset } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  klik = (anecdote) => () => {
    this.props.store.dispatch(voting(anecdote.id))
    this.props.store.dispatch(newVote(anecdote.content))
    setTimeout(() => {
      if(this.props.store.getState().notification.content.includes(anecdote.content)) {
        this.props.store.dispatch(reset())
      }
    }, 5000)

  }

  render() {
    let anecdotes
    if(this.props.store.getState().filter.content === '') {
      anecdotes = this.props.store.getState().anecdotes
    } else {
      console.log(this.props.store.getState())
      anecdotes = this.props.store.getState().anecdotes.filter(
        (anecdote) => anecdote.content.includes(this.props.store.getState().filter.content)
      )
    }

    return (
      <div>
        {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.klik(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}



export default AnecdoteList
