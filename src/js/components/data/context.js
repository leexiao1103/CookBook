import React from 'react'
import { Loader } from 'semantic-ui-react'
import { withFirebase } from '../firebase';

const DataContext = React.createContext(null)

const withData = dataRoute => Component => {
    class WithData extends React.Component {
        state = {
            loading: true,
            authUser: null,
            data: null
        }

        componentDidMount() {
            const { firebase } = this.props
            this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
                if (authUser) {
                    firebase.user(`${authUser.uid}/${dataRoute}`).on('value', snapshot =>
                        this.setState(() => ({
                            loading: false, data: snapshot.val() || null, authUser
                        })))
                } else {
                    this.setState(() => ({ loading: false, authUser: null, data: null }))
                }
            })
        }

        componentWillUnmount() {
            console.log('data unmount')
            const { firebase } = this.props
            const { authUser } = this.state
            this.listener()
            if (authUser)
                firebase.user(`${authUser.uid}/${dataRoute}`).off()
        }

        render() {
            console.log('render data')
            const { loading, authUser, data } = this.state
            return (
                loading ?
                    <Loader active size='small' inline='centered' />
                    :
                    authUser ? <Component {...this.props} data={data} /> : null
            )
        }
    }
    return withFirebase(WithData)
}

export default DataContext

export { withData }