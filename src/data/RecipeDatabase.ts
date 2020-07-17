import { BaseDatabase } from "./BaseDatabase";
import moment from 'moment'

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

}