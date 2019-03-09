import React, { PureComponent } from 'react'
import { db } from './firebase'
import ToolCenter from './toolcenter'
import CardGroup from './cardgroup'
import AddBoard from './addboard'

export default class App extends PureComponent {
    state = {
        cardData: {},
        isAddBoardOpen: false,
        isDeleteOpen: false,
    }

    componentDidMount() {
        db.ref('mom/food').on('value', snapshot => {
            this.setState(() => ({
                cardData: snapshot.val()
            }))
        })
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
