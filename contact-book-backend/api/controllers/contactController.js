const contactService = require('../services/contactServices');

exports.getAllContacts = (req, res) => {
    contactService.getAllContacts((err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(200).json(results);
    });
};

exports.createContact = (req, res) => {
    const { name, phone, email } = req.body;
    
    // Check for required fields
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Name, phone, and email are required' });
    }

    contactService.createContact({ name, phone, email }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.status(201).json({ id: results.insertId, name, phone, email });
    });
};

// Update a contact
exports.updateContact = (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;

    // Check for required fields
    if (!name || !phone || !email) {
        return res.status(400).json({ error: 'Name, phone, and email are required' });
    }

    contactService.updateContact(id, { name, phone, email }, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact updated successfully' });
    });
};

// Delete a contact
exports.deleteContact = (req, res) => {
    const { id } = req.params;
    contactService.deleteContact(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    });

    //edit

    // In your contactController.js

exports.getContactById = (req, res) => {
    const { id } = req.params; // Extract the ID from the request parameters
  
    contactService.getContactById(id, (err, contact) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json(contact);
    });
  };
  
};
