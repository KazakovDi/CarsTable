import axios from "axios";
import Cars from "./Cars";
export default class Api {
  baseUrl = "";
  cars: Cars;
  constructor() {
    this.cars = new Cars(this.request, this.baseUrl);
  }

  get request() {
    const instance = axios.create({
      baseURL: "https://myfakeapi.com/api",
    });

    instance.interceptors.request.use((config) => {
      config.data =
        '{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65"}';
      return config;
    });
    return instance;
  }
}

export const apiInterface = new Api();
