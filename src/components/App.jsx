import React, { Component } from 'react';
import Form from './Form/Form';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export const INITIAL_STATE = {
  contacts: [],
  initialValue: '',
  filter: '',
};

export class App extends Component {
  state = {
    ...INITIAL_STATE,
  };

  // resetowanie formularza
  reset = form => {
    form.elements.name.value = this.state.initialValue;
    form.elements.number.value = this.state.initialValue;
  };
  //zmiana stanu
  handleSubmit = e => {
    e.preventDefault();
    const loginInputId = nanoid();
    const form = e.currentTarget;
    const name = form.elements.name.value;
    const tel = form.elements.number.value;

    const arrayOfName = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );

    if (arrayOfName.includes(name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    } else {
      this.setState(prev => {
        const item = { name: name, id: loginInputId, number: tel };
        return { contacts: [...prev.contacts, item] };
      });
    }
    this.reset(form);
  };
  //zmiana stanu
  changeSubmit = e => {
    this.setState({ filter: e.target.value });
  };
  // zmiana stanu
  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(cont => cont.id !== id),
    }));
  };

  componentDidUpdate(prevProps, prevState) {
    const contactsJSON = JSON.stringify(this.state.contacts);
    localStorage.setItem('contacts', contactsJSON);
  }

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts === null) {
      this.setState({
        contacts: [],
      });
    } else {
      this.setState({
        contacts: savedContacts,
      });
    }
  }

  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.container}>
        <h1 className={css.header}>Phonebook</h1>
        <Form onSubmit={this.handleSubmit} />
        <h2 className={css.header}>Contacts</h2>
        <Filter value={filter} onChange={this.changeSubmit} />
        <ContactList
          contacts={contacts}
          value={filter}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
