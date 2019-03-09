import React, { PureComponent } from 'react'
import { Button, Icon, Modal, Form, Header, Label, Item, Transition } from 'semantic-ui-react'
import { PushToDB } from './firebase'

export default class AddBoard extends PureComponent {
    state = {
        img: 'https://firebasestorage.googleapis.com/v0/b/cookbooktest-4fea9.appspot.com/o/image.png?alt=media&token=072ea1a7-b049-4842-a0b4-3d2b0bb3c57f',
        name: '',
        spec: '',
        materials: [],
        steps: [],
    }

    initState = () => {
        this.setState({
            img: 'https://firebasestorage.googleapis.com/v0/b/cookbooktest-4fea9.appspot.com/o/image.png?alt=media&token=072ea1a7-b049-4842-a0b4-3d2b0bb3c57f',
            name: '',
            spec: '',
            materials: [],
            steps: [],
        })
    }

    addMaterial = () => {
        const material = document.getElementById('foodform').material
        const { materials } = this.state

        if (material.value) {
            this.setState({
                materials: [...materials, material.value]
            })
            material.value = ''
        }
    }

    removeMaterial = (e) => {
        const materials = this.state.materials
        const val = e.currentTarget.getAttribute('data-val')
        const index = materials.indexOf(val)

        materials.splice(index, 1)
        this.setState({
            materials: materials
        })
    }

    addSteps = () => {
        const step = document.getElementById('foodform').step
        const { steps } = this.state

        if (step.value) {
            this.setState({
                steps: [...steps, step.value],
            })
            step.value = ''
        }
    }

    removeSteps = () => {
        let { steps } = this.state
        steps.pop()
        this.setState({
            steps: steps
        })
    }

    handleChange = (e, { name, value }) => {
        this.setState({
            [name]: value
        })
    }

    goSubmit = () => {
        const { img, name, spec, materials, steps } = this.state
        const { toggleAddBoard } = this.props
        const data = {
            Date: new Date().toLocaleDateString(),
            Img: img,
            Name: name,
            Spec: spec,
            Materials: materials,
            Steps: steps,
        }
        PushToDB('mom/food/', data)
        this.initState()
        toggleAddBoard()
    }

    render() {
        const { toggleAddBoard, visible } = this.props

        return (
            <Modal open={visible}>
                <Modal.Header>New</Modal.Header>
                <Modal.Content scrolling>
                    <Form id='foodform' size='big'>
                        <Form.Input
                            label='照片'
                            type="file"
                            accept="image/jpeg, image/png"
                        />
                        <Form.Group widths='equal'>
                            <Form.Input
                                name='name'
                                label='名字'
                                placeholder='取個名字吧'
                                onChange={this.handleChange}
                            />
                            <Form.Input
                                name='spec'
                                label='類別'
                                placeholder='是甚麼料理呢'
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                        <Form.Input
                            label='材料'
                            name='material'
                            placeholder='需要什麼呢'
                            icon={<Icon link color={'pink'} name={'plus'} onClick={this.addMaterial}></Icon>}
                        />
                        <Form.Field>
                            {
                                this.state.materials.map((val, idx) => {
                                    return (
                                        <Label key={idx} color='brown' size='large'>
                                            {val}
                                            <Icon name='delete' data-val={val} onClick={this.removeMaterial} />
                                        </Label>
                                    )
                                })
                            }
                        </Form.Field>
                        <Form.Input
                            label='做法'
                            name='step'
                            placeholder='該怎麼做呢'
                            icon={<Icon link color={'green'} name={'arrow right'} onClick={this.addSteps}></Icon>}
                        />
                        <Item.Group divided>
                            {
                                this.state.steps.map((val, idx) => {
                                    return (
                                        <Item key={idx}>
                                            <Item.Content>
                                                <Item.Header>{parseInt(idx) + 1}</Item.Header>
                                                <Item.Description>{val}</Item.Description>
                                            </Item.Content>
                                        </Item>
                                    )
                                })
                            }
                        </Item.Group>
                        <Transition visible={this.state.steps.length !== 0 ? true : false} animation='slide down' duration={500}>
                            <Button attached='bottom' onClick={this.removeSteps}>
                                <Icon name='close' size='large'></Icon>
                            </Button>
                        </Transition>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <CheckClose
                        toggleAddBoard={toggleAddBoard}
                        initState={this.initState} />
                    <Button
                        inverted
                        color='blue'
                        content='Save'
                        onClick={this.goSubmit}
                    />
                </Modal.Actions>
            </Modal >
        )
    }
}

class CheckClose extends PureComponent {
    state = {
        visible: false
    }

    ToggleOpen = () => {
        if (this.state.visible) {
            this.setState({ visible: false })
        } else {
            this.setState({ visible: true })
        }
    }

    close = () => {
        const { toggleAddBoard, initState } = this.props
        toggleAddBoard()
        initState()
    }

    render() {
        return (
            <Modal
                basic
                onOpen={this.ToggleOpen}
                onClose={this.ToggleOpen}
                open={this.state.visible}
                size='small'
                trigger={
                    <Button
                        inverted
                        color='red'
                        content='Cancel'
                    />
                }
            >
                <Header icon={<Icon name='exclamation' color='yellow'></Icon>} content='確定取消嗎?' />
                <Modal.Actions>
                    <Button
                        basic
                        inverted
                        icon='remove'
                        color='red'
                        content='No'
                        onClick={this.ToggleOpen}
                    >
                    </Button>
                    <Button
                        basic
                        inverted
                        icon='checkmark'
                        color='blue'
                        content='Yes'
                        onClick={this.close}
                    >
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}
