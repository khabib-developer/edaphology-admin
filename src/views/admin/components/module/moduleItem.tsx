import {IModule} from "@/types";
import {Box, Switch, Typography} from "@mui/material";
import React from "react";
import {useModuleHook} from "@/hooks/module/module.hook";


export const ModuleItem = ({module}: {module: IModule}) => {
    const [checked, setChecked] = React.useState(module.status);

    const { changeModule } = useModuleHook()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        changeModule({...module, status: event.target.checked}).then(() => console.log("Module"))
    };
    return (
        <Box sx={{display:"flex", alignItems:"center", width:"33%", justifyContent:"center"}}>
            <Box sx={{display:"flex", width:"50%", justifyContent:"start", alignItems:"center"}}>
                <Typography>{module.name}</Typography>
                <Switch
                    checked={checked}
                    onChange={handleChange}
                />
            </Box>

        </Box>
    )
}