import React, { Component } from 'react'
import { defalutimg } from './firebase'
import { Dimmer, Card, Image, Label, Icon } from 'semantic-ui-react'

export default class CardItem extends Component {
  state = {
    isSelected: false
  }

  select = () => {
    const { changeDeleteTarget, id } = this.props
    const change = !this.state.isSelected

    changeDeleteTarget(id)
    this.setState({
      isSelected: change
    })
  }

  render() {
    const { value, isDeleteOpen, toggleCardDetail, id } = this.props
    const { isSelected } = this.state

    return (
      <Dimmer.Dimmable link as={Card} dimmed={isDeleteOpen} onClick={!isDeleteOpen ? () => toggleCardDetail(id) : this.select}>
        <Image src={defalutimg} />
        <Card.Content>
          <Card.Header>
            <span className="right floated"><Label color="orange" basic>{value.Spec}</Label></span>
            {value.Name}
          </Card.Header>
          <Card.Meta>{value.Date}</Card.Meta>
          <Card.Description>
            {value.Desc}
          </Card.Description>
        </Card.Content>
        <Dimmer active={isDeleteOpen} >
          <Icon name='check circle outline' color={isSelected ? 'green' : 'grey'} size='massive' />
        </Dimmer>
      </Dimmer.Dimmable>
    )
  }
}
