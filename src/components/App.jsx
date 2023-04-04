import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import {Form} from './Form/Form';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import Filter from './Filter/Filter';
import { AppStyled } from './App.styled';


export function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  const createNewContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    };

    const checkContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (checkContact) {
      alert(`${checkContact.name} is already in contacts`);
    } else {
      setContacts([...contacts, contact]);
    }
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const normalizedFilter = filter.toLowerCase();

  const filtredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <AppStyled>
      <Section title="Phonebook">
        <Form onSubmitProps={createNewContact} />
      </Section>
      <Section title="Contacts">
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={filtredContacts} onDelete={deleteContact} />
      </Section>
    </AppStyled>
  );
}
