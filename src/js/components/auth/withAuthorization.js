import React from 'react'
import AuthContext from './context'
import { withFirebase } from '../firebase'
import * as ROUTES from '../../constants/route'

const withAuthorization = condition => Componment => {
    class WithAuthorization extends React.Component {
        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if (!condition(authUser))
                    this.props.history.push(ROUTES.LANDING)
            })
        }

        componentWillUnmount() {
            console.log('authorization unmount')
            this.listener()
        }

        render() {
            return (
                <AuthContext.Consumer>
                    {auth =>
                        condition(auth) ? <Componment {...this.props} auth={auth} /> : null
                    }
                </AuthContext.Consumer>
            )
        }
    }
    return withFirebase(WithAuthorization)
}

export default withAuthorization