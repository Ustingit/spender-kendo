import React from 'react';
import { IdTextPair } from '../../abstractions/IdTextPair';
import SpendType from '../../business/SpendType';
import CustomSelect from '../common/CustomSelect';

interface Props {
    types: SpendType[];
    onSave: (direction: number) => void
}

export default function TypeSelector(props: Props) {
    const firstType = props.types.find(d => { return d.selected === true }) || props.types[0];
    const [type, setType] = React.useState<IdTextPair>(firstType);

    function customSave(pair: IdTextPair) {
        if (pair) {
            setType(pair);
          props.onSave(pair.id);
        }
    }

    return (
      <div>
        <CustomSelect
          value={type}
          onChange={customSave}
          options={props.types}
          // has an error if no mapOptionToLabel is provided!
          mapOptionToLabel={(d: IdTextPair) => d.name}
          mapOptionToValue={(d: IdTextPair) => d.id}
        />
      </div>
    );
  };