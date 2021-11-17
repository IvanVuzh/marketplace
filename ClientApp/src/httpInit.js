import axios from './redux/services/http.service';

const httpInit = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if ( ! token ) {
        axios.defaults.headers.common['Authorization'] = null;
        return;
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${ token }`;
}

export default httpInit;