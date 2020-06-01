import React from 'react'
import { TwitterPicker } from "react-color";
import MuiPhoneNumber from "material-ui-phone-number";
import LocationForm from "./CountryInput";
import { Grid, Box, Button, TextField } from "@material-ui/core";


export default function SideBarForm(props) {
    return (
        <form onSubmit={props.saveCardChanges} noValidate>
            <Box m={1} textAlign="left">
                <label>Card Color</label>
                <Box mt={1}>
                    <TwitterPicker
                        triangle="hide"
                        width="100%"
                        color={props.color}
                        onChangeComplete={color => props.changeCardColor(color)}
                    />
                </Box>
            </Box>
            <Box m={1}>
                <TextField
                    onChange={props.changeFieldValue}
                    name="occupation"
                    fullWidth
                    label="Job Title"
                    margin="normal"
                    id="textFieldOccupation"
                    required
                    value={props.occupation}
                />
                <LocationForm value={props.country} countryfromChild={props.countryfromChild} />

                <MuiPhoneNumber
                    margin="normal"
                    fullWidth
                    label="Phone Number"
                    defaultCountry={"se"}
                    value={props.phoneNumber}
                    onChange={props.handlePhoneChange}
                />

                <TextField
                    label="Description"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    multiline
                    rowsMax="3"
                    id="textFieldDesc"
                    name="comment"
                    value={props.comment}
                    onChange={props.changeFieldValue}
                    margin="normal"
                />
            </Box>
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

            </Box>
            <Grid container>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" style={{ marginTop: 22, backgroundColor: "#282c34", color: "white" }} fullWidth >Save Changes</Button>

                </Grid>
            </Grid>
        </form>
    )
}
