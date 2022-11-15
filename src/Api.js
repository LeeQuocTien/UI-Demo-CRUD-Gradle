import axios from "axios";

const BASE_URL = "http://localhost:8080/api/students";

const Api = {

    async getAll() {
        return await axios.get(BASE_URL);
    },

    async create(item) {
        return await axios.post(BASE_URL, item);
    },
  
    async update(item) {
        return await axios.put(`${BASE_URL}/${item.id}`, item);
    },
  
    async delete(id) {
        return await axios.delete(`${BASE_URL}/${id}`);
    },
}

export default Api;