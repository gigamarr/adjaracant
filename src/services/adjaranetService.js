import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://localhost:5000/",
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    search(keywords) {
        return apiClient.get(`search/keywords=${keywords}`)
    }
}
