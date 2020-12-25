import React, {Component} from 'react';
import {connect} from 'react-redux'

import ComponentAlert from '../../components/common/ComponentAlert'
import ComponentSetting from '../../components/common/ComponentSetting'
import Type1 from '../../components/container/Type1'
import Type2 from '../../components/container/Type2'
import Component1 from '../../components/business/Component1'
import Component2 from '../../components/business/Component2'

import GridStack from "gridstack/dist/gridstack.all.js";
import "gridstack/dist/gridstack.css";
import '../../style/gridstack-cover.css'
import './index.scss'

var allComponent = {Component1, Component2},
    allContainer = {Type1,Type2};

class ConfigPage extends Component {
    constructor(props) {
        super(props)
        //读取缓存数据
        let data = localStorage.getItem('data')
        data = data ? JSON.parse(data) : [];
        data = data.map((item) => {
            item.component = allContainer[item.name]
            item.componentChild = item.componentChild.map((item2)=>{
                return allComponent[item2];
            })
            return item;
        })
        this.state = {
            gridList: data,
            showComponentAlert:false,
            selectContainer:[],
            showSetAttr:false,
            attrObj:{}
        }
    }
    
    /**
     * 组建挂载完成
     */
    componentDidMount() {
        //,width:24,columns:24,
        this.gridStack = GridStack.init({margin: 10, cellHeight: 5, removeTimeout: 100}, this.gridStackDom);
    }
    /**
     * 组件销毁前
     */
    componentWillUnmount(){
        this.gridStack.destroy();//gridStack销毁
        
        this.gridStack.column = function (base) {//重写方法，处理报错
            return function () {
                try {
                    base.apply(this, arguments);
                }catch (e) {
                    console.log('gridStack已经销毁')
                }
            }
        }(this.gridStack.column);
    }
    /**
     * dom更新过滤
     * @param nextProps
     * @param nextState
     * @returns {boolean} 判断是否要更新render,  return true 更新  return false不更新
     */
    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }
    
    render() {
        return (
            <div className='index'>
                <header>
                    <li onClick={this.addComponent.bind(this, 'Type1')}>新增 Type1 容器</li>
                    <li onClick={this.addComponent.bind(this, 'Type2')}>新增 Type2 容器</li>
                    <li onClick={this.save}>保存</li>
                    
                    <li
                        onClick={this.loginOut}
                        className='loginOut'>
                        退出登录
                    </li>
                </header>
                <main style={{paddingRight:this.state.showSetAttr ? '400px' : 0}}>
                    <div className='grid-stack' ref={(dom) => {
                        this.gridStackDom = dom
                    }}>
                        {
                            this.state.gridList.map((item, index) => {
                                return (
                                    <div key={item.key}
                                         id={'grid-item' + index}
                                         className='grid-stack-item'
                                         component-key={item.key}
                                         component-name={item.name}
                                         data-gs-width={item.width || "6"}
                                         data-gs-height={item.height || "50"}
                                         data-gs-x={item.x || ""}
                                         data-gs-y={item.y || ""}>
                                        <div className='grid-stack-item-content'>
                                            <span
                                                className='grid-stack-item-del'
                                                onClick={this.delItem.bind(this, index)}>
                                                删除
                                            </span>
                                            <div className='component'>
                                                <item.component
                                                    ref={component => {
                                                        item.componentRef = component;
                                                    }}
                                                    componentList={item.componentChild}
                                                    componentChildData={item.componentChildData}
                                                    index={index}
                                                    selectComponent={this.selectComponent}
                                                    setComponentAttr={this.setComponentAttr} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </main>
                {
                    this.state.showComponentAlert ? (
                        <ComponentAlert
                            confirm={this.activeComponent}
                            allComponent={allComponent} />
                    ) : ''
                }
                {
                    this.state.showSetAttr ? (
                        <ComponentSetting
                            close={this.close}
                            attrObj={this.state.attrObj}
                            confirmSetting={this.confirmSetting}
                        />
                    ) : ''
                }
            </div>
        )
    }
    
    /**
     * 退出登录
     */
    loginOut = () => {
        this.props.setUserInfo();
    }
    
    /**
     * 新增模块
     * @param name 组件名称
     */
    addComponent(name) {
        this.setState({
            gridList: [
                ...this.state.gridList,
                {
                    name,
                    component: allContainer[name],
                    componentChild:[],
                    key: (new Date()).getTime() //生成key保证能够正确删除dom
                }
            ]
        }, () => {
            //把标签作为gridStack元素
            this.gridStack.makeWidget('#grid-item' + (this.state.gridList.length - 1))
        })
        
    }
    
    /**
     * 删除模块
     * @param index 删除索引
     */
    delItem(index) {
        //param1:：标签，param2：不删除dom （否则react render时候报错找不到删除节点 居然报错）
        this.gridStack.removeWidget(document.getElementById('grid-item' + index), false);
        this.setState(() => {
            let gridList = [...this.state.gridList];
            gridList.splice(index, 1)
            return {
                gridList
            }
        })
    }
    
    /**
     * 保存页面
     */
    save = () => {
        let data = this.state.gridList.map((item, index) => {
            let itemDom = document.getElementById('grid-item' + index);
            let componentChild = item.componentChild.map((item)=>{
                return item.name;
            })
            return {
                key: itemDom.getAttribute('component-key'),
                name: itemDom.getAttribute('component-name'),
                width: itemDom.getAttribute('data-gs-width'),
                height: itemDom.getAttribute('data-gs-height'),
                x: itemDom.getAttribute('data-gs-x'),
                y: itemDom.getAttribute('data-gs-y'),
                componentChild:componentChild,
                componentChildData:item.componentRef.getChildComponentData(),
            }
        })
        localStorage.setItem('data', JSON.stringify(data))
    }
    /**
     * 选择组件
     */
    selectComponent = (componentIndex,index) => {
        this.setState({
            showComponentAlert:true,
            selectContainer:[componentIndex,index],
        })
    }
    /**
     * 确定组件
     */
    activeComponent = (isConfirm,val)=>{
        this.setState(()=>{
            let gridList = this.state.gridList;
            if(isConfirm === true){
                let index1 = this.state.selectContainer[0],
                    index2 = this.state.selectContainer[1];
                gridList[index1].componentChild[index2] = allComponent[val];
            }
            return {
                gridList,
                showComponentAlert:false,
            }
        })
    }
    /**
     * 设置组件属性 TODO 该功能暂未开发
     */
    setComponentAttr = (attrObj,callback)=>{
        this.saveAttrCallback = callback;
        this.setState({
            showSetAttr:true,
            attrObj:attrObj
        })
    }
    close  = () => {
        this.setState({
            showSetAttr:false,
        })
    }
    confirmSetting = (styleVals) => {
        this.setState(()=>{
            let attrObj = JSON.parse(JSON.stringify(this.state.attrObj));
            for (let item in styleVals) {
                attrObj.style[item*1].value = styleVals[item];
            }
            return {
                attrObj,
            }
        },()=>{
            this.saveAttrCallback(this.state.attrObj)
        })
    }
}


const mapStateToProps = (state) => {//值映射到props中
    return {}
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setUserInfo: (data) => {//用户信息和是否上传头像信息
            return dispatch({
                type: "SET_userInfo",
                data: data
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ConfigPage)
