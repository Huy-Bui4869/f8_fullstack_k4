import SERVER_API from "./configUtils";

const client = {
  serverApi: SERVER_API,
  token: null,
  setToken: function (token) {
    this.token = token;
  },

  async send(url, method, body = null) {
    url = `${this.serverApi}${url}`;
    // if (Object.keys(params).length) {
    //   url = url + "?" + new URLSearchParams(params).toString();
    // }
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
    };
    if (this.token) {
      options.headers["X-Api-Key"] = this.token;
    }
    if (body) {
      options.body = JSON.stringify(body);
    }
    const response = await fetch(url, options);
    const data = await response.json();
    return { response, data };
  },

  get(url) {
    return this.send(url, "GET");
  },

  post(url, body) {
    return this.send(url, "POST", body);
  },

  put(url, body) {
    return this.send(url, "PUT", body);
  },

  patch(url, body) {
    return this.send(url, "PATCH", body);
  },

  delete(url) {
    return this.send(url, "DELETE");
  },
};

export default client;
