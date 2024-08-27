import User from "./User"

type AuthUser = {
    token?: string,
    signedUse?: User   
}

export default AuthUser;