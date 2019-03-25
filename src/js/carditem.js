import React, { Component } from 'react'
import { Dimmer, Card, Image, Label, Icon, Transition } from 'semantic-ui-react'
import { withToggle } from './components/toggle';

class CardItem extends Component {
  state = {
    isSelected: false
  }

  select = () => {
    const { changeDeleteTarget, id } = this.props

    changeDeleteTarget(id)
    this.setState(state => ({ isSelected: !state.isSelected }))
  }

  render() {
    const { id, data, isDeleteOpen, toggleCardDetail } = this.props
    const { isSelected } = this.state

    return (
      <Transition animation={'fade up'} duration={800} transitionOnMount={true}>
        <Dimmer.Dimmable link as={Card} dimmed={isDeleteOpen} onClick={!isDeleteOpen ? () => toggleCardDetail(id) : this.select}>
          <Image src={data.Img || ''} style={{ height: '290px', width: '290px' }} />
          <Card.Content>
            <Card.Header>
              <span className="right floated"><Label color="orange" basic>{data.Spec}</Label></span>
              {data.Name}
            </Card.Header>
            <Card.Meta>{data.Date}</Card.Meta>
            <Card.Description>
              {data.Desc}
            </Card.Description>
          </Card.Content>
          <Dimmer active={isDeleteOpen} >
            <Icon name='check circle outline' color={isSelected ? 'green' : 'grey'} size='massive' />
          </Dimmer>
        </Dimmer.Dimmable>
      </Transition>
    )
  }
}

export default withToggle(CardItem)