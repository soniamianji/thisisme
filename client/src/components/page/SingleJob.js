import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Box, Paper, Typography, Button } from "@material-ui/core";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import moment from 'moment';
import { jobSearchById } from "../../SDK/jobSearch"


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
        width: "100px", height: "100px", borderRadius: "0",
        "& img.MuiAvatar-img": {
            objectFit: "contain"
        }
    }

});
class SingleJob extends Component {
    constructor(props) {
        super(props);

        this.state = {
            job: "",
            id: "",
            title: "",
            employer: "",
            applicationDeadline: "",
            publicationDate: "",
            description: "",
            application_details: "",
            working_hours_type: "",
            city: "",
            country: "",
            employment_Type: "",
            webpage_url: "",
            company_Logo: "",
            source: "",
            source_url: "",
            apply_here: ""

        }
    }
    componentWillMount() {
        const jobId = this.props.match.params.id;
        const source = this.props.match.params.source;
        console.log(jobId, source);
        jobSearchById(jobId, source, (err, fetchedJob) => {
            console.log(fetchedJob);
            if (err.length === 0) {
                fetchedJob.then(fetchedJob => {
                    this.setState({
                        job: fetchedJob
                    })
                })
            }
        })
    }

    applyHere = () => {
        if (this.state.job.webpage_url || this.state.job.apply_here) {
            window.open(this.state.job.webpage_url ? this.state.job.webpage_url : this.state.job.apply_here
                , "_blank")
        }

    }


    render() {
        const StyledPaper = styled(Paper)`
        color: white;
        padding: 11px;
        width: 80%;
        margin: 44px auto;
      `;

        const { classes } = this.props;
        return (
            <Box>
                <StyledPaper>
                    <Grid container style={{ padding: "22px" }} >
                        <Grid item xs={12} sm={6} md={6}>
                            <Typography variant="h1" style={{ margin: "0 0 0 22px" }}>
                                <span >{this.state.job.title}</span>
                            </Typography>
                            <Typography variant="h3" style={{ margin: "0 0 0 22px" }}>
                                <span >{this.state.job.employer}</span>
                            </Typography>
                        </Grid>
                        {
                            //dates and logo
                        }
                        <Grid item xs={12} sm={6} md={6} >
                            <Typography className={classes.gridStyle} variant="h3" style={{ margin: "22px 11px 0 22px" }}>
                                {this.state.job.applicationDeadline === "" ? <span>Ad published <strong>{moment(this.state.job.publication_date).startOf('day').fromNow()}</strong></span> :
                                    <span > <strong>Apply latest:{moment(this.state.job.applicationDeadline).format('LL')}</strong></span>}
                                <Typography variant="h3" style={{ marginTop: "11px" }}>
                                    <span> Type of employment: {this.state.job.employment_Type}</span>
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
                                <span> {this.state.job.city} {this.state.job.country}</span>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} className={classes.gridStyle}>
                            {this.state.job.webpage_url !== "" ? <Button onClick={this.applyHere} variant="contained" block style={{
                                color: "white",
                                backgroundColor: "#282c34",
                                marginTop: "22px",
                                width: "100%"
                            }}>Apply here</Button> : ""}
                        </Grid>

                        <Grid container style={{ padding: "22px" }}>
                            <Grid item xs={12} >
                                {this.state.source === "github" ? <div dangerouslySetInnerHTML={{ __html: this.state.job.description }} /> : <article style={{
                                    whiteSpace: "pre-line",
                                    wordWrap: "break-word"
                                }}>{this.state.job.description}</article>}

                            </Grid>
                            <Grid item xs={12} md={6} >
                                <Typography variant="h3" style={{ marginTop: "22px " }}>
                                    Employers Information
                                </Typography>
                                <p>{this.state.job.employer}</p>
                                <img className={classes.avatar} src={this.state.job.company_Logo} alt="companyLogo"></img>

                            </Grid>
                            <Grid item className={classes.gridStyle} xs={12} md={6} >
                                <Typography variant="h3" style={{ marginTop: "22px " }} >
                                    Workplace address
                                </Typography>
                                <p style={{ marginTop: "11px" }}>{this.state.job.city} {this.state.job.country}</p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Typography variant="h3" style={{ marginTop: "22px" }}>
                                    <a href={this.state.job.source_url} style={{ color: "black" }}>Check out the the ad on {this.state.job.source}</a>
                                </Typography>
                                <Typography variant="h4" style={{ marginTop: "22px" }}>
                                    <span>Ad published <strong>{moment(this.state.job.publication_date).startOf('day').fromNow()}</strong></span>
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </StyledPaper>

            </Box>
        )
    }
}

SingleJob.propTypes = {
    jobs: PropTypes.array,
};
const mapStateToProps = state => ({
    jobs: state.jobs.data
});
export default connect(mapStateToProps, null)(withStyles(styles)(SingleJob));