import axios from './http.service'
import jwtDecode from 'jwt-decode'

const authAction = (response) => {
    if ( response.data ) {
        const tokens = response.data;
        const token = tokens.token;
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("refresh_token", JSON.stringify(tokens.refresh_token));
    }
    return response.data;
}

class AuthService {
    async login(login, password) {
        return axios
            .post("/auth/login", {login, password})
            .then(authAction);
    }

    async refreshToken(){
        return axios
        .post("/auth/refresh")
        .then(authAction)
    }

    async resetPassword(password, confirmPassword) {
        return axios
            .post("/auth/reset-password", {password, confirmPassword})
            .then(authAction);
    }

   async logout() {
        await axios.get("/auth/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
    }
}

export default new AuthService();
