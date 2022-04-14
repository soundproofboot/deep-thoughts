import decode from 'jwt-decode';

class AuthService {
  // retrive data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user is still logged in
  loggedIn() {
    // check for saved token and if valid
    const token = this.getToken();
    // use type coersion to check of token is good
    return !!token && !this.isTokenExpired(token);
  }

  // check if token expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch(err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // set token to local storage and reload homepage
  login(idToken) {
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  // clear token from localStorage and force logout with reload
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
};

export default new AuthService();