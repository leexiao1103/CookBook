import React from 'react'
import { withAuthorization } from '../auth'
import { Loader } from 'semantic-ui-react'

const DataContext = React.createContext(null)

const withData = dataRoute => Component => {
    class WithData extends React.Component {
        state = {
            loading: true,
            data: {}
        }

        componentDidMount() {
            const { firebase, auth } = this.props
            firebase.user(`${auth.authUser.uid}/${dataRoute}`).on('value', snapshot => {
                this.setState({
                    loading: false,
                    data: snapshot.val()
                })
            })
        }

        componentWillUnmount() {
            console.log('data unmount')
            this.props.firebase.user(`${this.props.auth.authUser.uid}/${dataRoute}`).off()
        }

        render() {
            console.log('render data')
            const { data, loading } = this.state
            const { authUser } = this.props.auth
            return (
                <React.Fragment>
                    {loading ?
                        <Loader active size='small' inline='centered' />
                        :
                        authUser ? <Component {...this.props} data={data} /> : null
                    }
                </React.Fragment>
            )
        }
    }
    return withAuthorization(auth => true)(WithData)
}

export default DataContext

export { withData }