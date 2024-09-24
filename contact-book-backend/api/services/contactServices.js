const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'contact'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// Get all contacts
exports.getAllContacts = callback => {
    const sql = 'SELECT * FROM contacts';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching contacts:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Create a contact
exports.createContact = (contact, callback) => {
    const sql = 'INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)';
    db.query(sql, [contact.name, contact.phone, contact.email], (err, results) => {
        if (err) {
            console.error('Error creating contact:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Update a contact
exports.updateContact = (id, contact, callback) => {
    const sql = 'UPDATE contacts SET name = ?, phone = ?, email = ? WHERE id = ?';
    db.query(sql, [contact.name, contact.phone, contact.email, id], (err, results) => {
        if (err) {
            console.error('Error updating contact:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Delete a contact
exports.deleteContact = (id, callback) => {
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error deleting contact:', err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

// Get contact by ID
exports.getContactById = (id, callback) => {
    const sql = 'SELECT * FROM contacts WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback(null, null); 
        }
        callback(null, results[0]); 
    });
}
