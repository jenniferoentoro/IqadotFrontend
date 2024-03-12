import {TableCell, TableRow} from "@mui/material";
import {UserResponse} from "../../dto/users/userResponse.ts";

interface UserCardProps {
    no: number,
    user: UserResponse
}

const UserCard = (props: UserCardProps) => {
    return <TableRow>
        <TableCell component="th" scope="row">
            {props.no + 1}{"."}
        </TableCell>
        <TableCell>
            {props.user.username}
        </TableCell>
        <TableCell>
            {props.user.firstName} {props.user.lastName}
        </TableCell>
        <TableCell>
            {props.user.email}
        </TableCell>
    </TableRow>
}

export default UserCard;