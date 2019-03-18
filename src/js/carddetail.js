import React, { Component } from 'react'
import FBase from './components/firebase'
import { Tab, Modal, Image, Icon } from 'semantic-ui-react'
import StepItem from './stepitem'
import MaterialItem from './materialitem'

export default class CardDetail extends Component {

    panes = [
        { menuItem: '材料', render: () => <Tab.Pane><MaterialItem materials={this.props.data['Materials']} /></Tab.Pane> },
        { menuItem: '做法', render: () => <Tab.Pane><StepItem steps={this.props.data['Steps']} /></Tab.Pane> },
        { menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
    ]

    render() {
        const closeicon = <Icon name='close' onClick={this.props.toggleCardDetail}></Icon>
                
        return (
            <Modal open={this.props.visible} closeIcon={closeicon}>
                <Modal.Header>{this.props.data['Name'] || ''}</Modal.Header>
                <Modal.Content scrolling>
                    <Image src={FBase.getDefaultImg} size='large' centered rounded />
                    <Tab menu={{ secondary: true, pointing: true, fluid: true, widths: 3 }} panes={this.panes} />
                </Modal.Content>
            </Modal>
        )

    }
}