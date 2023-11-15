import {Button, Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useHistory} from "react-router-dom";
import {useAppStore} from "@/store/index.store";

export const massiveNames = [
    "Mirzacho'l",
    "Yangiobod",
    "Y.Oxunboboyev",
    "Bahor",
    "Chinobod",
    "Sirdaryo baliqchilik",
    "T.Axmedov",
    "Mustaqillik 5 yilligi",
    "Beruniy",
    "Shifokor Yangi-hayot",
    "Oqoltin",
    "Oqoltin shaharchasi",
    "Dehqonobod",
    "Navruz",
    "M.Ulug'bek",
    "Yangiyer baliqchilik",
    "O'rmon xo'jaligi 1",
    "Barlos",
    "Guliston",
    "A.Kulbekov",
    "O'rmon xo'jaligi 2",
    "G'.Yunusov",
    'Toshkent'
]

export const Database = () => {
    const history = useHistory();

    const { databaseUrl } = useAppStore()

    return (
        <List>
            <Grid container>
                <Button variant="outlined" color="success" sx={{mx:1, mb:3}}>
                    <a target="_blank" href={`${import.meta.env.VITE_BASE_URL}/${databaseUrl}`}>Hamma bazani yuklash</a>
                </Button>
            </Grid>
            <Grid container>
                {
                    massiveNames.map((name, index) => (
                        <Grid lg={3} item key={ name }>
                            <ListItem disablePadding>
                                <ListItemButton onClick={ () => history.push(`/admin/table/${ index }`) }>
                                    <ListItemText primary={ name }/>
                                </ListItemButton>
                            </ListItem>
                        </Grid>

                    ))
                }

            </Grid>
        </List>
    )
}