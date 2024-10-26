import fs from 'fs';
import STYLES from '../styles.config.mjs';

const cssFile = './src/styles/generated-styles.css';
const scssFile = './src/styles/_variables.scss';

// Function to recursively get keys and values from the JSON
const getKeysValues = (obj, parentKey = '') => {
  let keysValues = [];
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}-${key}` : key;
    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      keysValues = keysValues.concat(getKeysValues(obj[key], newKey));
    } else {
      keysValues.push({key: newKey, value: obj[key]});
    }
  }
  return keysValues;
};

// Get keys and values for variables
const variables = getKeysValues(STYLES.variables);

// Write SCSS variables to styles.scss
const scssContent = `/* Auto-generated SASS variables. Do not modify this file - modify styles.config.mjs */\n`;
const scssVariables = variables
  .map((variable) => {
    return `$${variable.key}: ${variable.value};`;
  })
  .join('\n');
fs.writeFileSync(scssFile, scssContent + scssVariables);

// Get keys and values for typography
const typography = Object.keys(STYLES.classNames.typography).map((key) => ({
  key,
  value: STYLES.classNames.typography[key],
}));

// Get keys and values for typography
const fontFamilies = Object.keys(STYLES.classNames.fontFamilies).map((key) => ({
  key,
  value: STYLES.classNames.fontFamilies[key],
}));

// Write CSS classnames to styles.css
const cssContent = `/* Auto-generated CSS classnames. Do not modify this file - modify styles.config.mjs */\n`;

let cssClasses = typography
  .map((typographyItem) => {
    const {key, value} = typographyItem;
    const cssProps = Object.entries(value)
      .map(([prop, val]) => `  ${prop}: ${val};`)
      .join('\n');
    return `.${key} {\n${cssProps}\n}`;
  })
  .join('\n\n');

cssClasses =
  cssClasses +
  '\n\n' +
  fontFamilies
    .map((fontFamilyItem) => {
      const {key, value} = fontFamilyItem;
      const cssProps = Object.entries(value)
        .map(([prop, val]) => `  ${prop}: ${val};`)
        .join('\n');
      return `.${key} {\n${cssProps}\n}`;
    })
    .join('\n\n');

fs.writeFileSync(cssFile, cssContent + cssClasses);

console.log('CSS and SCSS files have been generated in src/styles');
