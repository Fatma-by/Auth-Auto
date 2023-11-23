const connect = require("../db");

const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');



//creer la fonction registre pour récupérer les emails et passeword (crypté) users// vérifier si le mail est déjà utilisé

async function register(req, res) {
    try {
        const db = await connect();
        const saltRounds = 10;
        const hashed = bcrypt.hashSync(req.body.password, saltRounds);
        const newUser = require("../modeles/auth.schema").createUserSchema(
            req.body.email,
            hashed
        );
        const data = await db.collection("users").insertOne(newUser);

        res.status(201).json({ data });
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

// fonction login afin de vérifier si le mot de passe correspond à l'adresse saisie

async function login(req, res) {
    try {
        const db = await connect();
        console.log(req.body);
        const usersCollection = db.collection("users");
        const user = await usersCollection.findOne({ email: req.body.email });

        if (!user) {
            res.status(404).json({ message: "email not found" });


        }
        else {
            const match = bcrypt.compareSync(req.body.password, user.password)
            console.log(match);
            if (match) {
                const exp = Date.now() + 1000 * 60 * 60 * 7
                let token = jwt.sign({ email: user.email, id: user._id, exp }, "hjdbsbdqkjdbqksjdbqkjsdbqksdbqksdbjqsdbjqdsb");
                console.log(token);

                res.cookie("access_token", token, {

                 httpOnly:true


                })


                console.log("correct user")
                res.status(200).json({ message: "login with success", data: { email: user.email, id: user._id } });

            }
            else {
                res.status(401).json({ message: "unauthorized" });


            }


        }




    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: error });
    }
}
module.exports = {
    register,
    login
};
