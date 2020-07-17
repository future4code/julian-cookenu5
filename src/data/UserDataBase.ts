import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {
     
  private static TABLE_NAME = "Cookenu_User"; 
  private static TABLE_FOLLOW = "Cookenu_Follow";
  
  async create(
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

  async getByEmail(email: string): Promise<any> {
    try {
      const result =
        await this.getConnection()
          .select("*")
          .from(UserDatabase.TABLE_NAME)
          .where({email});
          
          return result[0];

    } catch (err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }

  public async getById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
      return result[0];
  } 

  async follow (id_User: string, userToFollowId: string): Promise<any>{
    try {
      await this.getConnection()
      .insert({
        id_User,
        userToFollowId
      })
      .into(UserDatabase.TABLE_FOLLOW)
   
    } catch (err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }

  async unfollow (id_User: string, userToFollowId: string): Promise<any>{
    try {
      const result = await this.getConnection().raw (`
      DELETE FROM ${UserDatabase.TABLE_FOLLOW} 
      WHERE userToFollowId = "${userToFollowId}" AND id_user= "${id_User}"
    `)
    } catch (err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }
}









  
  
