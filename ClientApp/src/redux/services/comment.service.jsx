import axios from './http.service'
import { commentsLimit } from '../helpers/constants';

class CommentService {
    async getPaginated(offset=0, productId) {
        const response = await axios.get(`comments/get-paginated?limit=${commentsLimit}&offset=${offset}&productId=${productId}`);
        return response.data;
    }
    async get(id){
        const response = await axios.get(`comments/get/${id}`)
        return response.data;
    }
    async create(data) {
        const response = await axios.post("comments/create", data);
        return response.data;
    }
    async update(data) {
        const response = await axios.post(`comments/update/${data.id}`, data)
        return response.data;
    }
    async remove(id){
        const url = `comments/delete/${id}`;
        const response = await axios.delete(url);
        return response.data;
    }
}

export default new CommentService();