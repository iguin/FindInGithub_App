import axios from 'axios';

class Api {

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api.github.com',
    });
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