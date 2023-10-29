import {Grid, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {useHistory} from "react-router-dom";

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
    return (

        <List>
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