import React, {Component} from 'react'
import {
    CloseOutlined,
} from '@ant-design/icons';
import {
    Switch,
    Button,
} from 'antd'

import './style/componentSetting.scss'

class ComponentSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            styleVals:{},
        }
    }
    render() {
        return (
            <div className='component-setting'>
                <div className='title'>
                    <span>属性设置</span>
                    <CloseOutlined
                        onClick={this.props.close}
                        className='closeOutlined'/>
                </div>
                <div className='setting-style-content'>
                    {
                        this.props.attrObj.style ? (
                            this.props.attrObj.style.map((item, i) => {
                                return (
                                    <Attr
                                        onChange={this.onChange}
                                        key={item.callbackStr + i}
                                        index={i}
                                        data={item} />
                                )
                            })
                        ) : ''
                    }
                </div>
                
                <div className='footer-btn'>
                    <Button onClick={this.props.close}>取消</Button>
                    <Button
                        onClick={this.props.confirmSetting.bind(this,this.state.styleVals)}
                        type="primary" >
                        确定
                    </Button>
                </div>
            </div>
        )
    }
    onChange = (val,index)=>{
        this.setState(()=>{
            let styleVals = JSON.parse(JSON.stringify(this.state.styleVals));
            styleVals[index] = val;
            return {
                styleVals
            }
        })
    }
}

function Attr(props) {
    const { data ,onChange , index } = props;
    if(data.type === "Boolean"){
        return (
            <div className='attr-item'>
                <span className='attr-item-label'>{data.name}</span>
                <div className='attr-item-value'>
                    <Switch
                        defaultChecked={data.value}
                        onChange={(val)=>{onChange(val,index)}}
                    ></Switch>
                </div>
            </div>
        )
    }
    return (
        <div>
            没有开发这种类型设置组件
        </div>
    )
}

export default ComponentSetting;
