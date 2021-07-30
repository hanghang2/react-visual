import axios from 'axios'
import Qs from 'qs'

const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: 'http://sjpt.htc.edu.cn/visual-customer/',
    timeout: 1240000,
    headers: {
        "X-Invoker": "pc"
    },
    responseType: 'json',
    transformRequest: [function (data,config) {//请求前数据拦截处理
        //请求头json类型
        if (config && config.dataType === "json") {
            return data;
        }
        data = Qs.stringify(data);
        return data;
    }],
})

export default {
    init() {
        // 拦截器zyh
        axiosInstance.interceptors.request.use(config => {
            return config
        }, function (error) {
            return Promise.reject(error);
        });
        axiosInstance.interceptors.response.use(function (response) {
            return response.data;
        }, function (error) {
            return Promise.reject(error);
        });
    },
    axiosInstance
}
