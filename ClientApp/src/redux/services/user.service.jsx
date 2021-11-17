import { usersLimit } from '../helpers/constants';
import axios from './http.service'
import jwtDecode from "jwt-decode";

class UserService {
    async create(data) {        
        await axios.post("/users/create", data);
    }

    async getPaginated(offset=0) {
        const response = await axios.get(`users/get-paginated?limit=${usersLimit}&offset=${offset}`);
        return response.data;
    }

    async get(id) {
        const url = "users/get/" + id
        const response = await axios.get(url)
        return response.data;
    }

    async update(data) {
        const url = "users/update/" + data.id
        const response = await axios.post(url, data)
        return response.data;
    }

    async rateUser(userId, rating){
        alert(`User ${userId} rated with mark ${rating}`);
        // const url = `users/rate/${userId}/${rating}`
        // await axios.post(url, data)
    }

    async remove(id){
        const token = JSON.parse(localStorage.getItem("token"));
        const currentAdminId = jwtDecode(token).user_id;
        if (currentAdminId === id) {
            throw new Error("User you want to delete is you!");
        }
        const url = "users/delete/" + id
        const response = await axios.delete(url);
        return response.data;
    }
}

export default new UserService();
