import Axios from './axios'
Axios.init();
//登录页面
export const LoginApi = {
    login(param, success) {//登录
        postJsonHttp("/User/login", param, success);
    }
}
//首页
export const HomeApi = {
    getInlayView(param, success) {//查询系统所有视图
        getHttp("/viewWidget/getInlayView", param, success , 'visual');
    },
    deleteViewWidget(param, success) {//删除视图
        postHttp("/viewWidget/deleteViewWidget", param, success , 'visual');
    }
}

//get请求
function getHttp (url,param, success){
    Axios.axiosInstance.get(url, {params:param}).then((response) => {
        success(response)
    }).catch((err) => {
        console.log(err);
    })
}
//post请求
function postHttp (url,param, success){
    Axios.axiosInstance.post(url, param).then((response) => {
        success(response)
    }).catch((err) => {
        console.log(err);
    })
}

//post json请求
function postJsonHttp(url, param, success) {
    let config = {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "dataType": "json",
        }
    };
    Axios.axiosInstance.post(url, param, config).then((response) => {
        success(response);
    }).catch((err) => {
        console.log(err);
    });
}
if(false){
    console.log(getHttp,postHttp)
}
