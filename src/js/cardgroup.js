import React, { PureComponent } from 'react'
import FBase from './components/firebase'
import { Card, Segment, Button } from 'semantic-ui-react'
import CardItem from './carditem'
import CardDetail from './carddetail'
import CheckDelete from './checkdelete'
import { withData } from './components/data'
import { withToggle } from './components/toggle'

class CardGroup2 extends PureComponent {
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
			return (
				FBase.user(`mom/food/${val}`).remove()
			)
		})
	}

	render() {
		const { isDeleteOpen, data, toggleDelete } = this.props
		const { selectCard, isCardDetailOpen, deleteTarget } = this.state
		console.log(this.props)
		const cards = Object.keys(data).map(key =>
			<CardItem
				key={key}
				id={key}
				value={data[key]}
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
					data={data[selectCard] || {}}
					visible={isCardDetailOpen}
					toggleCardDetail={this.toggleCardDetail} />
			</React.Fragment>
		)
	}
}



class CardGroup extends PureComponent {
	render() {
		console.log(this.props)
		const InsertCard = () => (
			<Card onClick={this.props.toggleAddBoard}>
				<Card.Content>
					<Segment basic textAlign='center'>
						<Button circular icon='facebook' size='massive'></Button>
					</Segment>

				</Card.Content>
			</Card>
		)
		const { data } = this.props
		const cards = Object.keys(data).map(key =>
			<CardItem
				key={key}
				id={key}
				value={data[key]}
				isDeleteOpen={false}
			/>
		)

		return (
			<React.Fragment>
				<Card.Group centered>
					<InsertCard />
					{cards}
				</Card.Group>
			</React.Fragment>
		)
	}
}

export default withData('food')(withToggle(CardGroup))