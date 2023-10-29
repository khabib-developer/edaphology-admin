import axios from "axios";
import {useAppStore} from "@/store/index.store";

const BASE_URL = "https://husan.airi.uz/api"

axios.defaults.baseURL = BASE_URL;

const useAxios = () => {
    const { setLoading, setError } = useAppStore();

    const fetchData = async (
        url,
        method = "GET",
        body?,
        headers?: { [key: string]: string},
        error = true,
        withCredentials = true,
        loading = true
    ) => {
        try {
            setLoading(loading);
            const config: unknown = {
                method,
                url,
                headers,
                withCredentials,
            };
            if (body) {
                config.data = body;
            }
            const res = await axios(config);
            return res.data;
        } catch (err) {
            console.log(err)
            if(err && error) {
                if(!err.response) return setError("Something went wrong :(")
                Object.values(err.response.data).forEach(err => {
                    setError(typeof err !== "string" ? err.message: err)
                })
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { fetchData };
};

export default useAxios;