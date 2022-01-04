const express = require('express');
const router = express.Router();
const UserCtrl = require('../Controllers/user-controller');
const multer = require('../middleware/multer-config');

router.get('/', UserCtrl.getAllUser);


 /**
  * @swagger
 * /user/:
 *   description: The utilisateurs managing API
 *   get:
 *     summary: Returns the list of all the utilisateurs
 *     tags: [Users]
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */




router.get('/:id', UserCtrl.getUserbyid);
router.post('/login', UserCtrl.login);



/**
  * @swagger
 * /user/login/:
 *   description: user Login
 *   post:
 *     summary: Returns a message of success
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: email
 *         type: string
 *       - in: body
 *         name: password
 *         type: string
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */

router.post('/signup', multer, UserCtrl.signup);
/**
  * @swagger
 * /user/signup/:
 *   description: user Registration
 *   post:
 *     summary: Returns a message of success
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: nom
 *         type: string
 *       - in: body
 *         name: email
 *         type: string
 *       - in: body
 *         name: password
 *         type: string
 *       - in: body
 *         name: role
 *         type: string
*     responses:
 *       200:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */
router.post('/loginWithSocial', UserCtrl.loginWithSocial);

router.post('/motDePasseOublie', UserCtrl.motDePasseOublie);

router.put('/changerMotDePasse', UserCtrl.changerMotDePasse);

router.put('/:id', UserCtrl.updateUser);

router.delete('/:id', UserCtrl.deleteUser);
/**
  * @swagger
 * /user/{userID}/:
 *   description: user Registration
 *   delete:
 *     summary: Returns a message of success
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userID
 *         type: string
*     responses:
 *       201:
 *         description: The list utilisateurs
 *         content:
 *           application/json:
 *       400:
 *         description: utilisateur error
 */




module.exports = router;