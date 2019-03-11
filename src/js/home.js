import React, { PureComponent } from 'react'
import * as ROUTES from './constants/route'
import FBase from './firebase'
import ToolCenter from './toolcenter'
import CardGroup from './cardgroup'
import AddBoard from './addboard'

export default class Home extends PureComponent {
    state = {
        cardData: {},
        isAddBoardOpen: false,
        isDeleteOpen: false,
    }

    componentDidMount() {
        this.props.history.index = 0
        const user = FBase.getCurrentUser()
        if (user) {
            FBase.user(`${user.uid}/food`).on('value', snapshot => {
                this.setState(() => ({
                    cardData: snapshot.val()
                }))
            })
        } else {
            this.props.history.push(ROUTES.SIGN_IN)
        }
    }

    toggleAddBoard = () => {
        const { isAddBoardOpen } = this.state
        this.setState(() => ({
            isAddBoardOpen: !isAddBoardOpen
        }))
    }

    toggleDelete = () => {
        const { isDeleteOpen } = this.state
        this.setState({
            isDeleteOpen: !isDeleteOpen
        })
    }

    render() {
        const { cardData, isAddBoardOpen, isDeleteOpen } = this.state

        return (
            <React.Fragment>
                <CardGroup
                    cardData={cardData}
                    isDeleteOpen={isDeleteOpen}
                    toggleDelete={this.toggleDelete} />
                <ToolCenter
                    toggleAddBoard={this.toggleAddBoard}
                    toggleDelete={this.toggleDelete}
                    toggleCheckDelete={this.toggleCheckDelete} />
                <AddBoard
                    visible={isAddBoardOpen}
                    toggleAddBoard={this.toggleAddBoard} />
            </React.Fragment>
        )
    }
}
