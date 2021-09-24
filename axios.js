import axios from 'axios'

const instance = axios.create({
    baseURL: "https://ecm-db.herokuapp.com"
});

instance.interceptors.response.use(
    (response) => {
        const { data } = response;
        return data;
    },
);

export default instance;
