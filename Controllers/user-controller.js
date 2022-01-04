const User = require('../Models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { error } = require('npmlog');
const Token = require('../models/Token');
const nodemailer = require("nodemailer");
const crypto = require('crypto');

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
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
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
exports.signup = (async (req, res) => {
    await User.init();
    console.log(req.body.password);
    const hashedPass = await bcrypt.hash(req.body.password, 10)
    const user = new User({

        nom: req.body.nom,
        email: req.body.email,
        password: hashedPass,
        role: req.body.role
        //image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

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

exports.loginWithSocial = async (req, res, next) => {
    const { email, nom } = req.body

    if (email === "") {
        res.status(403).send({ message: "error please provide an email" })
    } else {
        var user = await User.findOne({ email })
        if (user) {
            console.log("user exists, loging in")
        } else {
            console.log("user does not exists, creating an account")

            user = new User()

            user.nom = nom
            user.email = email

            user.save()
        }

        // token creation
        const token = jwt.sign({ userId: user._id },
            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
        )

        res.status(201).send({ message: "success", user: user, token: token })
    }

};

exports.motDePasseOublie = async (req, res) => {
    const codeDeReinit = req.body.codeDeReinit
    const user = await User.findOne({ "email": req.body.email })

    if (user) {
        // token creation
        const token = jwt.sign({ userId: user._id },
            'RANDOM_TOKEN_SECRET', { expiresIn: '24h' }
        )

        envoyerEmailReinitialisation(req.body.email, token, codeDeReinit)

        res.status(200).send({ "message": "L'email de reinitialisation a été envoyé a " + user.email })
    } else {
        res.status(404).send({ "message": "User innexistant" })
    }
}

async function envoyerEmailReinitialisation(email, token, codeDeReinit) {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kouzina.app@gmail.com',
            pass: 'kouzina-cred'
        }
    })

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error)
            console.log("Server not ready")
        } else {
            console.log("Server is ready to take our messages")
        }
    })

    const mailOptions = {
        from: 'kouzina.app@gmail.com',
        to: email,
        subject: 'Reinitialisation de votre mot de passe - Kouzina',
        html: "<h3>Vous avez envoyé une requete de reinitialisation de mot de passe </h3><p>Entrez ce code dans l'application pour proceder : <b style='color : blue'>" + codeDeReinit + "</b></p>"
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('Email sent : ' + info.response)
        }
    })
}

exports.changerMotDePasse = async (req, res) => {
    const { email, nouveauMotDePasse } = req.body

    console.log(req.body)

    nouveauMdpEncrypted = await bcrypt.hash(nouveauMotDePasse, 10)

    let user = await User.findOneAndUpdate(
        { email: email },
        {
            $set: {
                password: nouveauMdpEncrypted
            }
        }
    )

    res.send({ user })
}


const { env } = require("process");

//creating one Using Social Media
exports.signupSocial = (async (req, res) => {
    await User.init();

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //photoProfil: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
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
            user: process.env.email_app,
            pass: process.env.password_app,

        }
    });


    var mailOptions = {
        from: process.env.email_app,
        to: user.email, subject: 'Account Verification Link',
        text: 'Hello ' + user.firstName + ',\n\n' +
            'Please verify your account by clicking the link: \nhttp:\/\/' +
            req.headers.host + '\/users\/confirmation\/' +
            user.email + '\/' + token.token + '\n\nThank You!\n'
    };
    smtpTrans.sendMail(mailOptions, function (err) {
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
exports.confirmmail = (async (req, res, next) => {
    await User.init();

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        //photoProfil: `${req.protocol}://${req.get('host')}/upload/${req.file.filename}`
    })
    Token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired 
        if (!token) {
            return res.status(400).send({ msg: 'Your verification link may have expired. Please click on resend for verify your Email.' });
        }
        // if token is found then check valid user 
        else {
            User.findOne({ email: token.email, email: req.params.email }, function (err, user) {
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
                    user.save(function (err) {
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
