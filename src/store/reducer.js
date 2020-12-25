let defaultState = {
    userInfo:localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,//用户信息
}
//通知消息 store ---> reducer 数据收到改变通知
export default (state = defaultState, action = {})=>{
    if(typeof reducerFun[action.type] == 'function'){
        return reducerFun[action.type](state,action);
    }else{
        return state;
    }
}

//set state方法
const reducerFun = {
    SET_userInfo(state,action){//用户信息
        let userInfoStr = action.data ? JSON.stringify(action.data) : '';
        localStorage.setItem('userInfo',userInfoStr);
        return {...state,userInfo:action.data};
    }
}

