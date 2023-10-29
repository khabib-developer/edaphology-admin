import Pages from "@/views";
import {createTheme, ThemeProvider} from "@mui/material";
import {useAppStore} from "@/store/index.store";
import Loader from "@/components/loading";
import {ErrorMessage, InfoMessage} from "@/components/Notifier";

function App() {
    const {loading} = useAppStore()
    return (
        <ThemeProvider theme={createTheme()}>
            <Pages/>
            <ErrorMessage />
            <InfoMessage />
            {loading&&<Loader />}
        </ThemeProvider>
    )
}

export default App
