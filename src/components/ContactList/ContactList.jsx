import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import ContactListItem from './ContactListItem/ContactListItem';

const ContactList = ({ contacts, value, deleteContact }) => {
  const contactListItem = contacts
    .filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    .map(item => (
      <ContactListItem
        id={item.id}
        name={item.name}
        number={item.number}
        key={item.id}
        deleteContact={deleteContact}
      />
    ));
  return <ul className={css.contactList}>{contactListItem}</ul>;
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  // value: PropTypes.string,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
//
