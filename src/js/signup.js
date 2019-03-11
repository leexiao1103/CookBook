import React, { PureComponent } from 'react'
import FBase from './firebase'
import * as ROUTES from './constants/route'
import { Button, Form, Segment, Grid } from 'semantic-ui-react'

const INIT_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

export default class Signup extends PureComponent {
    state = INIT_STATE

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    onSubmit = event => {
        event.preventDefault()
        const { username, email, passwordOne } = this.state
        FBase.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return FBase.user(authUser.user.uid).set({ username, email })
            })
            .then(() => {
                this.setState({ ...INIT_STATE })
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                this.setState({ error })
            })
    }

    render() {
        let { username, email, passwordOne, passwordTwo, error } = this.state
        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''

        return (
            <div>
                <style>{`
                    body > div,
                    body > div > div,
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
                                    name='username'
                                    value={username}
                                    onChange={this.onChange}
                                    placeholder='暱稱'
                                />
                                <Form.Input
                                    fluid
                                    icon='mail'
                                    iconPosition='left'
                                    name='email'
                                    value={email}
                                    onChange={this.onChange}
                                    placeholder='信箱(以此為帳號)'
                                />
                                <Form.Input
                                    fluid
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    name='passwordOne'
                                    value={passwordOne}
                                    onChange={this.onChange}
                                    placeholder='密碼'
                                />
                                <Form.Input
                                    fluid
                                    type='password'
                                    icon='lock'
                                    iconPosition='left'
                                    name='passwordTwo'
                                    value={passwordTwo}
                                    onChange={this.onChange}
                                    placeholder='再次確認密碼'
                                />
                                {error && <p style={{ color: 'red' }}>{error.message}</p>}
                                <Button
                                    fluid
                                    size='large'
                                    color='teal'
                                    type='submit'
                                    disabled={isInvalid}
                                >
                                    Signup
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}
