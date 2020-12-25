import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    Input ,
    Button ,
    message ,
} from 'antd';
import {
    UserOutlined ,
    LockOutlined ,
} from '@ant-design/icons';
import { LoginApi } from '../../api/index'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            password:'',
        }
    }
    render() {
        return (
            <div style={LoginStyle.content}>
                <div style={LoginStyle.main}>
                    <h1 style={LoginStyle.title}>可视化平台</h1>
                    <Input
                        style={LoginStyle.userName}
                        value={this.state.userName}
                        onChange={this.userNameChange}
                        placeholder="请输入用户名"
                        prefix={<UserOutlined />}
                    />
                    <Input.Password
                        value={this.state.password}
                        onChange={this.passwordChange}
                        placeholder="请输入密码"
                        prefix={<LockOutlined />}
                    />
                    <Button
                        type="primary"
                        onClick={this.login}
                        style={LoginStyle.loginBtn}
                    >
                        登录
                    </Button>
                </div>
            </div>
        )
    }
    userNameChange = (e) => {
        this.setState({
            userName:e.target.value
        })
    }
    passwordChange = (e) => {
        this.setState({
            password:e.target.value
        })
    }
    login = () => {
        if(!this.state.userName){
            message.error('请输入用户名！',1);
            return;
        }
        if(!this.state.password){
            message.error('请输入密码！',1);
            return;
        }
    
        LoginApi.login(JSON.stringify({
            account: this.state.userName,
            password: this.state.password
        }), (res) => {
            if(res.errorCode === 200){
                this.props.setUserInfo(res.data);
            }else{
                message.error('用户名或密码不正确！',1);
            }
        });
    }
}
let LoginStyle = {
    content:{
        width:'100%',
        height:'100%',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
    },
    main:{
        width:'500px',
        border:'1px solid #ccc',
        padding:'20px 20px 50px 20px',
        borderRadius:'5px'
    },
    title:{
        textAlign:'center',
    },
    userName:{
        marginBottom:'20px',
    },
    loginBtn:{
        width:'100%',
        marginTop :'20px',
    }
}

const mapStateToProps = (state) => {//值映射到props中
    return {}
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {
        setUserInfo: (data) => {
            return dispatch({
                type: "SET_userInfo",
                data: data
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
