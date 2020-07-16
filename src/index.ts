import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { IdGenerator } from "./IdGenetator";
import { UserDatabase } from "./data/UserDataBase";
import { Authenticator } from "./service/Authenticator";
import HashManager from "./service/HashManager";

dotenv.config();

const app = express();
app.use(express.json());

app.post('/signup', async (req: express.Request, res: express.Response) => {

    try {
        
        if(!req.body.name || req.body.name === "") { 
            throw new Error("Nome inválido / Campo vazio.")
            
        }
        if(!req.body.email || req.body.email.indexOf("@") === -1) { 
            throw new Error("E-mail inválido.")
        }
    
        if(!req.body.password || req.body.password.length < 6) {
            throw new Error("Senha inválida.")
        }
    
        const userData = {  
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const hashManager = new HashManager();
        const cipherText = await hashManager.hash(userData.password); 
    
        const idGenerator = new IdGenerator(); 
        const id = idGenerator.generate();
    
        const userDB = new UserDatabase();
        const user = await userDB.createUser(id, userData.name, userData.email, cipherText) 
        
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

// app.post("/login", async (req: Request, res: Response)=>{

//     try{
//       const userData = 
//       {
//         email: req.body.email,
//         password: req.body.password
//       }
  
//       const userDatabase = new UserDatabase();
//       const user = await userDatabase.getUserByEmail(userData.email);
  
//       if(user.password !== userData.password){
//         throw new Error("Invalid password");
//       }
  
//       const authenticator = new Authenticator();
//       const token = authenticator.generateToken({id: user.id});
  
//       res.status(200).send({token});
  
//     }catch(err){
//       res.status(400).send({error: err.message});
//     }
  
  //});



const server = app.listen(process.env.PORT || 3003, () => {   
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});




