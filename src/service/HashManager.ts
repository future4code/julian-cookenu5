import * as bcryptjs from "bcryptjs";

export default class HashManager {
    public async hash(text: string): Promise<string> {
        const rounds = 12   
        const salt = await bcryptjs.genSalt(rounds)
        const cipherText = await bcryptjs.hash(text, salt)

        return cipherText
    }

    public async compare(
        text: string, 
        cipherText: string
    ): Promise<boolean> {
        const result = await bcryptjs.compare(text, cipherText)
        return result
    }
}