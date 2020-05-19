import axios from 'axios';

class Api {

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com',
    });
  }
  
  fetchURL(url) {
    return axios.get(url);
  }

  // Return search user promisse
  searchUser(username) {
    return this.instance.get(`/search/users`, {
      params: {
        q: username
      }
    });
  }

}

export default new Api;