import React from 'react'
import AuthContext from './context'
import { withFirebase } from '../firebase'

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        state = {
            loading: true,
            authUser: null
        }

        componentDidMount() {
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                console.log('AUTH CHANGE')
                authUser ?
                    this.setState(() => ({ loading: false, authUser })) :
                    this.setState(() => ({ loading: false, authUser: null }))
            })
        }

        componentWillUnmount() {
            console.log('authentication unmount')
            this.listener()
        }

        render() {
            return (
                <AuthContext.Provider value={this.state}>
                    <Component {...this.props} loading={this.state.loading} />
                </AuthContext.Provider>
            )
        }
    }
    return withFirebase(WithAuthentication)
}

export default withAuthentication