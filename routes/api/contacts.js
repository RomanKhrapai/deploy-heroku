const express = require("express");
const {
    listContacts,
    getContactById,
    addContact,
    updateContact,
    removeContact,
    updateStatusContact,
} = require("../../models/contacts");

const { schema } = require("../../validation");
const router = express.Router();

router.patch("/:contactId/favorite", async (req, res, next) => {
    const { contactId } = req.params;
    const body = req.body;

    if (typeof body?.favorite !== "boolean") {
        res.status(400).json({ message: "missing field favorite" });
    }
    try {
        const result = await updateStatusContact(contactId, body);
        if (result) {
            res.status(200).json({ message: result });
        } else {
            res.status(404).json({
                message: ` Not found task id: ${contactId}`,
            });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const results = await listContacts();
        res.status(200).json(results);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get("/:contactId", async (req, res, next) => {
    try {
        const data = await getContactById(req.params.contactId);
        if (data) {
            res.status(200).json({ data });
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post("/", async (req, res, next) => {
    try {
        const { error } = await schema.validate(req.body);
        if (error) {
            res.status(400).json(error);
            return;
        }
        res.status(201).json(await addContact(req.body));
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete("/:contactId", async (req, res, next) => {
    try {
        const data = await removeContact(req.params.contactId);
        if (data) {
            res.status(200).json({ message: "contact deleted", data });
        } else {
            res.status(404).json({ message: "Not found" });
        }
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.put("/:contactId", async (req, res, next) => {
    try {
        const body = req.body;
        const { error } = await schema.validate(body);
        if (error) {
            return res.status(400).json(error);
        }
        const data = await updateContact(req.params.contactId, body);
        if (data) {
            return res.status(200).json(data);
        }
        res.status(404).json({ message: "Not found" });
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
