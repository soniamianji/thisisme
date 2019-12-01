import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { arbetsBaseUrl } from "../../constantNames/api"
import {
    Grid,
    Box,
    Paper,
    Typography,
    Button
} from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
import ReactTimeAgo from 'react-time-ago';



const styles = theme => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
        [theme.breakpoints.up('md')]: {
            width: "80%",
            margin: "11px auto"
        },
        [theme.breakpoints.up('lg')]: {
            width: "80%",
            margin: "11px auto"
        },
    },
    gridStyle: {
        [theme.breakpoints.up('sm')]: {
            textAlign: "right",

        },
        [theme.breakpoints.up('lg')]: {
            textAlign: "right",
            "& Button": {
                width: "50% !important"
            }

        },

    },
    avatar: {
        width: "100px", height: "40px", borderRadius: "0",
        "& img.MuiAvatar-img": {
            objectFit: "contain"
        }
    }

});
class SingleJobAF extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: '',
            application_details: "",
            employer: "",
            employment_type: "",
            must_have: "",
            nice_to_have: "",
            occupation: "",
            salary_type: "",
            workplace_address: "",
            description: "",
            words: ""
        }
    }
    componentWillMount() {
        const jobId = this.props.match.params.id;
        fetch(arbetsBaseUrl + "/ad/" + jobId, {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "api-key": "c29uaWFtaWFuamkxQGdtYWlsLmNvbQ"
            }
        }).then(res => res.json()).then(job => this.setState({
            job: job,
            application_details: job.application_details,
            employer: job.employer,
            employment_type: job.employment_type,
            must_have: job.must_have,
            nice_to_have: job.nice_to_have,
            occupation: job.occupation,
            salary_type: job.salary_type,
            workplace_address: job.workplace_address,
            description: job.description,
            working_hours_type: job.working_hours_type,
            words: job.description.text.split(" ").length

        }))

        console.log(this.state.job)
    }

    applyHere = () => {
        window.open(this.state.application_details.url ? this.state.application_details.url : this.state.employer.url
            , "_blank")
    }

    componentDidUpdate() {
        if (this.state.job !== "") {
            if (this.state.words > 280) {
                let oldText = this.state.description.text.split(" ");
                let newText = oldText.splice(150);
                console.log("newText" + newText);
                console.log("oldText" + oldText)
            }
        }
    }

    render() {
        const StyledPaper = styled(Paper)`
        color: white;
        padding: 11px;
        width: 80%;
        margin: 44px auto;
      `;

        const StyledButton = styled(Button)`
        color: white;
        backgroundColor: black
        `;
        const { classes } = this.props;

        return (
            <Box>
                <StyledPaper>
                    <Grid container style={{ padding: "22px" }} >
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="h1" style={{ margin: "0 0 0 22px" }}>
                                <span >{this.state.job.headline}</span>
                            </Typography>
                            <Typography variant="h3" style={{ margin: "0 0 0 22px" }}>
                                <span >{this.state.employer.name}</span>
                            </Typography>
                        </Grid>
                        {
                            //dates and logo
                        }
                        <Grid item xs={12} sm={6} md={6} >
                            <Typography className={classes.gridStyle} variant="h3" style={{ margin: "22px 11px 0 22px" }}>
                                <span > <strong>Apply latest:{moment(this.state.job.application_deadline).format('LL')}</strong></span>
                                <Typography variant="h3" style={{ marginTop: "11px" }}>
                                    <span> Type of employment: {this.state.employment_type.label}</span>
                                </Typography>
                            </Typography>
                            <avatar id="img"
                                className={classes.avatar} src={this.state.job.logo_url}>
                            </avatar>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} >

                            <Typography variant="h2" style={{ marginTop: "22px", marginLeft: "22px", color: "black" }}>
                                <span> <strong>Location</strong></span>
                            </Typography>

                            <Typography variant="h2" style={{ marginLeft: "22px", marginTop: "11px" }}>
                                <span> {this.state.workplace_address.municipality} {this.state.workplace_address.country}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className={classes.gridStyle}>
                            <Button onClick={this.applyHere} variant="contained" block style={{
                                color: "white",
                                backgroundColor: "#282c34",
                                marginTop: "22px",
                                width: "100%"
                            }}>Apply here</Button>
                        </Grid>

                        <Grid container style={{ padding: "22px" }}>
                            <Grid item xs={12} >
                                {<p style={{ lineHeight: "1.5rem" }}>{this.state.description.text}</p>}
                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography variant="h3" style={{ marginTop: "22px " }}>
                                    Employers Information
                                </Typography>
                                <p >{this.state.employer.phone_number}</p>
                                <p >{this.state.employer.email}</p>
                                <p>{this.state.employer.url}</p>
                                <p >{this.state.employer.other}</p>

                            </Grid>
                            <Grid item className={classes.gridStyle} xs={12} md={6} >
                                <Typography variant="h3" style={{ marginTop: "22px " }} >
                                    Workplace address
                                </Typography>
                                <p style={{ marginTop: "11px" }}>{this.state.workplace_address.municipality} {this.state.workplace_address.country}</p>

                            </Grid>
                            <Grid item xs={12} md={6}>

                                <Typography variant="h3" style={{ marginTop: "22px" }}>
                                    <a href={this.state.job.webpage_url} style={{ color: "black" }}>Check out the the ad on Arbetsförmedlingen</a>
                                </Typography>
                                <Typography variant="h4" style={{ marginTop: "22px" }}>
                                    <span>Ad published <strong>{moment(this.state.job.publication_date).startOf('day').fromNow()}</strong></span>
                                </Typography>
                            </Grid>

                        </Grid>


                    </Grid>
                </StyledPaper >
            </Box >
        )
    }
}

SingleJobAF.propTypes = {
    jobsFromAF: PropTypes.array,
};
const mapStateToProps = state => ({
    jobsFromAF: state.jobsFromAF.hits
});
export default connect(mapStateToProps, null)(withStyles(styles)(SingleJobAF));