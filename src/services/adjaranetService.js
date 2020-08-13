import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://api.adjaracant.xyz",
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

    getData(adjaraId) {
        // this one returns movie meta-data like ratings, posters, trailers etc. but not source files
        return apiClient.get(`get-data/${adjaraId}`)
    },

    getFiles(id, seasonIndex=1) {
        // this one returns media source files
        // needs `id` not `adjaraId`
        return apiClient.get(`get-files/${id}/${seasonIndex}`)
    }
}
