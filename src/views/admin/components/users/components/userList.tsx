import {usePowerUserStore} from "@/store/powerusers.store";
import {Box, Grid, Typography} from "@mui/material";
import {UserItem} from "@/views/admin/components/users/components/userItem";

const styles = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height:"calc(100vh - 112px",
    overflowY:"auto",
}




export const UserList = () => {
    const {powerUsers} = usePowerUserStore()

    return (
        <Box sx={ styles }>

            <Grid container>
                <Grid item xs={4}>
                    <Typography>Username</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Password</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography>Operation</Typography>
                </Grid>
            </Grid>

            <Box sx={{width:"100%"}} >
                {
                    powerUsers.map(powerUser => <UserItem powerUser={powerUser} key={powerUser.id} />)
                }
            </Box>




        </Box>
    )
}