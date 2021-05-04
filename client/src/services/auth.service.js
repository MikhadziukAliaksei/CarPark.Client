import axios from "axios";

const API_URL = "https://localhost:5001/api/authentication/";

export default class AuthService {
  constructor(props) {
    super(props);
  this.state = {
    isAuth : false
  };
}

  login(email, password) {
    return axios
      .post(API_URL + "login", {
        email,
        password
      })
      .then(response => {
        console.log(response)
        if (response.data.token) {
          
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        
        return response.data && this.state.isAuth(true);
      });
  }

  logout() {
    localStorage.removeItem("user");
    this.state.isAuth(false);
  }

  register(username, email, password) {
    return axios.post(API_URL + "register", {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}
