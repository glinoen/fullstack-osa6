import React from 'react'
import { anecdoteCreation } from '../reducers/anecdoteReducer'
import { newAnecdote, reset } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newPost = await anecdoteService.createNew(content)
    this.props.anecdoteCreation(newPost)
    this.props.newAnecdote(content)

    setTimeout(() => {
      if(this.props.notification.content.includes(content)) {
        this.props.reset()
      }
    }    , 5000)


  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  newAnecdote,
  reset
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (AnecdoteForm)
