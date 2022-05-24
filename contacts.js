const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf8");
        return JSON.parse(data);
    } catch (err) {
        console.log(err);
    }
}

async function getById(contactId) {
    const data = await listContacts();
    return data.find(({ id }) => id === contactId);
}

async function removeContact(contactId) {
    const data = await listContacts();
    const newData = data.filter(({ id }) => id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newData), "utf8");
    return data.length !== newData.length;
}

async function addContact(id, name, email, phone) {
    const newContact = {
        id,
        name,
        email,
        phone,
    };
    try {
        const data = await listContacts();
        const newData = [...data, newContact];
        await fs.writeFile(contactsPath, JSON.stringify(newData), "utf8");
        return newContact;
    } catch (err) {
        console.log(err);
    }
}

async function updateContact(id, name, email, phone) {
    try {
        const data = await listContacts();
        const itemById = data.find((items) => items.id === id);
        itemById.name = name;
        itemById.email = email;
        itemById.phone = phone;
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf8");
        return itemById;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    listContacts,
    getById,
    removeContact,
    addContact,
    updateContact,
};
