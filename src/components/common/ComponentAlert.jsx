import React,{Component} from 'react';
import './style/componentAlert.css';

class ComponentAlert extends Component{
    constructor(props){
        super(props);
        let names = [];
        for (let item in this.props.allComponent) {
            names.push(item)
        }
        this.state = {
            names,
            active:0,
        };
    }
    render() {
        return (
            <div className='component-alert'>
                <div className='component-alert-box'>
                    <div className='component-list'>
                        {
                            this.state.names.map((item , index)=>{
                                return (
                                    <div
                                        key={item}
                                        onClick={()=>{this.setState({active:index})}}
                                        className={'item ' + (index === this.state.active ? 'active' : '')}>
                                        {item}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='footer-button'>
                        <span onClick={this.props.confirm}>取消</span>
                        <span onClick={this.confirm}>确定</span>
                    </div>
                </div>
            </div>
        )
    }
    confirm =()=>{
        this.props.confirm(true,this.state.names[this.state.active]);
    }
}

export default ComponentAlert;
