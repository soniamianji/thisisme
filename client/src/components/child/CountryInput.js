import React, { Fragment, useState } from "react";
import TextField from "@material-ui/core/TextField";
import PlacesAutocomplete from "react-places-autocomplete";

function LocationForm(props) {
    const [address, setAdress] = useState();
    const handleChange = address => {
        setAdress(address);
    };

    const handleSelect = address => {
        setAdress(address);
        props.countryfromChild(address)
    };


    return (
        <Fragment>
            <div className="profile__userInfo">

                <PlacesAutocomplete
                    value={address ? address : props.value}
                    onChange={handleChange}
                    onSelect={handleSelect}
                >
                    {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading
                    }) => (
                            <div>
                                <TextField
                                    label="Location"
                                    id="location"
                                    fullWidth
                                    {...getInputProps({
                                        placeholder: "Search Your Location ...",
                                        className: "location-search-input"
                                    })}
                                />

                                <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                        const className = suggestion.active
                                            ? "suggestion-item--active"
                                            : "suggestion-item";
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                            ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                            : { backgroundColor: 'rgb(66, 66, 66)', cursor: 'pointer' };
                                        return (
                                            <div
                                                {...getSuggestionItemProps(suggestion, {
                                                    className,
                                                    style,
                                                })}
                                            >
                                                <span>{suggestion.description}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                </PlacesAutocomplete>
            </div>
        </Fragment >
    );
}


export default LocationForm;
