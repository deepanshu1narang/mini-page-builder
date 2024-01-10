import React from 'react';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

function Header(props) {
    // this will download the JSON object (data of the page) and will show a message that data has been exported 
    const fnExport = () => {
        let dataExp = localStorage.getItem('pageBuilderComponents');
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(dataExp)}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "exported_data.json";
        link.click();
        props.setSnackbarMsg({
            "show": true,
            "message": `Data exported and you can download it.`,
            "type": "success"
        })
    }
    // to clear the page on  a single click
    const clearPage = () => {
        localStorage.removeItem('pageBuilderComponents');
        props.setComponents([]);
    }
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: "relative", top: 0, width: "100%", marginBottom: "0.5rem", height: "4rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", padding: "0 0.5rem", marginLeft: "-0.5rem", marginTop: "-0.5rem" }} >
            <h1 style={{ margin: 0 }} >Mini Page Builder</h1>
            <Stack direction="row">
                <Button variant="outlined" sx={{ margin: 0, height: "2rem", marginRight: "0.5rem", textTransform: "none" }} onClick={clearPage}>Clear</Button>
                <Button variant="contained" sx={{ margin: 0, height: "2rem", textTransform: "none" }} onClick={fnExport}>Export</Button>
            </Stack>
        </Stack>
    )
}

export default Header
