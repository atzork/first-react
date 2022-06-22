import axios from "axios";

export default class PostService {
    static async getAll(_limit = 10, _page = 1) {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`,
                { params: { _limit, _page } }
            )
            return response;
    }
}