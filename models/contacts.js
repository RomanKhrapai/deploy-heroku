const Contacts = require("./schemas/contacts");

const listContacts = async () => Contacts.find();

const getContactById = async (contactId) => Contacts.findById(contactId);

const removeContact = async (contactId) =>
    Contacts.findByIdAndRemove(contactId);

const addContact = async (body) => Contacts.create(body);

const updateContact = async (contactId, body) =>
    Contacts.findByIdAndUpdate(contactId, body, { new: true });

const updateStatusContact = async (contactId, { favorite }) =>
    Contacts.findByIdAndUpdate(contactId, { favorite }, { new: true });

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
};
