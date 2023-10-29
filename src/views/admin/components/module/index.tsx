import {useModuleStore} from "@/store/module.store";
import {Box} from "@mui/material";
import {ModuleItem} from "@/views/admin/components/module/moduleItem";

export const Module = () =>  {
    const {modules} = useModuleStore()
    return (
        <Box sx={{display:"flex", flexWrap:"wrap"}}>
            {modules.sort((a, b) => a.id - b.id).map(item => <ModuleItem key={item.id} module={item} />)}
        </Box>
    )
}