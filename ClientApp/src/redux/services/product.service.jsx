import axios from './http.service'
import { productsLimit } from '../helpers/constants';
class ProductService {
    async getPaginated(offset=0) {
        const response = await axios.get(`products/get-paginated?limit=${productsLimit}&offset=${offset}`);
        return response.data;
    }
    async get(id){
        const response = await axios.get(`products/get/${id}`)
        return response.data;
    }
    async create(data) {
        const response = await axios.post("products/create", data);
        return response.data;
    }
    async update(data) {
        const response = await axios.post(`products/update/${data.id}`, data)
        return response.data;
    }
    async remove(id){
        const url = `products/delete/${id}`;
        const response = await axios.delete(url);
        return response.data;
    }
}

export default new ProductService();