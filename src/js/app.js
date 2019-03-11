import React, { PureComponent } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import * as ROUTES from './constants/route'
import { AuthContext } from './components/Auth'
import LandingPage from './landingpage'
import Signup from './signup'
import Login from './login'
import Home from './home'
import FBase from './firebase'

export default class App extends PureComponent {
    state = {
        authUser: null
    }

    componentDidMount() {
        FBase.auth.onAuthStateChanged(authUser => {
            console.log(authUser)
            authUser ?
                this.setState({ authUser }) :
                this.setState({ authUser: null })
        })
    }

    componentWillUnmount() {
        console.log('Unmount app')
    }

    render() {
        console.log('render app')
        const { authUser } = this.state
        return (
            <AuthContext.Provider value={authUser}>
                <HashRouter>
                    <React.Fragment>
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.SIGN_IN} component={Login} />
                        <Route path={ROUTES.SIGN_UP} component={Signup} />
                    </React.Fragment>
                </HashRouter>
            </AuthContext.Provider>
        )
    }
}
