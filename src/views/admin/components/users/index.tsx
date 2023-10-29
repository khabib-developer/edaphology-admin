import React from 'react';
import {Box, Grid} from "@mui/material";
import {UserList} from "@/views/admin/components/users/components/userList";
import {CreateUser} from "@/views/admin/components/users/components/createUser";

const Users = () => {
    return (
        <Grid container>
            <Grid item xs={12} lg={6}>
                <UserList />
            </Grid>
            <Grid item xs={12} lg={6}>
                <CreateUser />
            </Grid>

        </Grid>
        // <Box sx={{width:"100%", height:"100%", display:"flex",  flexDirection:"column",justifyContent:"center", alignItems:"center"}}>
        //     <UserList />
        // </Box>
    );
};

export default Users;