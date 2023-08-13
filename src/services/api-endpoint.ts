const BASE_URL = "https://reqres.in/api";
const API_ENDPOINT = {
  /**
   * payload:
   *
   * {
   *    "email": string,
   *    "password": string
   * }
   */
  URL_LOGIN: `${BASE_URL}/login`,

  /**
   * add "/{id}" for specific user
   *
   * by default, show list paginated user
   */
  URL_USER: `${BASE_URL}/users`,

  /**
   * payload:
   *
   * {
   *    "email": string,
   *    "password": string
   * }
   */
  URL_USER_REGISTER: `${BASE_URL}/register`,
};
export default API_ENDPOINT;
