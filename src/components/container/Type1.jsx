import React , {Component} from 'react';
import './style/type1.css';

class Type1 extends  Component{
    constructor(props){
        super(props);
        this.state = {};
        this.refComponent1 = React.createRef();
    }
    
    render() {
        let componentChildData = this.props.componentChildData || [];
        let ItemComponent = this.props.componentList[0] || '',
            ItemComponentData = componentChildData[0] || {};
        return (
            <div className='container-type1'>
                <span
                    className='select-component'
                    onClick={this.selectComponent.bind(this,0)}>
                    选择组件
                </span>
                {
                    ItemComponent ?
                    <ItemComponent
                        ItemComponentData={ItemComponentData}
                        getState={(callback=>{this.getState1 = callback})}
                        setComponentAttr={this.props.setComponentAttr} />
                    : ''
                }
                
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
            this.getState1(),
        ]
    }
}

export default Type1;
