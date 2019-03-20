import React, { PureComponent } from 'react'
import * as ROUTES from './constants/route'
import { Button, Form, Segment, Grid, Loader } from 'semantic-ui-react'
import { withAuthorization } from './components/auth'


const INIT_STATE = {
    email: '',
    password: '',
    error: null
}

class Login extends PureComponent {
    state = INIT_STATE

    componentDidMount() {
        const user = this.props.firebase.getCurrentUser()
        if (user)
            this.props.history.push(ROUTES.LANDING)
    }


    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault()
        const { email, password } = this.state
        const { firebase } = this.props

        firebase.doSignInWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INIT_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        const { email, password, error } = this.state
        const { authUser } = this.props.auth
        

        return (
            authUser ?
                <React.Fragment>
                    <Loader active content='已登入，為您跳轉' />
                </React.Fragment>
                :
                <div>
                    <style>{`
                                body > #root,
                                body > #root > div ,
                                body > div > div > div {
                                height: 100%;
                                }
                            `}
                    </style>
                    <Grid textAlign="center" verticalAlign="middle" style={{ height: '100%' }}>
                        <Grid.Column style={{ maxWidth: 450 }}>
                            <Form size='large' onSubmit={this.onSubmit}>
                                <Segment>
                                    <Form.Input
                                        fluid
                                        icon='user'
                                        iconPosition='left'
                                        name="email"
                                        value={email}
                                        onChange={this.onChange}
                                        placeholder='E-mail'
                                    />
                                    <Form.Input
                                        fluid
                                        type='password'
                                        icon='lock'
                                        iconPosition='left'
                                        name="password"
                                        value={password}
                                        onChange={this.onChange}
                                        placeholder='Password'
                                    />
                                    {error && <p style={{ color: 'red' }}>{error.message}</p>}
                                    <Button
                                        fluid
                                        size='large'
                                        color='teal'
                                        type='submit'
                                    >
                                        Login
                                </Button>
                                </Segment>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </div>
        )
    }
}

export default withAuthorization(auth => true)(Login)
