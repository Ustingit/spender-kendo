import React, { useState, useRef } from 'react';
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

interface Props {
    show: boolean
    onClose: () => void
    onSave: () => void
    item?: ISpent
}

export default function AddEditSpendModal(props: Props) {
    const isNew = props.item === null;
    
    const [editableAmount, setEditableAmount] = useState<number>(props.item?.amount || 0);
    const [editableType, setEditableType] = useState<number>(props.item?.type || 0);
    const [editableSubType, setEditableSubType] = useState<number>(props.item?.subType || 0);
    const [editableIsFrequent, setEditableIsFrequent] = useState(props.item?.isFrequent || false);
    const [editableComment, setEditableComment] = useState<string>(props.item?.comment || '');
    const [editableDirection, setEditableDirection] = useState<number>(props.item?.direction || 0);
    const [dateLanded, setDateLanded] = React.useState<Date>(
      dateFns.parse(formatAsCommon(props.item ? props.item.date : new Date()), "MM/dd/yyyy", new Date())
    );

    function onSaveButton() {
        console.log('SAVING!');
        console.log(editableAmount);
        console.log(editableType);
        console.log(editableSubType);
        console.log(dateLanded);
        console.log(editableIsFrequent);
        console.log(editableComment);
        console.log(editableDirection);
        
        //props.onSave();
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
        <Form.Control aria-label="Amount" type="number" placeholder="10.00" value={editableAmount} onChange={(e) => setEditableAmount(e.target.value as unknown as number)} />
      </InputGroup>

      <FloatingLabel
        controlId="floatingCommentTextarea"
        label="Comment"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Leave a comment here" value={editableComment} onChange={(e) => setEditableComment(e.target.value)} />
      </FloatingLabel>

      <Form.Group className="mb-3" controlId="formIsFrequentCheckbox">
        <Form.Check type="checkbox" label="Is frequent ?" value={editableIsFrequent as unknown as string} onChange={(date) => setEditableIsFrequent(date as unknown as boolean)} />
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