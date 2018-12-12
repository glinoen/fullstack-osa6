import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      borderRadius: '5px',
      borderLeftWidth: '10px',
      padding: 10,
      color: 'mediumseagreen',
      margin: '25px 0px'
    }
    if (this.props.notification === '') {
      return(null)
    } else {
      return (
        <div style={style}>
          a new anecdote {this.props.notification} added
        </div>
      )
    }
  }
}

export default Notification