import React from 'react'
import { filter } from '../reducers/filterReducer'

class Filter extends React.Component {
  handleChange = (event) => {
    event.preventDefault()
    const filtered = event.target.value
    this.props.store.dispatch(filter(filtered))
    console.log(this.props.store.getState())
  }
  render() {
    const style = {
      marginBottom: 10
    }

    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    )
  }
}

export default Filter