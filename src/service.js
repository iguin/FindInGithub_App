import axios from 'axios';

class Api {

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com',
    });
  }
  
  // Default fetch
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

  // Return user data
  getUser(user) {
    return this.instance.get(`/users/${user}`);
  }

  // Return the api rate limit
  getRateLimit() {
    return this.instance.get('/rate_limit');
  }

}

export default new Api;