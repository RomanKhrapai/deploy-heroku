const express = require("express");
const { v4: uuidv4 } = require("uuid");
const {
    listContacts,
    getById,
    addContact,
    updateContact,
    removeContact,
} = require("../../contacts.js");

const { schema } = require("../../validation");
const router = express.Router();

router.get("/", async (req, res, next) => {
    res.status(200).json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
    const data = await getById(req.params.contactId);
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

router.post("/", async (req, res, next) => {
    const { name, email, phone } = req.body;
    if (!name) {
        return res.status(400).json({ message: "missing required name field" });
    } else if (!email) {
        return res
            .status(400)
            .json({ message: "missing required email field" });
    } else if (!phone) {
        return res
            .status(400)
            .json({ message: "missing required phone field" });
    }
    const { error } = await schema.validate({ name, email, phone });
    if (error) {
        res.status(400).json(error);
        return;
    }

    const data = await addContact(uuidv4(), name, email, phone);
    res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
    const data = await removeContact(req.params.contactId);
    console.log(data);
    if (data) {
        res.status(200).json({ message: "contact deleted" });
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

router.put("/:contactId", async (req, res, next) => {
    const body = req.body;
    if (body === {}) {
        return res.status(400).json({ message: "missing fields" });
    }
    const { error } = await schema.validate(body);
    if (error) {
        return res.status(400).json(error);
    }
    const data = await updateContact(
        req.params.contactId,
        body.name,
        body.email,
        body.phone
    );
    if (data) {
        res.status(200).json(data);
    } else {
        res.status(404).json({ message: "Not found" });
    }
});

module.exports = router;
