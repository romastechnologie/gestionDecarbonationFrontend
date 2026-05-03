import type { App } from "vue";
import type { AxiosResponse } from "axios";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/services/JwtService";
import { User } from "./auth";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  public static baseUrlBi: string;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    // ** const httpsAgent = new https.Agent({
    //  rejectUnauthorized: false, 
    // });

    ApiService.vueInstance.axios.defaults.baseURL ='http://localhost:3006/api';
    ApiService.vueInstance.axios.defaults['url'] ='http://localhost:3006';
    // ApiService.vueInstance.axios.defaults.baseURL ='https://api.romasprojet.com/api';
    //ApiService.baseUrlBi ='https://analytique.romasprojet.com/api';
    ApiService.baseUrlBi ='http://127.0.0.1:8000/api';
    // ApiService.vueInstance.axios.defaults.httpsAgent = httpsAgent;
    // ApiService.vueInstance.axios.defaults.baseURL ='http://72.61.194.222:3005/api';
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] ="application/json";
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] ="application/json";
    ApiService.vueInstance.use(VueAxios, axios);
  } 

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common["Authorization"] = `bearer ${JwtService.getToken()}`;
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] ="application/json";
    console.log(ApiService.vueInstance.axios.defaults.headers,'ApiService.vueInstance.axios.defaults.headers');
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(resource, params);
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string,slug = "" as string ): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.get(`${resource}/${slug}`);
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.post(`${resource}`, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(resource: string,slug: string,params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(resource: string, params: any): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    return ApiService.vueInstance.axios.delete(resource);
  }
}

export default ApiService;
