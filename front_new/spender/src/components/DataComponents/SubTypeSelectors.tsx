import React from 'react';
import { IdTextPair } from '../../abstractions/IdTextPair';
import CustomSelect from '../common/CustomSelect';

interface Props {
    subTypes: IdTextPair[];
    onSave: (direction: number) => void
}

export default function SubTypeSelector(props: Props) {
    const firstSubType = props.subTypes.find(d => { return d.selected === true }) || props.subTypes[0];
    const [subType, setSubType] = React.useState<IdTextPair>(firstSubType);

    function customSave(pair: IdTextPair) {
        if (pair) {
          setSubType(pair);
          props.onSave(pair.id);
        }
    }

    return (
      <div>
        <CustomSelect
          value={subType}
          onChange={customSave}
          options={props.subTypes}
          // has an error if no mapOptionToLabel is provided!
          mapOptionToLabel={(d: IdTextPair) => d.name}
          mapOptionToValue={(d: IdTextPair) => d.id}
        />
      </div>
    );
  };