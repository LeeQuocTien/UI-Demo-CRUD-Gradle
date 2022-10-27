import axios from "axios";

class Api {

    BASE_URL = "http://localhost:8080/api/students";

    async getAll() {
      return await axios.get(this.BASE_URL);
    }

    async create(item) {
        return await axios.post(this.BASE_URL, item);
      }
  
    async update(item) {
      return await axios.put(`${this.BASE_URL}/${item.id}`, item);
    }
  
    async delete(id) {
        return await axios.delete(`${this.BASE_URL}/${id}`);
      }
  }
  
  export default Api;