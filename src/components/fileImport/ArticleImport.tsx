import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {InputLabel, MenuItem, Select, SelectChangeEvent, Stack, Tooltip} from "@mui/material";
import {useState} from "react";
import CsvImport from "./shared/CsvImport.tsx";
import JsonImport from "./shared/JsonImport.tsx";
import PdfArticleImport from "./articleImport/PdfArticleImport.tsx";
import {Info} from "@mui/icons-material";

interface staticType{
    name: string,
    value: string
}

const ArticleImport = () => {
    const [selectedType, setSelectedType] = useState("pdf");
    const types: staticType[] = [
        {
            name: "PDF",
            value: "pdf"
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
               }}>Article Import</Typography>
               <Tooltip title={"Imports to articles page"}>
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
           {selectedType === "pdf" ? <PdfArticleImport /> :
               selectedType === "csv" ?
                   <CsvImport mode={"article"} /> : <JsonImport mode={'article'} />}
       </>
    )
}

export default ArticleImport