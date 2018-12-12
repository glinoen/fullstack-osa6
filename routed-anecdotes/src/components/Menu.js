import React from 'react'
import { NavLink } from 'react-router-dom'

class Menu extends React.Component {
  render() {
    const style={ 
      backgroundColor: "#9cb7e2", 
      padding:"10px 0", 
      borderRadius: '5px'
    }
    const activeStyle = {fontWeight: "bold", 
      backgroundColor: "white", 
      borderRadius: '4px', 
      padding:"6px 0", 
      margin: "3px"
    }
    return (
      <div style={style}>
        <NavLink exact to="/" activeStyle={activeStyle}>anecdotes</NavLink>&nbsp;
        <NavLink exact to="/create" activeStyle={activeStyle}>create new</NavLink>&nbsp;
        <NavLink exact to="/about" activeStyle={activeStyle}>about</NavLink>&nbsp;
      </div>
    )
  }
}

export default Menu