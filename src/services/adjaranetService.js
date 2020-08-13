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

    getMetaInformation(adjaraId) {
        return apiClient.get(`get-data/${adjaraId}`)
		    .then(response => {
                const id = response.data.data.id;
                const seasons = response.data.data.seasons ? response.data.data.seasons.data.length : null;
                const isTvShow = response.data.data.isTvShow;
                const backgroundImage = response.data.data.covers.data['1920'];

                return { id, seasons, isTvShow, backgroundImage }
            })
    },

    getEpisodes(id, seasonIndex) {
        return apiClient.get(`get-files/${id}/${seasonIndex}`)
		    .then(response => {
			    return response.data.data
		    })
    }
}
