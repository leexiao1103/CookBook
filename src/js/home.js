import React, { PureComponent } from 'react'
import ToolCenter from './toolcenter'
import CardGroup from './cardgroup'
import AddBoard from './addboard'
import { withAuthorization } from './components/auth'
import { ToggleContext, toggleAddBoard, toggleDelete } from './components/toggle'
import { AddBoardButton, DeleteButton, CheckDeleteButton } from './button'


class Home extends PureComponent {
    state = {
        isAddBoardOpen: false,
        isDeleteOpen: false,
        deleteTarget: []
    }

    changeDeleteTarget = (id) => {
        const { deleteTarget } = this.state
        const idx = deleteTarget.indexOf(id)

        if (idx < 0) {
            this.setState(({ deleteTarget }) => ({
                deleteTarget: [...deleteTarget, id]
            }))
        } else {
            deleteTarget.splice(idx, 1)
            this.setState({
                deleteTarget: deleteTarget
            })
        }
    }

    deleteData = () => {
        const { deleteTarget } = this.state
        const { firebase } = this.props
        const uid = firebase.getCurrentUser().uid

        deleteTarget.map((val) => firebase.removeData(`users/${uid}/food/${val}`))
    }

    render() {
        console.log('render home')
        const { isAddBoardOpen, isDeleteOpen } = this.state

        return (
            <ToggleContext.Provider
                value={{
                    isDeleteOpen,
                    toggleAddBoard: () => this.setState(toggleAddBoard),
                    toggleDelete: () => this.setState(toggleDelete),
                    changeDeleteTarget: this.changeDeleteTarget,
                    deleteData: this.deleteData
                }}
            >
                <CardGroup />
                {!isDeleteOpen ?
                    <div id='menu_btns'>
                        <AddBoardButton />
                        <DeleteButton />
                    </div>
                    :
                    <div id='check_delete_btns'>
                        <CheckDeleteButton />
                    </div>
                }

                {isAddBoardOpen ?
                    <AddBoard />
                    : null
                }

            </ToggleContext.Provider>
        )
    }
}

export default withAuthorization(auth => !!auth)(Home)