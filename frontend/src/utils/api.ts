"use client";
import axios from "axios";

class Api {
  static instance: Api = null;

  static axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
  });

  static accessToken = "";

  static isRefreshing = false;
  static failedQueue = [];

  static setAccessToken(token: string) {
    this.accessToken = token;
    this.axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${token}`;
  }

  static processQueue(error?: Error, token = null) {
    this.failedQueue.forEach((prom) => {
      if (error) prom.reject(error);
      else prom.resolve(token);
    });
    this.failedQueue = [];
  }

  static initInterceptor() {
    this.axiosInstance.interceptors.response.use(
      // on fulfilled
      (response) => response,
      // on Error
      async (error) => {
        // Save the orignal request, url, header etc
        const originalRequest = error.config;

        // If forbidden
        if (error.response?.status === 403 && !originalRequest._retry) {
          // Mark that we have already retrying so that we don't retry unlimited times
          originalRequest._retry = true;

          // Out of all the requests, only the first makes the refresh api call
          if (!this.isRefreshing) {
            console.log("refreshing");
            // Mark that we have already made the refresh api call
            this.isRefreshing = true;
            try {
              const { data } = await this.axiosInstance.post(
                "/public/auth/refresh"
              );
              this.setAccessToken(data.accessToken);
              this.processQueue(null, data.accessToken);
            } catch (err) {
              this.processQueue(err, null);
              return Promise.reject(err);
            } finally {
              this.isRefreshing = false;
            }
          }

          return new Promise((resolve, reject) => {
            this.failedQueue.push({
              resolve: (token) => {
                originalRequest.headers["Authorization"] = "Bearer " + token;
                resolve(this.axiosInstance(originalRequest));
              },
              reject: (err) => reject(err),
            });
          });
        }

        return Promise.reject(error);
      }
    );
  }

  static async get(url: string, config = {}) {
    return Api.axiosInstance.get(url, {
      validateStatus: () => true,
      ...config,
    });
  }

  static async post(url: string, data = {}, config = {}) {
    return Api.axiosInstance.post(url, data, {
      validateStatus: () => true,
      ...config,
    });
  }
}

// Initialize interceptor once
Api.initInterceptor();

export default Api;
