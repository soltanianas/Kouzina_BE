const express = require('express');
const router = express.Router();
const NewsCntrl = require('../Controllers/chefController');




router.post('/', NewsCntrl.createNews);
router.get('/:id', NewsCntrl.getNewsbyid);
router.get('/', NewsCntrl.getAllNews);
router.put('/:id', NewsCntrl.updateNews);
router.delete('/:id', NewsCntrl.deleteNews);


module.exports = router;
