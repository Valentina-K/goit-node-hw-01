const fs = require('fs/promises');
const path = require('path');
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname,'db','contacts.json');

/* Returns a list of all contacts */
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}
/* Returns a contact by the given ID - string type */
async function getContactById(contactId) {
  const contacts = await listContacts();  
  const contact = contacts.find(item => item.id === contactId);
  if (!contact)
    return null;
  return contact;
}
/* Deletes contact by given ID - string type */
async function removeContact(contactId) {
  const contacts = await listContacts();
  const ind = contacts.findIndex(item => item.id === contactId);
  if (ind === -1)
    return null;
  const [deleteContact] = contacts.splice(ind, 1);
  await fs.writeFile(contactsPath,JSON.stringify(contacts));
  return deleteContact;
}
/* Adds a new contact. Arguments: name - string type, email - string type, phone - string type */
async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
}

module.exports = {
    listContacts,
    addContact,
    removeContact,
    getContactById,
};