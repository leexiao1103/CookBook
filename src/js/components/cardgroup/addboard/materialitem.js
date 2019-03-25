import React, { Component } from 'react'
import { Grid, List } from 'semantic-ui-react'

export default class MaterialItem extends Component {
    static defaultProps = {
        materials: []
    }

    render() {
        const { materials } = this.props
        const leftResult = materials.filter((elem, idx) => (idx % 2 === 0)) 
        const rightResult = materials.filter((elem, idx) => (idx % 2 !== 0))

        return materials ?
            <Grid columns={2} divided>
                <Grid.Row>
                    <Grid.Column>
                        <List bulleted divided verticalAlign='middle'>
                            {
                                leftResult.map((elem, idx) => (
                                    <List.Item key={idx}>
                                        <List.Content>
                                            {elem}
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Grid.Column>
                    <Grid.Column>
                        <List bulleted divided verticalAlign='middle'>
                            {
                                rightResult.map((elem, idx) => (
                                    <List.Item key={idx}>
                                        <List.Content>
                                            {elem}
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                        </List>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            : null
    }
}