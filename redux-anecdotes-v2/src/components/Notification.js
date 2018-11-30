import React from 'react'

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      color: 'mediumseagreen'
    }
    if (this.props.store.getState().notification.content === '') {
      return(null)
    } else {
      return (
        <div style={style}>
          {this.props.store.getState().notification.content}
          {console.log(this.props.store.getState())}
        </div>
      )
    }
  }
}

export default Notification
