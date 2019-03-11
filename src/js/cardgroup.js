import React, { PureComponent } from 'react'
import FBase from './firebase'
import { Card } from 'semantic-ui-react'
import CardItem from './carditem'
import CardDetail from './carddetail'
import CheckDelete from './checkdelete'

export default class CardGroup extends PureComponent {
	state = {
		isCardDetailOpen: false,
		selectCard: '',
		deleteTarget: []
	}

	toggleCardDetail = (cardID = '') => {
		const { isCardDetailOpen } = this.state
		this.setState({
			isCardDetailOpen: !isCardDetailOpen,
			selectCard: cardID
		})
	}

	changeDeleteTarget = (val) => {
		const { deleteTarget } = this.state
		const idx = deleteTarget.indexOf(val)

		if (idx < 0) {
			this.setState(({ deleteTarget }) => ({
				deleteTarget: [...deleteTarget, val]
			}))
		} else {
			deleteTarget.splice(idx, 1)
			this.setState({
				deleteTarget: deleteTarget
			})
		}
	}

	deleteData = (target) => {
		target.map((val) => {
			return(
				FBase.user(`mom/food/${val}`).remove()
			)			
		})		
	}

	render() {		
		const { isDeleteOpen, cardData, toggleDelete } = this.props
		const { selectCard, isCardDetailOpen, deleteTarget } = this.state
		const cards = Object.keys(cardData).map(key =>
			<CardItem
				key={key}
				id={key}
				value={cardData[key]}
				isDeleteOpen={isDeleteOpen}
				changeDeleteTarget={this.changeDeleteTarget}
				toggleCardDetail={this.toggleCardDetail} />
		)

		return (
			<React.Fragment>
				<Card.Group centered>
					{cards}
				</Card.Group>
				<CheckDelete
					deleteData={() => this.deleteData(deleteTarget)}
					isDeleteOpen={isDeleteOpen}
					toggleDelete={toggleDelete} />
				<CardDetail
					data={cardData[selectCard] || {}}
					visible={isCardDetailOpen}
					toggleCardDetail={this.toggleCardDetail} />
			</React.Fragment>
		)
	}
}