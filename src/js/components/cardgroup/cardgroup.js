import React, { PureComponent } from 'react'
import { Card } from 'semantic-ui-react'
import CardItem from './carditem'
import CardDetail from './carddetail'
import AddBoard from './addboard/addboard'
import { withData } from '../data'
import { AddBoardButton, DeleteButton, CheckDeleteButton } from '../../button'
import { CardGroupContext, toggleAddBoard, toggleDelete } from '.'

class CardGroup extends PureComponent {
	state = {
		isAddBoardOpen: false,
		isDeleteOpen: false,
		isCardDetailOpen: false,
		selectID: '',
		deleteTarget: []
	}

	toggleCardDetail = (cardID = '') => this.setState(state => ({
		isCardDetailOpen: !state.isCardDetailOpen,
		selectID: cardID
	}))

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
		const { isCardDetailOpen, isAddBoardOpen, isDeleteOpen, selectID } = this.state
		const { data } = this.props
		const cards = data && Object.keys(data).map(key =>
			<CardItem
				key={key}
				id={key}
				data={data[key]}
				toggleCardDetail={this.toggleCardDetail}
			/>
		)

		return (
			<CardGroupContext.Provider
				value={{
					cards: data,
					selectCard: { id: selectID, card: data[selectID] },
					isDeleteOpen,
					toggleAddBoard: () => this.setState(toggleAddBoard),
					toggleDelete: () => this.setState(toggleDelete),
					changeDeleteTarget: this.changeDeleteTarget,
					deleteData: this.deleteData
				}}
			>
				<Card.Group centered>
					{cards}
				</Card.Group>
				{!isDeleteOpen ?
					<div id='menu_btns'>
						{data ?
							<DeleteButton disabled={!!data} />
							: null
						}
						<AddBoardButton />
					</div>
					:
					<CheckDeleteButton />
				}
				{isAddBoardOpen ?
					<AddBoard />
					: null
				}
				{isCardDetailOpen ?
					<CardDetail
						toggleCardDetail={this.toggleCardDetail} />
					: null
				}
			</CardGroupContext.Provider>
		)
	}
}

export default withData('food')(CardGroup)