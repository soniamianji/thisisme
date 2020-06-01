import React, { Component } from 'react'
import { Button, Box, Paper, TextField } from "@material-ui/core";
import { fetchUserCard } from "../../actions/authActions";
import { JobSearchResults } from "../../actions/searchActions"
import { updateCard } from "../../SDK/userCards";
import { connect } from "react-redux";
import { TwitterPicker } from "react-color";
import MuiPhoneNumber from "material-ui-phone-number";
import LocationForm from "../child/CountryInput";
import LinksForm from "../child/LinksForm";
import { withRouter } from "react-router";


class IntroForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            occupation: "",
            country: "",
            phoneNumber: "",
            _errors: {},
            github: "",
            facebook: "",
            linkedin: "",
            youtube: "",
            instagram: "",
            behance: "",
            twitter: "",
            portfolioSite: "",
            displayLinkForm: false
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.account.isNewUser !== prevProps.account.isNewUser) {
            if (!this.props.account.isNewUser) {
                this.props.history.push("/profile");
            }
        }
    }
    changeFieldValue = (e) => {
        const input = e.target;
        const isValid = input.checkValidity()
        this.setState({ [input.name]: input.value });
        if (!isValid) {
            this.setState(prevState => ({
                _errors: {
                    ...prevState._errors,
                    [input.name]: input.validationMessage
                }
            }))
        } if (isValid) {
            this.setState(prevState => ({
                _errors: {
                    ...prevState._errors,
                    [input.name]: ""
                }
            }))
        }
    };


    saveCardChanges = (e) => {
        e.preventDefault();
        const form = e.target
        const isValid = form.checkValidity();
        const formData = new FormData(form)
        const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
            acc[key] = form.elements[key].validationMessage
            return acc
        }, {})
        this.setState({
            _errors: validationMessages
        })
        if (isValid) {
            const data = {
                name: this.state.name,
                email: this.state.email,
                country: this.state.country,
                phoneNumber: this.state.phoneNumber,
                comment: this.state.comment,
                occupation: this.state.occupation,
                links: {
                    github: this.state.github,
                    facebook: this.state.facebook,
                    linkedin: this.state.linkedin,
                    youtube: this.state.youtube,
                    twitter: this.state.twitter,
                    instagram: this.state.instagram,
                    behance: this.state.behance,
                    portfolioSite: this.state.portfolioSite
                },

            };
            const accountId = this.props.account.id;
            console.log(accountId)

            //call action to update card
            updateCard(accountId, data, err => {
                if (err.length === 0) {
                    console.log("yay")
                    // this.props.fetchUserCard(accountId);
                    this.setState({
                        displayLinkForm: true,
                    })

                } else {
                    console.log(err);
                }
            });
        }
    };
    handlePhoneChange = (value) => {
        if (value) {
            this.setState({
                phoneNumber: value
            })
        }
    };
    countryfromChild = (value) => {
        this.setState(prevState => ({
            ...prevState,
            country: value
        }))
    };

    //change card color
    changeCardColor = color => {
        this.setState(prevState => ({
            ...prevState,
            color: color.hex,
        }));
        const accountId = this.props.account.id;
        console.log(accountId)
        const colorData = { color: this.state.color }
        //call action to update card with the color change
        updateCard(accountId, colorData, err => {
            if (err.length === 0) {
                this.props.fetchUserCard(accountId);
            } else {
                console.log(err);
            }
        });
    };


    //submit links
    submitLinksHandler = (e) => {
        e.preventDefault();
        const form = e.target
        const isValid = form.checkValidity();
        const formData = new FormData(form)
        const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
            acc[key] = form.elements[key].validationMessage
            return acc
        }, {})
        this.setState({
            _errors: validationMessages
        })
        if (isValid) {
            const data = {
                links: {
                    github: this.state.github,
                    facebook: this.state.facebook,
                    linkedin: this.state.linkedin,
                    youtube: this.state.youtube,
                    twitter: this.state.twitter,
                    instagram: this.state.instagram,
                    behance: this.state.behance,
                    portfolioSite: this.state.portfolioSite
                },
                isNewUser: false,
            };
            const accountId = this.props.account.id;

            //call action to update card
            updateCard(accountId, data, err => {
                if (err.length === 0) {
                    console.log("yay")
                    this.props.fetchUserCard(accountId);
                    this.props.history.push("/profile")
                } else {
                    console.log(err);
                }
            });
        }
    }
    skipHandler = () => {
        const accountId = this.props.account.id;
        updateCard(accountId, { isNewUser: false }, err => {
            if (err.length === 0) {
                this.props.fetchUserCard(accountId);
                this.props.history.push("/profile");
            } else {
                console.log(err);
                this.props.history.push("/profile");
            }
        });

    }
    render() {
        return (
            <div style={{ display: "flex" }}>
                <Box style={{ width: "600px", padding: "1rem", margin: "auto" }} mx="auto" mt="44px">
                    <Paper style={{ padding: "38px" }}>
                        <Box style={{ paddingTop: 22 }}>
                            {!this.state.displayLinkForm ? <form onSubmit={this.saveCardChanges} noValidate>
                                <Box m={1} textAlign="left">
                                    <label>Card Color</label>
                                    <Box mt={1}>
                                        <TwitterPicker
                                            triangle="hide"
                                            width="100%"
                                            color={this.state.color}
                                            onChangeComplete={color => this.changeCardColor(color)}
                                        />
                                    </Box>
                                </Box>
                                <Box m={1}>
                                    <TextField
                                        onChange={this.changeFieldValue}
                                        name="occupation"
                                        fullWidth
                                        label="Job Title"
                                        margin="normal"
                                        id="textFieldOccupation"
                                        required
                                        value={this.state.occupation}
                                    />
                                    <LocationForm value={this.state.country} countryfromChild={this.countryfromChild} />

                                    <MuiPhoneNumber
                                        margin="normal"
                                        fullWidth
                                        label="Phone Number"
                                        defaultCountry={"se"}
                                        value={this.state.phoneNumber}
                                        onChange={this.handlePhoneChange}
                                    />

                                    <TextField
                                        label="Description"
                                        InputLabelProps={{ shrink: true }}
                                        fullWidth
                                        multiline
                                        rowsMax="3"
                                        id="textFieldDesc"
                                        name="comment"
                                        value={this.state.comment}
                                        onChange={this.changeFieldValue}
                                        margin="normal"
                                    />
                                </Box>

                                <Button type="submit" variant="contained" style={{ marginTop: 22, backgroundColor: "#282c34", color: "white", marginRight: "1rem" }}> Save</Button>
                                <Button onClick={() => { this.setState({ displayLinkForm: true }) }} variant="contained" style={{ marginTop: 22, backgroundColor: "#282c34", color: "white" }}> Skip for now!</Button>

                            </form> :
                                <LinksForm
                                    saveCardChanges={this.submitLinksHandler}
                                    github={this.state.github}
                                    _errors={this.state._errors}
                                    linkedin={this.state.linkedin}
                                    behance={this.state.behance}
                                    facebook={this.state.facebook}
                                    youtube={this.state.youtube}
                                    twitter={this.state.twitter}
                                    instagram={this.state.instagram}
                                    changeFieldValue={this.changeFieldValue}
                                    skipHandler={this.skipHandler}
                                />
                            }

                        </Box>
                    </Paper>
                </Box>
            </div >
        )
    }
}
const mapStateToProps = state => ({
    account: state.account,
});
export default connect(mapStateToProps, { fetchUserCard, JobSearchResults })(withRouter(IntroForm));