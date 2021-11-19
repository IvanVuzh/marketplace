import axios from './http.service'
import { categoriesLimit } from '../helpers/constants';
class CategoryService {
    async getPaginated(offset=0) {
        const response = await axios.get(`categories/get-paginated?limit=${categoriesLimit}&offset=${offset}`);
        return response.data;
    }
    async get(id){
        const response = await axios.get(`categories/get/${id}`)
        return response.data;
    }
    async create(data) {
        const response = await axios.post("categories/create", data);
        return response.data;
    }
    async update(data) {
        const response = await axios.post(`categories/update/${data.id}`, data)
        return response.data;
    }
    async remove(id){
        const url = `categories/delete/${id}`;
        const response = await axios.delete(url);
        return response.data;
    }
}

export default new CategoryService();