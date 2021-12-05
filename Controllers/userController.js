const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const jwt = require('jsonwebtoken');
const { error } = require('npmlog');
const Token = require('../models/Token');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

/*
//create
exports.createUser = (req, res, next) => {
  //  delete req.body._id;
  const user = new User({
    ...req.body
  });
  user.save()
    .then(() => res.status(201).json({ message: 'user saved !' }))
    .catch(error => res.status(400).json({ message: 'user not saved ! Username or email are  used' }));
}
*/
//get user by id
exports.getUserbyid = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ message: "user not found Check id " }));
}

//get all user
exports.getAllUser = (req, res, next) => {
    User.find()
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json({ error }));
}

//update user
exports.updateUser = (req, res, next) => {
    User.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'user modified !' }))
        .catch(error => res.status(400).json({ message: "Check id" }));
}

//delete user
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'User deleted !' }))
        .catch(error => res.status(400).json({ message: "Check id" }));
}


//sign up
//exports.signup = (req, res, next) => {
exports.signup = (async(req, res) => {
    await User.init();
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const user = new User({

        nom: req.body.nom,
        email: req.body.email,
        password: hashedPass,
        image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    })
    const tokenJWT = jwt.sign({ username: req.body.email, password: req.body.password }, "SECRET")


    try {
        const newUser = await user.save()
        var token = new Token({ email: user.email, token: crypto.randomBytes(16).toString('hex') });
        await token.save();
        res.status(201).json({
            token: tokenJWT,
            user: user,
            reponse: "good"
        })
    } catch (error) {
        res.status(400).json({ reponse: error.message })
    }


    /*
    var smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'showapp.application@gmail.com',
            pass: 'Showapp2021',

        }
    });


    var mailOptions = { from: 'showapp.application@gmail.com', to: user.email, subject: 'Account Verification Link', text: 'Hello ' + user.firstName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/users\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
    smtpTrans.sendMail(mailOptions, function(err) {
        if (err) {
            return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });

        }
        return res.status(200)
            .json({
                msg: 'A verification email has been sent to ' + user.email +
                    '. It will be expire after one day. If you not get verification Email click on resend token.',
                user: user
            });
    });
*/
});



//login

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'wrong username ', error });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log(req.body.password + " " + user.password);
                    if (!valid) {

                        return res.status(401).json({ error: 'wrong password' });
                    }
                    res.status(200).json({
                        user: user,
                        token: jwt.sign({ userId: user._id },
                            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
                        )

                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));


};
const { env } = require("process");

//creating one Using Social Media
exports.signupSocial = (async(req, res) => {
    await User.init();

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        // photoProfil: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    })
    const tokenJWT = jwt.sign({ username: req.body.email }, "SECRET")


    try {
        const newUser = await user.save()
        var token = new Token({ email: user.email, token: crypto.randomBytes(16).toString('hex') });
        await token.save();
        res.status(201).json({
            token: tokenJWT,
            user: user,
            reponse: "good"
        })
    } catch (error) {
        res.status(400).json({ reponse: error.message })
    }
    var smtpTrans = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'showapp.application@gmail.com',
            pass: 'Showapp2021',

        }
    });


    var mailOptions = { from: 'showapp.application@gmail.com', to: user.email, subject: 'Account Verification Link', text: 'Hello ' + user.firstName + ',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/users\/confirmation\/' + user.email + '\/' + token.token + '\n\nThank You!\n' };
    smtpTrans.sendMail(mailOptions, function(err) {
        if (err) {
            return res.status(500).send({ msg: 'Technical Issue!, Please click on resend for verify your Email.' });

        }
        return res.status(200)
            .json({
                msg: 'A verification email has been sent to ' + user.email +
                    '. It will be expire after one day. If you not get verification Email click on resend token.',
                user: user
            });
    });

});


//confirmation mail
exports.confirmmail = (async(req, res, next) => {
    await User.init();

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        // photoProfil: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    })
    Token.findOne({ token: req.params.token }, function(err, token) {
        // token is not found into database i.e. token may have expired 
        if (!token) {
            return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
        }
        // if token is found then check valid user 
        else {
            User.findOne({ email: token.email, email: req.params.email }, function(err, user) {
                // not valid user
                if (!user) {
                    return res.status(401).send({ msg: 'We were unable to find a user for this verification. Please SignUp!' });
                }
                // user is already verified
                else if (user.verified) {
                    return res.status(200).send('User has been already verified. Please Login');
                }
                // verify user
                else {
                    // change Verified to true
                    user.verified = true;
                    user.save(function(err) {
                        // error occur
                        if (err) {
                            return res.status(500).send({ msg: err.message });
                        }
                        // account successfully verified
                        else {
                            return res.status(200).send('Your account has been successfully verified');
                        }
                    });
                }
            });
        }

    });


});