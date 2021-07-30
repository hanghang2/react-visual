import React, {Component} from 'react'

import {withRouter} from 'react-router-dom' //路由组建
import { PlusOutlined } from '@ant-design/icons'
import './style/HomeList.scss'

class HomeList extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    /**
     * 组建挂载完成
     */
    componentDidMount(){
    
    }
    render() {
        return (
            <div className='HomeList'>
                <div
                    className='item add'
                    onClick={this.addView}>
                    <PlusOutlined />
                </div>
                {
                    this.props.list.map((item)=>{
                        return (
                            <div
                                className='item'
                                key={item.id}>
                                <div className='title'>{item.viewName}</div>
                                <div className="other">
                                    类型：{item.viewTypeText}、维度：{item.viewClassifyText}
                                </div>
                                <div className="handle">
                                    <span className='del'>删除</span>
                                    <span className='view'>查看</span>
                                    <span className='edit'>编辑</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    addView = () => {
        this.props.history.push({pathname:'/ConfigPage'})
    }
}

export default withRouter(HomeList);
