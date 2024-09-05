import User from "./User.type";
import { useState } from "react";
import RenderUsers from "./RenderUsers";
import RenderEditUser from "./RenderEditUser";


export default function UsersPage() {
    const [userBeingEdited, setUserBeingEdited] = useState<User | undefined>(undefined);

    return <>
        <div>
            {RenderUsers({ setUserBeingEdited })}
            {RenderEditUser({ user: userBeingEdited, setUserBeingEdited })}
        </div>
    </>
}
