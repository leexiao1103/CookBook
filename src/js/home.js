import React, { PureComponent } from 'react'
import ToolCenter from './toolcenter'
import CardGroup from './cardgroup'
import AddBoard from './addboard'
import { withAuthorization } from './components/auth'
import { ToggleContext } from './components/toggle'

class Home extends PureComponent {
    state = {
        cardData: {},
        isAddBoardOpen: false,
        isDeleteOpen: false,
    }

    componentDidMount() {
        //this.props.history.length = 0

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
        console.log('render home')
        console.log(this.props)
        return (
            <ToggleContext.Provider value={{ toggleAddBoard: this.toggleAddBoard, toggleDelete: this.toggleDelete }}>
                <CardGroup />
                <ToolCenter
                    toggleAddBoard={this.toggleAddBoard}
                    toggleDelete={this.toggleDelete}
                    toggleCheckDelete={this.toggleCheckDelete} />
                <AddBoard
                    visible={isAddBoardOpen}
                    toggleAddBoard={this.toggleAddBoard} />
            </ ToggleContext.Provider>
        )
    }
}

export default withAuthorization(auth => !!auth)(Home)