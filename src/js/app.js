import React from 'react'
import { Loader } from 'semantic-ui-react'
import { HashRouter, Route } from 'react-router-dom'
import * as ROUTES from './constants/route'
import { withAuthentication } from './components/auth'
import LandingPage from './landingpage'
import Signup from './signup'
import Login from './login'
import Home from './home'


const App = props => (
    <HashRouter>
        {props.loading ?
            <React.Fragment>
                <Loader active size='medium' inline='centered' />
            </React.Fragment>
            :
            <React.Fragment>
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.HOME} component={Home} />
                <Route path={ROUTES.SIGN_IN} component={Login} />
                <Route path={ROUTES.SIGN_UP} component={Signup} />
            </React.Fragment>
        }
    </HashRouter>
)

export default withAuthentication(App)
