import React, { useEffect } from 'react';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import FormHelperText from '@material-ui/core/FormHelperText';

export const CheckboxSelectComponent: React.FunctionComponent = ({ setSelectedOptions, options, dropdownName }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedItems(event.target.value as string[]);
  };

  const handleChangeMultiple = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { options } = event.target as HTMLSelectElement;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSelectedOptions(value);
  };

  useEffect(() => {
    setSelectedOptions(selectedItems);
  }, [selectedItems, setSelectedOptions]);

  return (
    <Select
      labelId="demo-mutiple-checkbox-label"
      id="demo-mutiple-checkbox"
      multiple
      value={selectedItems}
      onChange={handleChange}
      input={<Input />}
      renderValue={(selected) => {
        if ((selected as string[]).length === 0) {
          return <em>Placeholder</em>;
        }

        return (selected as string[]).join(', ');
      }}
      MenuProps={MenuProps}
    >
      {options.map((value) => (
        <MenuItem key={value} value={value}>
          <Checkbox checked={selectedItems.indexOf(value) > -1} />
          <ListItemText primary={value} />
        </MenuItem>
      ))}
    </Select>
  );
};

