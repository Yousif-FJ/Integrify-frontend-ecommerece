import User from "../users/User.type"

type AuthUser = {
    token?: string,
    user?: User   
}

export default AuthUser;