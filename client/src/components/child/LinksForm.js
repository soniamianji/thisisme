import React from 'react';
import { Button, Box, TextField } from "@material-ui/core";
import { withRouter } from "react-router";


function LinksForm(props) {

    return (
        <form onSubmit={props.saveCardChanges}>
            <Box m={1}>
                <h3>Links</h3>
                <TextField
                    onChange={props.changeFieldValue}
                    name="github"
                    fullWidth
                    id="githubLink"
                    label="Github"
                    margin="normal"
                    value={props.github}
                    placeholder="https://github.com/"
                    inputProps={{ pattern: "https://github.com/.*" }}
                    error={Boolean(props._errors.github && props._errors.github !== "")}
                    helperText={props._errors.github === "" ? "" : props._errors.github}

                />
                <TextField
                    fullWidth
                    onChange={props.changeFieldValue}
                    name="linkedin"
                    id="linkedinLink"
                    label="LinkedIn"
                    margin="normal"
                    value={props.linkedin}
                    placeholder="https://linkedin.com/"
                    inputProps={{ pattern: "https://linkedin.com/.*", }}
                    error={Boolean(props._errors.linkedin && props._errors.linkedin !== "")}
                    helperText={props._errors.linkedin === "" ? "" : props._errors.linkedin}
                />
                <TextField
                    fullWidth
                    onChange={props.changeFieldValue}
                    name="behance"
                    id="behanceLink"
                    label="Behance"
                    margin="normal"
                    value={props.behance}
                    placeholder="https://behance.com/"
                    inputProps={{ pattern: "https://behance.com/.*" }}
                    error={Boolean(props._errors.behance && props._errors.behance !== "")}
                    helperText={props._errors.behance === "" ? "" : props._errors.behance}

                />
                <TextField
                    fullWidth
                    onChange={props.changeFieldValue}
                    name="facebook"
                    id="facebookLink"
                    label="Facebook"
                    margin="normal"
                    value={props.facebook}
                    placeholder="https://facebook.com/"
                    inputProps={{ pattern: "https://facebook.com.*" }}
                    error={Boolean(props._errors.facebook && props._errors.facebook !== "")}
                    helperText={props._errors.facebook === "" ? "" : props._errors.facebook}
                />
                <TextField
                    fullWidth
                    onChange={props.changeFieldValue}
                    id="youtubeLink"
                    label="Youtube"
                    margin="normal"
                    name="youtube"
                    value={props.youtube}
                    placeholder="https://youtube.com/"
                    inputProps={{ pattern: "https://youtube.com.*" }}
                    error={Boolean(props._errors.youtube && props._errors.youtube !== "")}
                    helperText={props._errors.youtube === "" ? "" : props._errors.youtube}
                />
                <TextField
                    fullWidth
                    onChange={props.changeFieldValue}
                    name="twitter"
                    id="addLinkTextField"
                    label="Twitter"
                    margin="normal"
                    value={props.twitter}
                    placeholder="https://twitter.com/"
                    inputProps={{ pattern: "https://twitter.com.*" }}
                    error={Boolean(props._errors.twitter && props._errors.twitter !== "")}
                    helperText={props._errors.twitter === "" ? "" : props._errors.twitter}
                />
                <TextField
                    fullWidth
                    onChange={props.changeFieldValue}
                    name="instagram"
                    id="instagramLink"
                    label="Instagram"
                    margin="normal"
                    value={props.instagram}
                    placeholder="https://instagram.com/"
                    inputProps={{ pattern: "https://instagram.com.*" }}
                    error={Boolean(props._errors.instagram && props._errors.instagram !== "")}
                    helperText={props._errors.instagram === "" ? "" : props._errors.instagram}
                />
                <TextField
                    fullWidth
                    name="portfolioSite"
                    onChange={props.changeFieldValue}
                    id="websiteLink"
                    label="Website"
                    margin="normal"
                    value={props.portfolioSite}
                    placeholder="https://example.com/"
                    inputProps={{ pattern: "https://.*" }}
                    error={Boolean(props.portfolioSite && props._errors.portfolioSite !== "")}
                    helperText={props._errors.portfolioSite === "" ? "" : props._errors.portfolioSite}
                />
                <Button type="submit" variant="contained" style={{ marginTop: 22, backgroundColor: "#282c34", color: "white", marginRight: "1rem" }}> Save</Button>
                <Button onClick={props.skipHandler} variant="contained" style={{ marginTop: 22, backgroundColor: "#282c34", color: "white" }}> Skip for now!</Button>

            </Box>
        </form>
    )
}

export default withRouter(LinksForm);