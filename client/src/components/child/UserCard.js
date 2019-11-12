import React, { Component } from 'react'
import Card from '@material-ui/core/Card'

export default class UserCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <div className="imagePlaceholder">
                        <img src="https://via.placeholder.com/200" />
                    </div>
                    <div className="cardInfo">
                        <div className="basicInfo">
                            <h1>Felix Rossel</h1>
                            <h2>UX Designer & Front End Developer</h2>
                        </div>
                        <div className="contactInfo">
                            <h3>hello@felixrossel.com</h3>
                            <h3>+49 151 107 68 106</h3>
                        </div>
                        <div className="locationInfo">Jönköping, Sweden</div>
                    </div>
                    <div className="links">
                        <img src="https://via.placeholder.com/50" />
                        <img src="https://via.placeholder.com/50" />
                        <img src="https://via.placeholder.com/50" />
                    </div>
                </Card>
            </div>
        )
    }
}
