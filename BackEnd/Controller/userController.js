const User = require('../models/user.model');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
class UserController {
    //[GET] /user
    show(req, res) {
        User.find()
            .then((user) => {
                res.send({ user });
            })
            .catch(res.status(400).send(e));
    }

    login(req, res) {
        const { username, password } = req.body;
        //find the user by username and password
        User.findOne({ username, password })
            .then((user) => {
                res.send({ user });
            })
            .catch(res.status(400).json({ message: 'User not found' }));
    }
    delete(req, res) {
        var query = { userName: req.params.userName };
        //find user and delete
        User.findOneAndDelete(query)
            .then(() => {
                res.send({ user });
            })
            .catch(res.status(400).send(e));
    }
    async register(req, res) {
        const { username, password } = req.body;
        //Validate username and password
        if (!username || !password) {
            return res
                .status(400)
                .send({ success: false, message: 'Please enter all fields' });
        }
        try {
            const user = await User.findOne({ username });
            if (user) {
                return res.status(400).send({ success: false, message: 'User already taken' });
            }
            const hashedPassword = argon2.hash(password);
            const newUser = new User({
                username,
                password: hashedPassword,
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                repeatPwd: req.body.repeatPwd,
            });
            await newUser.save();
            //return token for the user
            const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
            res.json({ success: true, message: 'User created', token });
        } catch (error) { }
    }
}
//create an instance of the object
module.exports = new UserController();