import React from 'react';
import {Box, Grid} from "@mui/material";
import ListModel from "@/views/admin/components/model/components/ListModel";
import Create from "@/views/admin/components/model/components/create";

const styles = {width:"100%", height:"100%", display:"flex",  flexDirection:"column",justifyContent:"center", alignItems:"center"}

const Model = () => {
    return (
        <Grid container gap={{xs:2, lg:0}}>
            <Grid item xs={12} lg={2}>
                <Create />
            </Grid>
            <Grid item xs={12} md={10}>
                <Box sx={styles}>
                    <ListModel />
                </Box>
            </Grid>
        </Grid>

    );
};

export default Model;