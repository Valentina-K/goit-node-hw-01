const contactsApi = require('./contacts');
const argv = require("yargs").argv;


async function invokeAction({ action, id, name, email, phone }) {  
  switch (action) {
    case "list":
          const contacts = await contactsApi.listContacts();
          console.log(contacts);
      break;

    case "get":
          const contact = await contactsApi.getContactById(id.toString());
          if (!contact)
              throw new Error(`Contact with id=${id} is not found!`);
          console.log(contact);
      break;

    case "add":
          const newContact = await contactsApi.addContact({ name, email, phone });
          console.log(newContact);
      break;

    case "remove":
          const deleteContact = await contactsApi.removeContact(id.toString());
          if (!deleteContact)
              throw new Error(`Contact with id=${id} is not found!`);
          console.log(deleteContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
//console.log(argv)