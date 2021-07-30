import React , {Component} from 'react';
import './style/type2.css';

class Type2 extends  Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render() {
        let componentChildData = this.props.componentChildData || [];
        let ItemComponent1 = this.props.componentList[0] || '',
            ItemComponent2 = this.props.componentList[1] || '',
            ItemComponentData = componentChildData[0] || {},
            ItemComponentData2 = componentChildData[1] || {};
        return (
            <div className='container-type2'>
                <div className='item'>
                    <span
                        className='select-component'
                        onClick={this.selectComponent.bind(this,0)}>
                        选择组件
                    </span>
                    { ItemComponent1 ?
                        <ItemComponent1
                            ItemComponentData={ItemComponentData}
                            getState={(callback=>{this.getState1 = callback})}
                            setComponentAttr={this.props.setComponentAttr} />  : ''}
                </div>
                <div className='item'>
                    <span
                        className='select-component'
                        onClick={this.selectComponent.bind(this,1)}>
                        选择组件
                    </span>
                    { ItemComponent2 ?
                        <ItemComponent2
                            ItemComponentData={ItemComponentData2}
                            getState={(callback=>{this.getState2 = callback})}
                            setComponentAttr={this.props.setComponentAttr} />  : ''}
                </div>
            </div>
        )
    }
    selectComponent = (index)=>{
        this.props.selectComponent(this.props.index,index);
    }
    /**
     * 获取子组件数据
     */
    getChildComponentData = ()=>{
        return [
            this.getState1 ? this.getState1() : null,
            this.getState2 ? this.getState2() : null,
        ]
    }
}

export default Type2;
