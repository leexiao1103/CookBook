import React, { Component } from 'react'
import { Button, Icon, Modal, Form, Header, Label, Item, Transition, Segment, Image } from 'semantic-ui-react'
import { withFirebase } from '../../firebase'
import { withCardGroup } from '../'
import CheckClose from '../../../checkclose'

const INIT_STATE = {
    img: '',
    name: '',
    spec: '',
    materials: [],
    steps: [],
}

class AddBoard extends Component {
    constructor(props) {
        super(props)
        this.isEdit = false
        if (this.props.selectCard.card && this.props.selectCard.id) {
            const { id, card } = this.props.selectCard
            this.isEdit = true
            this.selectID = id
            this.state = {
                img: card.Img,
                name: card.Name,
                spec: card.Spec,
                materials: card.Materials,
                steps: card.Steps
            }
        } else {
            this.state = INIT_STATE
        }
    }

    componentWillUnmount() {
        this.setState(() => ({ ...INIT_STATE }))
    }

    addMaterial = () => {
        const material = document.getElementById('foodform').material
        if (material.value) {
            this.setState(state => ({ materials: [...state.materials, material.value] }), () => material.value = '')
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

        if (step.value) {
            this.setState(state => ({ steps: [...state.steps, step.value] }), () => step.value = '')
        }
    }

    removeSteps = () => this.setState(state => {
        state.steps.pop()
        return { steps: state.steps }
    })


    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    uploadImg = event => {
        const { files } = event.target
        if (files && files[0]) {
            const reader = new FileReader()
            reader.onload = e => this.setState(() => ({ img: e.target.result }))
            reader.readAsDataURL(files[0])
        }
    }

    clearImg = () => {
        const fileInput = document.getElementById('upload_img')
        fileInput.type = ''
        fileInput.type = 'file'
        this.setState(() => ({ img: '' }))
    }

    goSubmit = () => {
        const { img, name, spec, materials, steps } = this.state
        const { toggleAddBoard, firebase, selectCard } = this.props
        const uid = firebase.getCurrentUser().uid
        const data = {
            Date: new Date().toLocaleDateString(),
            Img: img,
            Name: name,
            Spec: spec,
            Materials: materials,
            Steps: steps,
        }
        this.isEdit ? firebase.updateData(`users/${uid}/food/${selectCard.id}`, data) : firebase.pushData(`users/${uid}/food`, data)
        toggleAddBoard()
    }

    render() {
        const { toggleAddBoard } = this.props
        const { img, name, spec, materials, steps } = this.state
        const isInvalid =
            img === '' ||
            name === '' ||
            spec === '' ||
            materials.length === 0 || steps.length === 0

        return (
            <Transition animation={'fly left'} duration={800} transitionOnMount={true}>
                <Modal open={true}>
                    <Modal.Header>{this.isEdit ? `修改` : `新想法`}</Modal.Header>
                    <Modal.Content scrolling>
                        <Form id='foodform' size='big'>
                            <input
                                id='upload_img'
                                type='file'
                                accept='image/jpeg,image/png'
                                onChange={this.uploadImg}
                                style={{ display: 'none' }}
                            />
                            {img ?
                                <Segment basic textAlign='center' >
                                    <Image
                                        bordered
                                        rounded
                                        centered
                                        size='large'
                                        src={img}
                                    />
                                    <Button.Group size='medium'>
                                        <Button compact icon='x' onClick={this.clearImg} />
                                        <Button compact icon='redo alternate' as='label' htmlFor='upload_img' />
                                    </Button.Group>
                                </Segment>
                                :
                                <Segment secondary textAlign='center' padded='very'>
                                    <Header icon='upload' size='large' />
                                    <Button as='label' color='green' size='medium' htmlFor='upload_img' content='上傳圖片' />
                                </Segment>
                            }
                            <Form.Group widths='equal'>
                                <Form.Input
                                    name='name'
                                    label='名字'
                                    placeholder='取個名字吧'
                                    value={name}
                                    onChange={this.handleChange}
                                />
                                <Form.Input
                                    name='spec'
                                    label='類別'
                                    placeholder='是甚麼料理呢'
                                    value={spec}
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
                                    materials.map((val, idx) =>
                                        (
                                            <Label key={idx} color='brown' size='large'>
                                                {val}
                                                <Icon name='delete' data-val={val} onClick={this.removeMaterial} />
                                            </Label>
                                        ))
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
                                    steps.map((val, idx) => (
                                        <Item key={idx}>
                                            <Item.Content>
                                                <Item.Header>{parseInt(idx) + 1}</Item.Header>
                                                <Item.Description>{val}</Item.Description>
                                            </Item.Content>
                                        </Item>
                                    ))
                                }
                            </Item.Group>
                            {steps.length !== 0 ?
                                <Button attached='bottom' onClick={this.removeSteps}>
                                    <Icon name='close' size='large'></Icon>
                                </Button>
                                : null
                            }
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <CheckClose toggleFunc={toggleAddBoard} />
                        <Button
                            disabled={isInvalid ? true : false}
                            inverted
                            color='blue'
                            content='Save'
                            onClick={this.goSubmit}
                        />
                    </Modal.Actions>
                </Modal >
            </Transition>
        )
    }
}

export default withFirebase((withCardGroup(AddBoard)))

