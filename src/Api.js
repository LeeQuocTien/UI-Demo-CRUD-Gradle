const BASE_URL = "http://localhost:8080/api/students";

const Api = {

    async getAll() {
        return await fetch(BASE_URL, { method: 'GET' });
    },

    async create(item) {
        return await fetch(BASE_URL, { method: 'POST', body: JSON.stringify(item) });
    },
  
    async update(item) {
        return await fetch(BASE_URL/item.id, { method: 'PUT', body: JSON.stringify(item) });
    },
  
    async delete(id) {
        return await fetch(BASE_URL/id, { method: 'DELETE' });
    },
}

export default Api;