import React from 'react';
import { withJsonFormsControlProps } from '@jsonforms/react';
import { Autocomplete, TextField, Checkbox, FormControlLabel, FormGroup } from '@mui/material';

// Liste simplifiée des pays
const countries = [
  "Belgique", "France", "Allemagne", "Italie", "Espagne", 
  "Afrique du Sud", "Nigeria", "Kenya", "Egypte", "Maroc"
];

// Définition des continents et des pays associés
const continents = {
  Europe: ["Belgique", "France", "Allemagne", "Italie", "Espagne"],
  Afrique: ["Afrique du Sud", "Nigeria", "Kenya", "Egypte", "Maroc"]
};

const CountrySelector = ({ data, handleChange, path }) => {
  const [selectedCountries, setSelectedCountries] = React.useState(data || []);

  const handleCountryChange = (event, value) => {
    setSelectedCountries(value);
    handleChange(path, value);
  };

  const handleContinentChange = (continent) => {
    const newCountries = [...selectedCountries, ...continents[continent]];
    setSelectedCountries(newCountries);
    handleChange(path, newCountries);
  };

  const handleContinentDeselect = (continent) => {
    const newCountries = selectedCountries.filter(country => !continents[continent].includes(country));
    setSelectedCountries(newCountries);
    handleChange(path, newCountries);
  };

  return (
    <div>
      <Autocomplete
        multiple
        options={countries}
        value={selectedCountries}
        onChange={handleCountryChange}
        renderInput={(params) => <TextField {...params} label="Pays visités" />}
      />
      <FormGroup>
        {Object.keys(continents).map(continent => (
          <FormControlLabel
            key={continent}
            control={
              <Checkbox
                onChange={(e) => e.target.checked ? handleContinentChange(continent) : handleContinentDeselect(continent)}
              />
            }
            label={continent}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default withJsonFormsControlProps(CountrySelector);
