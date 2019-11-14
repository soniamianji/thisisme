import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";

const countries = [
  {
    country: "Sweden"
  },
  {
    country: "Germany"
  },
  {
    country: "France"
  }
];

const UserCard = props => {
  const useStyles = makeStyles({
    TextField: {}
  });
};

const SearchResult = () => (
  <div>
    <h1>SearchResult</h1>
    <div style={{ width: "80%", marginRight: "auto", marginLeft: "auto" }}>
      <form>
        <TextField
          id="standard-basic"
          label="Standard"
          margin="normal"
          fullWidth
        />
        <TextField
          id="standard-select-location"
          select
          label="Select"
          helperText="Please select your location"
          margin="normal"
        >
          {countries.map(country => (
            <MenuItem key={country.value}>{country.label}</MenuItem>
          ))}
        </TextField>
      </form>
    </div>
  </div>
);

export default SearchResult;
