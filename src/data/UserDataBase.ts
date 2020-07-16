import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {
     
    private static TABLE_NAME = "Cookenu_User"; 
  
    async createUser(
      id: string,      
      name: string,
      email: string,
      password: string
    ) {
      try {
          await this.getConnection()
            .insert({
              id,
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

    public async getUserById(id: string): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ id });
      return result[0];
    }

  }



  
  
