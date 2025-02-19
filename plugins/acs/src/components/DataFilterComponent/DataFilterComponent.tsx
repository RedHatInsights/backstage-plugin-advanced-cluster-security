import React, { useEffect, useState } from 'react';
import { EntitySelectComponent} from './EntitySelectComponent';
import { AttributeSelectComponent } from './AttributeSelectComponent';
import { InputFieldComponent } from './InputFieldComponent';
import { CheckboxSelectComponent } from './CheckboxSelectComponent';
import { Toolbar, ToolbarGroup, ToolbarItem, ToolbarContent } from '@patternfly/react-core';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    dropDowns: {
      minWidth: 150,
      maxWidth: 300,
      marginBottom: 20,
    },
    dropDownsMulti: {
      marginLeft: theme.spacing(5),
      minWidth: 150,
      maxWidth: 300,
    },
    textBox: {
      minWidth: 350,
      maxWidth: 400,
    },
  }),
);

export const DataFilterComponent = ({ setFilters, data }) => {
    const classes = useStyles();
    const attributes = ['Name', 'Discovered time', 'CVSS'];
    const entities = {
        'Image': [ 'Name'],
        'CVE': ['Name', 'Discovered time', 'CVSS'],
        'Image Component': ['Name'],
        'Deployment': ['Name'],
        'Namespace': ['Name'],
        'Cluster': ['Name']
    };

    const cveSeverityOptions = ['Critical', 'Important', 'Moderate', 'Low'];
    const cveStatusOptions = ['Fixable', 'Not fixable'];

    const theme = useTheme();
    const isDarkMode = theme.palette.type === 'dark';

    const [selectedEntity, setSelectedEntity] = useState("Image");
    const [selectedAttribute, setSelectedAttribute] = useState("Name");

    const [userText, setUserText] = useState("");
    const [selectedCveSeverityOptions, setSelectedCveSeverityOptions] = useState([]);
    const [selectedCveStatusOptions, setSelectedCveStatusOptions] = useState([]);

    const getSelectedAttributes = () => {
        return entities[selectedEntity]
    };

    const modifyPFCardStyle = () => {
    const style = document.createElement('style');
    style.id = 'filter-group-styles';
    style.innerHTML = `
      [class*="pf-v5-c-toolbar"] {
        background-color: var(--p--pf-v5-global--palette--black-500) !important;
      }
    `;    // Append the style element to the document head
    document.head.appendChild(style);
  };

  const removeCustomStyles = () => {
    const style = document.getElementById('ai-search-styles');
    if (style) {
      style.remove();
    }
  };

  useEffect(() => {
    modifyPFCardStyle();
    return () => {
      removeCustomStyles();
    };
  }, []);

  useEffect(() => {
    setFilters({
      "selectedEntity": selectedEntity,
      "selectedAttribute": selectedAttribute,
      "userText": userText,
      "selectedCveSeverityOptions": selectedCveSeverityOptions,
      "selectedCveStatusOptions": selectedCveStatusOptions
    })
    // eslint-disable-next-line
  }, [selectedEntity, selectedAttribute, userText, selectedCveSeverityOptions, selectedCveStatusOptions]);

  return (
      <div>
      <FormControl className={classes.dropDowns}>
   	         <EntitySelectComponent
   	             options={entities}
   	             setSelectedEntity={setSelectedEntity}
   	         />
      </FormControl>
      <FormControl className={classes.dropDowns}>
   	         <AttributeSelectComponent
   	             options={attributes}
   	             displayAttributes={getSelectedAttributes()}
   	             setSelectedAttribute={setSelectedAttribute}
   	         />
      </FormControl>
      <FormControl className={classes.textBox}>
   	         <InputFieldComponent setUserText={setUserText} />
      </FormControl>
      <FormControl className={classes.dropDownsMulti}>
   	         <CheckboxSelectComponent
   	             options={cveSeverityOptions}
   	             dropdownName={"CVE severity"}
   	             setSelectedOptions={setSelectedCveSeverityOptions}
   	         />
      </FormControl>
      <FormControl className={classes.dropDownsMulti}>
   	         <CheckboxSelectComponent
   	             options={cveStatusOptions}
   	             dropdownName={"CVE status"}
   	             setSelectedOptions={setSelectedCveStatusOptions}
   	         />
      </FormControl>
      </div>
  )
}

export default DataFilterComponent;
