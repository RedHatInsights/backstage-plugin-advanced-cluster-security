import React, { useEffect } from 'react';
import { Select, SelectOption, SelectList, MenuToggle, MenuToggleElement, Badge } from '@patternfly/react-core';

export const CheckboxSelectComponent: React.FunctionComponent = ({ setSelectedOptions, options, dropdownName }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<number[]>([]);

  const onToggleClick = () => {
    setIsOpen(!isOpen);
  };

  const onSelect = (_event: React.MouseEvent<Element, MouseEvent> | undefined, value: string | number | undefined) => {
    if (selectedItems.includes(value as number)) {
      setSelectedItems(selectedItems.filter((id) => id !== value));
    } else {
      setSelectedItems([...selectedItems, value as number]);
    }
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      ref={toggleRef}
      onClick={onToggleClick}
      isExpanded={isOpen}
      style={
        {
          width: '150px'
        } as React.CSSProperties
      }
    >
      {dropdownName}
      {selectedItems.length > 0 && <Badge isRead>{selectedItems.length}</Badge>}
    </MenuToggle>
  );

  useEffect(() => {
    setSelectedOptions(selectedItems);
  }, [selectedItems, setSelectedOptions]);

  return (
    <Select
      role="menu"
      id="checkbox-select"
      isOpen={isOpen}
      selected={selectedItems}
      onSelect={onSelect}
      onOpenChange={(nextOpen: boolean) => setIsOpen(nextOpen)}
      toggle={toggle}
    >
      <SelectList>
        {options.map((value, index) => (
          <SelectOption hasCheckbox value={value} isSelected={selectedItems.includes(value)}>
            {value}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
};

