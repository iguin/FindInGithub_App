import axios from 'axios';

class Api {

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com',
    });
  }
  
  fetchURL(url, config = {}) {
    return axios.get(url, config);
  }

  // Return search user promisse
  searchUser(username) {
    return this.instance.get(`/search/users`, {
      params: {
        q: username
      }
    });
  }

  getUser(user) {
    return this.instance.get(`/users/${user}`);
  }

}

export default new Api;