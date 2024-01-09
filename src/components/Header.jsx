import React from 'react';
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";

function Header(props) {
    // this will log the JSON object (data of the page) in console and will show a message that data has been exported 
    const fnExport = () => { 
        let dataExp = localStorage.getItem('pageBuilderComponents');
        console.log(dataExp);
        props.setSnackbarMsg({
            "show": true,
            "message": `Data exported. Please check console.`,
            "type": "success"
        })
    }
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ position: "relative", top: 0, width: "calc(100 - 1rem)%", marginBottom: "0.5rem", height: "4rem", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",  padding: "0 0.5rem" }} >
            <h1>Mini Page Builder</h1>
            <Button variant="contained" sx={{ margin: 0, height: "2rem" }} onClick={fnExport}>Export</Button>
        </Stack>
    )
}

export default Header
