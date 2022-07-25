import React from 'react';
import { IdTextPair } from '../../abstractions/IdTextPair';
import CustomSelect from '../common/CustomSelect';

interface Props {
    directions: IdTextPair[];
    onSave: (direction: number) => void
}

// https://codesandbox.io/s/react-typescript-select-component-f6u05?file=/src/App.tsx
export default function DirectionSelector(props: Props) {
    const firstDirection = props.directions.find(d => { return d.selected === true }) || props.directions[0];
    const [direction, setDirection] = React.useState<IdTextPair>(firstDirection);

    function customSave(pair: IdTextPair) {
        if (pair) {
          setDirection(pair);
          props.onSave(pair.id);
        }
    }

    return (
      <div>
        <CustomSelect
          value={direction}
          onChange={customSave}
          options={props.directions}
          // has an error if no mapOptionToLabel is provided!
          mapOptionToLabel={(d: IdTextPair) => d.name}
          mapOptionToValue={(d: IdTextPair) => d.id}
        />
      </div>
    );
  };