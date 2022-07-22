import React from 'react';
import { IdTextPair } from '../../abstractions/IdTextPair';

type Allowed = string | number | IdTextPair;
type AllowedConvertions = string | number;

type BaseProps<Value> = {
  value: Value;
  onChange: (newValue: Value) => void;
  options: readonly Value[];
  mapOptionToLabel?: (option: Value) => AllowedConvertions;
  mapOptionToValue?: (option: Value) => AllowedConvertions;
};

// mappers required only in certain cirumstances
// we could get fancier here and also not require if `Value` has `value`/`label` properties
type Props<Value> = Value extends Allowed
  ? BaseProps<Value>
  : Required<BaseProps<Value>>;

const isAllowed = (v: any): v is AllowedConvertions => typeof v === "string" || typeof v === "number";

export default function CustomSelect<Value>({
    value,
    onChange,
    options,
    mapOptionToLabel,
    mapOptionToValue
  }: Props<Value>) {
    if (!options) {
      return <></>;
    }

    const toLabel = (option: Value): AllowedConvertions => {
      if (mapOptionToLabel) {
        return mapOptionToLabel(option);
      }
      // if our props are provided correctly, this should never be false
      return isAllowed(option) ? option : String(option);
    };
  
    const toValue = (option: Value): AllowedConvertions => {
      if (mapOptionToValue) {
        return mapOptionToValue(option);
      }
      return isAllowed(option) ? option : String(option);
    };
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(options[e.target.selectedIndex]);
    };

    return (
      <select value={toValue(value)} onChange={handleChange} className="form-select" >
        {options.map((value) => (
          <option value={toValue(value)} key={toValue(value)}>
            {toLabel(value)}
          </option>
        ))}
      </select>
    );
  }