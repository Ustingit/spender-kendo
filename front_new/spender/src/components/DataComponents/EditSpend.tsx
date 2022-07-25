import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ISpent from '../../business/SpentInterface';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { zlotyCurrencySign } from '../../constants';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dateFns from "date-fns";
import { formatAsCommon } from '../../helpers/calendar';
import { isNumeric } from '../../helpers/numberHelper';
import SpendContext from '../../business/SpendContextInfo';
import SpendType from '../../business/SpendType';
import { IdTextPair } from '../../abstractions/IdTextPair';
import DirectionSelector from './DirectionSelector';

interface Props {
    show: boolean
    onClose: () => void
    onSave: (item: ISpent) => void
    item: ISpent,
    context: SpendContext;
}

export default function AddEditSpendModal(props: Props) {
    const [spendTypes, setSpendTypes] = useState<SpendType[]>(props.context.types);
    const [spendSubTypes, setSubSpendTypes] = useState<IdTextPair[]>(props.context.subTypes);
    const [spendDirections, setSpendDirections] = useState<IdTextPair[]>(props.context.directions);
    
    const [editableAmount, setEditableAmount] = useState<number>(props.item.amount);
    const [editableType, setEditableType] = useState<number>(props.item.typeId);
    const [editableSubType, setEditableSubType] = useState<number>(props.item.subType);
    const [editableIsFrequent, setEditableIsFrequent] = useState(props.item.isFrequent);
    const [editableComment, setEditableComment] = useState<string>(props.item.comment || '');
    const [editableDirection, setEditableDirection] = useState<number>(props.item.direction);
    const [dateLanded, setDateLanded] = React.useState<Date>(
      dateFns.parse(formatAsCommon(props.item ? props.item.date : new Date()), "MM/dd/yyyy", new Date())
    );

    function clearForm() {
      setEditableAmount(0);
      setEditableDirection(editableDirection || 0);
      setEditableType(1);
      setEditableSubType(1);
      setEditableIsFrequent(false);
      setEditableComment('');
      setDateLanded(dateLanded);
    }

    function onSaveButton() {
      props.onSave({
        id: props.item!.id,
        amount: editableAmount,
        typeId: props.item!.typeId || 1,
        subType: props.item!.subType || 1,
        date: dateLanded,
        isFrequent: editableIsFrequent,
        comment: editableComment,
        currencySign: props.item!.currencySign,
        direction: editableDirection,
        rawDate: formatAsCommon(dateLanded)
      } as ISpent);

        clearForm();
    }

    if (!props.show || !props.item || !props.context) {
      return <></>;
    }

    return (
        <Modal show={props.show} onHide={() => {
          props.onClose();
          clearForm();
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit spend</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div><span>Date: </span>
            <DatePicker
              selected={dateLanded}
              onChange={(date) => {
              if (!date || Array.isArray(date)) {
                return;
              }

              setDateLanded(date);
            }}
        />
      </div>

      <InputGroup className="mb-3">
        <InputGroup.Text  >{props.item ? props.item.currencySign : zlotyCurrencySign}</InputGroup.Text>
        <Form.Control aria-label="Amount" type="number" placeholder="10.00" value={editableAmount} onChange={(e) => {
          const stringValue = e.target.value;
          console.log(stringValue);
          
          if (isNumeric(stringValue)) {
              setEditableAmount(parseFloat(stringValue));
          }
        }} />
      </InputGroup>

      <InputGroup className="mb-3" >
          <DirectionSelector directions={spendDirections} onSave={setEditableDirection} />
      </InputGroup>

      <FloatingLabel
        controlId="floatingCommentTextarea"
        label="Comment"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" value={editableComment} onChange={(e) => setEditableComment(e.target.value || '')} />
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formIsFrequentCheckbox">
        <Form.Check type="checkbox" label="Is frequent ?" checked={editableIsFrequent} onChange={(event) => setEditableIsFrequent(event.target.checked)} />
      </Form.Group>

            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            props.onClose();
            clearForm();
          }}>
            Close
          </Button>
          <Button variant="primary" onClick={onSaveButton}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}