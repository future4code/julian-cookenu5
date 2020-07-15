import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { IdGenerator } from "./IdGenetator";
import { UserDatabase } from "./data/UserDataBase";
import { Authenticator } from "./service/Authenticator";
import HashManager from "./service/HashManager";

dotenv.config();

const app = express();

app.post('/signup', async(req: Request, res: Response) => {
    try {
        if(!req.body.email || req.body.email.index("@") === -1) { //confirmar validação
            throw new Error("Invalid email.")
        }
    
        if(!req.body.password || req.body.password.length < 6) {
            throw new Error("Invalid password.")
        }
    
        const userData = {  //confirmar quais dados são passados na requisição
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const hashManager = new HashManager();
        const cipherText = await hashManager.hash(userData.password); //retorna a senha encriptada
    
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();
    
        const userDB = new UserDatabase();
        await userDB.createUser(userData.name, userData.email, cipherText) 
    
        const authenticator = new Authenticator();
        const token = authenticator.generateToken({
            id
        })
        res.status(200).send({
            token
        })
    } catch (error) {
        res.status(400).send({
            message: error.message
        })        
    }
    
})

const server = app.listen(process.env.PORT || 3306, () => {   // confirmar porta
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});




