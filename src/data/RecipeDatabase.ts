import { BaseDatabase } from "./BaseDatabase";

export class RecipeDatabase extends BaseDatabase {
     
    private static TABLE_NAME = "Cookenu_Recipe"; 
  
    async createRecipe(
      id: string,      
      title: string,
      description: string,
      id_user: string,
      createdAt: Date
    ) {
      try {
          await this.getConnection()
            .insert({
              id,
              title,
              description,
              id_user,
              createdAt 
            })
            .into(RecipeDatabase.TABLE_NAME)

            BaseDatabase.destroyConnection(); 
            
      } catch (error) {
        throw new Error(error.sqlMessage || error.message)
      }
    }

    public async getRecipeById(id: string): Promise<any> {
      const result = await this.getConnection()
        .select("*")
        .from(RecipeDatabase.TABLE_NAME)
        .where({ id });
        return result[0];
    } 

    public getFeed = async (id_user: string): Promise<any> => {
      const result = await this.getConnection().raw(`
          SELECT r.title, r.description, r.createdAt, u.name FROM Cookenu_Recipe r
          JOIN Cookenu_Follow f ON f.userToFollowId = r.id_user AND f.id_user = '${id_user}'
          JOIN Cookenu_User u ON r.id_user = u.id;
        `)
      return result[0]
    }
}