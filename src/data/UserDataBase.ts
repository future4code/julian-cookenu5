import knex from "knex";

export class UserDatabase {
    private connection = knex({
      client: "mysql",
      connection: {
        host: process.env.DB_HOST,
        port: 3306,          //confirmar qual porta vamos usar
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
      },
    });
  
      private static TABLE_NAME = ""; //inserir o nome da tabela de usuários
  
     async createUser (      //função de criar um novo usuário
        name: string,
        email: string,
        password: string
    ) {
        try {
            await this.connection
                .insert({
                    name,
                    email,
                    password, 
                })
                .into(UserDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message)
        }
    
    }
  }
  
