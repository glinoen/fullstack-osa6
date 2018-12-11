import React from 'react'
import Filter from './Filter'
import { voting } from '../reducers/anecdoteReducer'
import { basicNotif } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


class AnecdoteList extends React.Component {
  klik =  (anecdote) => async () => {
    this.props.voting(anecdote)
    this.props.basicNotif(`you voted '${anecdote.content}'`, 5)

  }

  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {console.log('sad',this.props.visibleAnecdotes)}
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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

const anecdotesToShow = (anecdotes, filter) => {
  if (filter.content === '') {
    return anecdotes
  } else {
    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.content.toLowerCase()))
  }
}

const mapStateToProps = (state) => {
  return {
    visibleAnecdotes: anecdotesToShow(state.anecdotes, state.filter),
    notification: state.notification
  }
}

const mapDispatchToProps = {
  voting,
  basicNotif,
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
