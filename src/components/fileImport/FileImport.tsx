import {Grid, Paper, Tab, Tabs} from "@mui/material";
import Header from "../template/Header.tsx";
import {ReactNode, SyntheticEvent, useState} from "react";
import StaticImport from "./StaticImport.tsx";
import ArticleImport from "./ArticleImport.tsx";

interface TabPanelProps {
    children: ReactNode,
    index: number,
    value: number
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const FileImport = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <>
            <Grid container sx={{mb: 3}}>
                <Grid item>
                    <Header text={"Import"}/>
                </Grid>
            </Grid>
            <Paper elevation={2} sx={{
                padding: 2,
                borderRadius: 3
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Static Import" {...a11yProps(0)} />
                            <Tab label="Article Import" {...a11yProps(1)} />
                        </Tabs>
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTabPanel value={value} index={0}>
                            <StaticImport />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1}>
                            <ArticleImport />
                        </CustomTabPanel>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default FileImport