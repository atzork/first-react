import axios from "axios";

const apiUrl = 'https://jsonplaceholder.typicode.com';

export default class PostService {
    static async getAll(_limit = 10, _page = 1) {
            const response = await axios.get(
                `${apiUrl}/posts`,
                { params: { _limit, _page } }
            )
            return response;
    }

    static async getPost(id) {
        return await axios.get(`${apiUrl}/posts/${id}`)
    }

    static async getComments(id) {
        return await axios.get(`${apiUrl}/posts/${id}/comments`)
    }
}