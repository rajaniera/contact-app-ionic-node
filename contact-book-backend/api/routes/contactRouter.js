const express=require('express');
const router=express.Router();
const contactController=require('../controllers/contactController');
//routes
router.get('/',contactController.getAllContacts);
router.post('/',contactController.createContact);
router.put('/:id',contactController.updateContact);
router.delete('/:id',contactController.deleteContact)
router.get('/contacts/:id', contactController.getContactById);
module.exports=router