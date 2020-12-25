import React, {Component} from 'react'

import './index.scss'
import HomeList from '../../components/common/HomeList'
import { HomeApi } from '../../api/index'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            homeList:[],
        }
    }
    /**
     * 组建挂载完成
     */
    componentDidMount() {
        this.getHomeList();
    }
    
    render() {
        return (
            <div className='Home'>
                <div className='header'>Home</div>
                <HomeList list={this.state.homeList} />
            </div>
        )
    }
    
    /**
     * 获取视图列表数据
     */
    getHomeList = () => {
        HomeApi.getInlayView({}, (resData) => {
            if(resData.errorCode === 200){
                this.setState(()=>{
                    let homeList = resData.data || [];
                    homeList = homeList.map((item)=>{
                        item.viewTypeText = item.viewType === 0 ? "公用" : "专用";
                        item.viewClassifyText = this.viewClassifyFilter(item.viewClassify);
                        return item;
                    })
                    return {homeList}
                })
            }
        });
    }
    viewClassifyFilter = (viewClassify) => {
        for (let i = 0; i < viewTypeList.length; i++) {
            if (viewClassify*1 === viewTypeList[i].value) {
                return viewTypeList[i].label;
            }
        }
        return "其他";
    }
}
/**
 * 维度数据
 *
 */

export let viewTypeList = [
    {
        value: 5,
        label: "学生"
    },
    {
        value: 6,
        label: "教师"
    },
    {
        value: 7,
        label: "班级"
    },
    {
        value: 8,
        label: "课程"
    },
    {
        value: 9,
        label: "专业"
    },
    {
        value: 10,
        label: "单位/学院"
    },
    {
        value: 11,
        label: "学校"
    },
    {
        value: 12,
        label: "其他"
    }
];

export default Home;
