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

interface Props {
    show: boolean
    onClose: () => void
    onSave: (item: ISpent, isNew: boolean) => void
    item?: ISpent
}

export default function AddEditSpendModal(props: Props) {
    const isNew = props.item === null;
    
    const [editableAmount, setEditableAmount] = useState<number>(props.item?.amount || 0);
    const [editableType, setEditableType] = useState<number>(props.item?.typeId || 0);
    const [editableSubType, setEditableSubType] = useState<number>(props.item?.subType || 0);
    const [editableIsFrequent, setEditableIsFrequent] = useState(props.item?.isFrequent || false);
    const [editableComment, setEditableComment] = useState<string>(props.item?.comment || '');
    const [editableDirection, setEditableDirection] = useState<number>(props.item?.direction || 0);
    const [dateLanded, setDateLanded] = React.useState<Date>(
      dateFns.parse(formatAsCommon(props.item ? props.item.date : new Date()), "MM/dd/yyyy", new Date())
    );

    function onSaveButton() {
        if (isNew) {
          console.log('save new', props.item);
          props.onSave({
            id: 0,
            amount: editableAmount,
            typeId: 0,
            subType: 0,
            date: dateLanded,
            isFrequent: editableIsFrequent,
            comment: editableComment,
            currencySign: zlotyCurrencySign,
            direction: editableDirection,
            rawDate: formatAsCommon(dateLanded)
          } as ISpent, true);
        } else {
          console.log('save not new', props.item);
          props.onSave({
            id: props.item!.id,
            amount: editableAmount,
            typeId: props.item!.typeId,
            subType: props.item!.subType,
            date: dateLanded,
            isFrequent: editableIsFrequent,
            comment: editableComment,
            currencySign: props.item!.currencySign,
            direction: props.item!.direction,
            rawDate: formatAsCommon(dateLanded)
          } as ISpent, false);
        }
    }

    return (
        <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.item ? "Edit spend" : "Create spend"}</Modal.Title>
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
          if (isNumeric(stringValue)) {
              setEditableAmount(parseFloat(stringValue));
          }
        }} />
      </InputGroup>

      <FloatingLabel
        controlId="floatingCommentTextarea"
        label="Comment"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" value={editableComment} onChange={(e) => setEditableComment(e.target.value)} />
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formIsFrequentCheckbox">
        <Form.Check type="checkbox" label="Is frequent ?" checked={editableIsFrequent} onChange={(event) => setEditableIsFrequent(event.target.checked)} />
      </Form.Group>

            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onSaveButton}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}