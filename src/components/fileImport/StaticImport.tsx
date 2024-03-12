import Typography from "@mui/material/Typography";
import {useState} from "react";
import {InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import FillStaticImport from "./staticImport/FillStaticImport.tsx";
import CsvImport from "./shared/CsvImport.tsx";
import JsonImport from "./shared/JsonImport.tsx";
import {Info} from "@mui/icons-material";

interface staticType{
    name: string,
    value: string
}

const StaticImport = () => {
    const [selectedType, setSelectedType] = useState("fill");
    const types: staticType[] = [
        {
            name: "Fill Manually",
            value: "fill"
        },
        {
            name: "CSV",
            value: "csv"
        },
        {
            name: "JSON",
            value: "json"
        }
    ];

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedType(event.target.value as string);
    };

    return (
        <>
            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Typography variant={"h5"} sx={{
                    fontWeight: 700
                }}>Static Import</Typography>
                <Tooltip title={"Imports to static question page"}>
                    <Info />
                </Tooltip>
            </Stack>
            <Box sx={{
                height: 10
            }} />
            <InputLabel id="select-label">Type</InputLabel>
            <Select
                labelId="select-label"
                id="simple-select"
                value={selectedType}
                label="Question Type"
                onChange={handleChange}
                sx={{
                    width: "100%"
                }}
            >
                {types.map((type: staticType, index: number) => {
                    return <MenuItem key={index} value={type.value}>
                        {type.name}
                    </MenuItem>
                })}
            </Select>
            <Box sx={{
                height: 10
            }} />
            {selectedType === "fill" ? <FillStaticImport /> :
                selectedType === "csv" ?
                    <CsvImport mode={"static"} /> : <JsonImport mode={'static'} />}
        </>
    )
}

export default StaticImport