import {useAppStore} from "@/store/index.store";
import {Alert, Snackbar} from "@mui/material";


export const ErrorMessage = () => {
    const {error, setError} = useAppStore()
    const handleClose = () => {
        setError(null)
    }
    return (
        <Snackbar open={!!error} anchorOrigin={{vertical:'top', horizontal: "center"}} autoHideDuration={2000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                { error }
            </Alert>
        </Snackbar>
    )
}

export const InfoMessage = () => {
    const {info, setInfo} = useAppStore()
    const handleClose = () => {
        setInfo(null)
    }
    return (
        <Snackbar open={!!info}  anchorOrigin={{vertical:'top', horizontal: "center"}} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                { info }
            </Alert>
        </Snackbar>
    )
}