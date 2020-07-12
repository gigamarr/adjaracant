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
        return apiClient.get(`search/${keywords}`)
    },

    getData(movieId) {
        // this one returns movie meta-data like ratings, posters, trailers etc. but not source files
        return apiClient.get(`get-data/${movieId}`)
    },

    getFiles(movieId) {
        // this one returns media source files
        // needs `id` not `adjaraId`
        return apiClient.get(`get-files/${movieId}`)
    }
}
