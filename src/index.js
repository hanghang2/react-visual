import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux';//操作状态管理
import store from './store'; //状态管理
import RouterContainer from './RouterContainer'
import 'antd/dist/antd.css'
import './style/common.css'


ReactDOM.render(
    <Provider store={store}>
        <RouterContainer store={store}/>
    </Provider>,
    document.getElementById('root')
);
// 不使用严格模式
// <React.StrictMode>
//    <Index/>
// </React.StrictMode>

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
