import Typography from "@mui/material/Typography";

interface HeaderProps {
    text: string
}

const Header = (props: HeaderProps) => {
    return <Typography variant={"h4"} sx={{fontWeight: 700}}>{props.text}</Typography>
}

export default Header