import React from 'react'
import { Tab, Modal, Image, Icon, Button, Transition } from 'semantic-ui-react'
import StepItem from './addboard/stepitem'
import MaterialItem from './addboard/materialitem'
import { withCardGroup } from './context';

const CardDetail = props => {
    const { selectCard, toggleCardDetail, toggleAddBoard } = props
    const closeicon = <Icon name='close' onClick={toggleCardDetail}></Icon>
    const panes = [
        { menuItem: '材料', render: () => <Tab.Pane><MaterialItem materials={selectCard.card.Materials} /></Tab.Pane> },
        { menuItem: '做法', render: () => <Tab.Pane><StepItem steps={selectCard.card.Steps} /></Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ]

    return (
        <Transition animation={'fly down'} duration={800} transitionOnMount={true}>
            <Modal open={true} closeIcon={closeicon}>
                <Modal.Header>{selectCard.card.Name || ''}</Modal.Header>
                <Modal.Content scrolling>
                    <Image src={selectCard.card.Img || ''} size='large' centered rounded />
                    <Tab menu={{ secondary: true, pointing: true, fluid: true, widths: 3 }} panes={panes} />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        inverted
                        color='violet'
                        content='Edit'
                        onClick={toggleAddBoard}
                    />
                </Modal.Actions>
            </Modal>
        </Transition>
    )
}

export default withCardGroup(CardDetail)