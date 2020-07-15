import knex from "knex";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
     
    private static TABLE_NAME = ""; //inserir o nome da tabela de usuários
  
    async createUser(      //função de criar um novo usuário
      name: string,
      email: string,
      password: string
    ) {
      try {
          await this.getConnection()
            .insert({
              name,
              email,
              password, 
            })
            .into(UserDatabase.TABLE_NAME)

            BaseDatabase.destroyConnection(); 
            
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    
    }
  }
  
