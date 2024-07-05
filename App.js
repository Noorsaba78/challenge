import React from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import CountrySelector from './CountrySelector';

// Définition du schéma JSON pour le formulaire
const schema = {
  type: "object",
  properties: {
    name: { type: "string", title: "Nom" },
    visitedCountries: {
      type: "array",
      title: "Pays visités",
      items: { type: "string" }
    }
  }
};

// Définition du schéma UI pour le formulaire
const uischema = {
  type: "VerticalLayout",
  elements: [
    { type: "Control", scope: "#/properties/name" },
    { type: "Control", scope: "#/properties/visitedCountries", options: { render: "countrySelector" } }
  ]
};

// Données initiales pour le formulaire
const data = {};

// Ajout des rendus personnalisés aux rendus par défaut de Material
const renderers = [
  ...materialRenderers,
  { tester: () => 3, renderer: CountrySelector }
];

// Composant principal de l'application
const App = () => {
  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
      />
    </div>
  );
};

export default App;
