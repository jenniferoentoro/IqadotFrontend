import {channel} from "../../dto/file/channel.ts";
import {MenuItem, Select, SelectProps} from "@mui/material";
import {JSX} from "react/jsx-runtime";

const ChannelSelect = (props: JSX.IntrinsicAttributes & SelectProps<unknown>) => {

    const channels: channel[] = [
        {
            id: "7a6f91e1-5ea7-7c54-7d00-12c3ee148075",
            name: "Starship 1"
        },
        {
            id: "4b6b2f38-1780-8698-1ac0-02b1613a9b19",
            name: "Starship 2"
        },
        {
            id: "f14e4530-2fbd-102f-f406-c4d190710071",
            name: "Starship 3"
        }
    ]

    return (
        <>
            <Select
                labelId="select-label"
                id="simple-select"
                label="Question Type"
                value={"label"}
                sx={{
                    width: "100%"
                }}
                {...props}
            >
                <MenuItem value={"label"} disabled={true} selected={true}>
                    {"Select a channel..."}
                </MenuItem>
                {channels.map((channel: channel, index: number) => {
                    return <MenuItem key={index} value={channel.id}
                    >
                        {channel.name}
                    </MenuItem>
                })}
            </Select>
        </>
    )
}

export default ChannelSelect