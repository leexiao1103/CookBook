import React from 'react'
import { Tab, Modal, Image, Icon } from 'semantic-ui-react'
import StepItem from './stepitem'
import MaterialItem from './materialitem'

const CardDetail = props => {
    const { data, toggleCardDetail } = props
    const closeicon = <Icon name='close' onClick={toggleCardDetail}></Icon>
    const panes = [
        { menuItem: '材料', render: () => <Tab.Pane><MaterialItem materials={data['Materials']} /></Tab.Pane> },
        { menuItem: '做法', render: () => <Tab.Pane><StepItem steps={data['Steps']} /></Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ]

    return (
        <Modal open={true} closeIcon={closeicon}>
            <Modal.Header>{data['Name'] || ''}</Modal.Header>
            <Modal.Content scrolling>
                <Image src={data.Img || ''} size='large' centered rounded />
                <Tab menu={{ secondary: true, pointing: true, fluid: true, widths: 3 }} panes={panes} />
            </Modal.Content>
        </Modal>
    )
}

export default CardDetail