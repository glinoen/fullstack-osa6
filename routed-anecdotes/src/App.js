import React from 'react'
import Notification from './components/Notification'
import Menu from './components/Menu'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import { ListGroup, ListGroupItem, Media } from 'react-bootstrap'


const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h3>Anecdotes</h3>
    <ListGroup style={{ width: "22rem" }} >
      {anecdotes.map(anecdote =>
        <ListGroupItem key={anecdote.id} >
          <Link to ={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      )}
    </ListGroup>  
  </div>
)

const Anecdote = ({ anecdote }) => {
  return(
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>
        for more info see <a href={anecdote.info}> {anecdote.info} </a>
      </div>
    </div>
  )
}

const About = () => (
  
  <div>
    <Media>
      <Media.Body>
        <Media.Heading>About anecdote app</Media.Heading>
        <p>According to Wikipedia:</p>
        <em>An anecdote is a brief, revealing account of an individual person or an incident. 
        Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself, 
        such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative. 
        An anecdote is "a story with a point."</em>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Media.Body>
      <Media.Right align="middle">
        <img width={280} height={376} src="https://upload.wikimedia.org/wikipedia/commons/0/0f/Ada_lovelace.jpg" alt="thumbnail" />
      </Media.Right>
    </Media>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code. 
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content 
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div> 
          <button>create</button>
        </form>
      </div>  
    )

  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    } 
  }

  addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({ 
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: anecdote.content
    })
    setTimeout(() => {
      this.setState({notification: ''})
    }, 10000)
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a => a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div style={{ margin: "5px"}}>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
              <Menu />
              <Notification notification={this.state.notification}/>
              <Route exact path="/" render={() => 
                <AnecdoteList anecdotes={this.state.anecdotes} />} 
              />
              <Route exact path="/create" render={({history}) => 
                <CreateNew history = {history} addNew = {this.addNew}/>} 
              />
              <Route exact path="/about" render={() => <About />} />
              <Route exact path="/anecdotes/:id" render={({match}) => 
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
              />
              
              
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
