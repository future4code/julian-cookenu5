import * as jwt from "jsonwebtoken";

interface AuthenticationData{
    id: string
}

export class Authenticator {
    private static EXPIRES_IN = ""; // inserir tempo de expiração
    public generateToken(input: AuthenticationData): string{
        const token = jwt.sign(
            {id: input.id},
            process.env.JWT_KEY as string,  // JWT_KEY ainda não está conf no .env
            {expiresIn: Authenticator.EXPIRES_IN}
        )
        return token
    }

    public getData(token: string): AuthenticationData{
        const payload = jwt.verify(token, process.env.JWT_KEY as string ) as any;
        const result: AuthenticationData = {
            id: payload.id
        }
        return result
    }
    
}