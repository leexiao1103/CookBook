import React, { Component } from 'react'
import { Item } from 'semantic-ui-react'

export default class StepItem extends Component {

    render() {
        return this.props.steps ?
            <Item.Group divided>
                {
                    this.props.steps.map((val, idx) => {
                        return (
                            <Item key={idx}>
                                <Item.Content>
                                    <Item.Header>{idx + 1}</Item.Header>
                                    <Item.Description>{val}</Item.Description>
                                </Item.Content>
                            </Item>
                        )
                    })
                }
            </Item.Group>
            : null
    }
}
