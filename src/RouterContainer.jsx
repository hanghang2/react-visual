import React, {Component, Fragment} from 'react'
import {HashRouter, Switch, Route, Redirect} from 'react-router-dom' //BrowserRouter
import {connect} from 'react-redux'

//page
import Login from './view/Login'
import ConfigPage from './view/ConfigPage'
import Home from './view/Home'

class RouterContainer extends Component {
    render() {
        let userInfo = this.props.userInfo;
        return (
            <Fragment>
                <HashRouter>
                    {
                        userInfo ? (
                            <Switch>
                                {/*Switch : 渲染唯一路由*/}
                                <Route exact path="/Home" component={Home}/>
                                <Route exact path="/ConfigPage" component={ConfigPage}/>
                                <Redirect to="/Home"/>
                            </Switch>
                        ) : (
                            <Switch>
                                <Route exact path="/Login" component={Login}/>
                                <Redirect to="/Login"/>
                            </Switch>
                        )
                    }
                </HashRouter>
            </Fragment>
        )
    }
}


const mapStateToProps = (state) => {//值映射到props中
    return {
        userInfo: state.userInfo,
    }
}
const mapDispatchToProps = (dispatch) => {//setStore方法映射到props中
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(RouterContainer)
