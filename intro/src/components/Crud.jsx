import React from 'react';
import nanoid from 'nanoid';
import Card from './Card.jsx';

export default class Crud extends React.Component {

  constructor() {
    super();
    this.state = {
      cards: [],
      textArea: '',
    }
    this.url = 'http://localhost:7777';
  }

  render() {

    return (
      <>
        <div className='crud-update'>
          <div><b>Notes</b></div>
          <div className='update' onClick={this.loadNotes}>&#x21ba;</div>
        </div>
        <div className="crud-cardBox">
          {this.state.cards.map(card => <Card
            removeCard={this.removeCard}
            card={card}
            key={card.id}
          />)}
        </div>
        <form action="." onSubmit={this.formSubmit}>
          <textarea
            value={this.state.textArea}
            name="text" id=""
            onChange={this.formChange}
            cols="30" rows="10">
          </textarea>
          <button className='update'>&#x27a4;</button>
        </form>
      </>
    );
  }

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    fetch(`${this.url}/notes`)
      .then(response => response.json())
      .then(cards => {
        this.setState(

          prevState => ({
            ...prevState, cards: cards
          })
        )
      })
  }

  addNote = (note) => {
    fetch(`${this.url}/notes`, {
      method: 'POST',
      body: JSON.stringify(note),
    })
      .then(response => {
        this.setState(
          prevState => ({
            ...prevState, cards: [...prevState.cards, note], textArea: '',

          })
        )
      })

  }

  formChange = (e) => {
    e.preventDefault();
    e.persist();
    this.setState(
      prevState => ({
        ...prevState, textArea: e.target.value
      })
    )
  }

  formSubmit = (e) => {
    e.preventDefault();
    let note = {
      id: nanoid(),
      content: this.state.textArea,
    }

    this.addNote(note)
  }

  removeCard = (id) => {
    fetch(`${this.url}/notes/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        this.loadNotes();
      })
  }
}


