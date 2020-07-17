import { BaseDatabase } from "./BaseDatabase";

export class FollowDatabase extends BaseDatabase {
     
  private static TABLE_NAME = "Cookenu_Follow"; 
  
  async follow (id_User: string, userToFollowId: string): Promise<any>{
    try {
      await this.getConnection()
      .insert({
        id_User,
        userToFollowId
      })
      .into(FollowDatabase.TABLE_NAME)
   
    } catch (err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }

  async unfollow (id_User: string, userToFollowId: string): Promise<any>{
    try {
      const result = await this.getConnection().raw (`
      DELETE FROM ${FollowDatabase.TABLE_NAME} 
      WHERE userToFollowId = "${userToFollowId}" AND id_user= "${id_User}"
    `)
    } catch (err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }
}