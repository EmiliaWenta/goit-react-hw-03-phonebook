import React from 'react';
import css from './ContactListItem.module.css';
import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, number, deleteContact }) => {
  return (
    <li className={css.contactList__item} key={id.toString()}>
      {name}: {number}
      <button
        className={css.contactList__button}
        type="button"
        onClick={() => {
          deleteContact(id);
        }}
      >
        Delete
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactListItem;
