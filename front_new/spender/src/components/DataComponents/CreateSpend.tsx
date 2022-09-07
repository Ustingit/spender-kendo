import React, { useState, useEffect } from 'react';
import SpendContext from '../../business/SpendContextInfo';
import ISpent from '../../business/SpentInterface';
import { zlotyCurrencySign } from '../../constants';
import { formatAsCommon } from '../../helpers/calendar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dateFns from "date-fns";
import { isNumeric } from '../../helpers/numberHelper';
import SpendType from '../../business/SpendType';
import { IdTextPairWithParent } from '../../abstractions/IdTextPair';
import DirectionSelector from './DirectionSelector';
import TypeSelector from './TypeSelector';
import SubTypeSelector from './SubTypeSelectors';

interface Props {
    show: boolean
    onClose: () => void
    onSave: (item: ISpent) => void,
    context: SpendContext;
}

export default function CreateSpend(props: Props) {
    const [editableDirection, setEditableDirection] = useState<number>(props.context.defaultDirection);
    const [spendTypes, setSpendTypes] = useState<SpendType[]>(props.context.initialMatchedTypes);
    const [editableType, setEditableType] = useState<number>(props.context.defaultType);
    const [spendSubTypes, setSubSpendTypes] = useState<IdTextPairWithParent[]>(props.context.initialMatchedSubTypes);
    const [editableSubType, setEditableSubType] = useState<number | null>(props.context.defaultSubType);
    const [editableAmount, setEditableAmount] = useState<number>(3.40);
    const [editableIsFrequent, setEditableIsFrequent] = useState(false);
    const [editableComment, setEditableComment] = useState<string>('');
    const [dateLanded, setDateLanded] = React.useState<Date>(
      dateFns.parse(formatAsCommon(new Date()), "MM/dd/yyyy", new Date())
    );

    useEffect(() => {
      var matchedTypes = props.context.types.filter(t => t.direction === editableDirection);
      var type = matchedTypes[0].id;
      setSpendTypes(matchedTypes || []);
      setEditableType(type);
    }, [editableDirection]);

    useEffect(() => {
      var matchedSubTypes = props.context.subTypes.filter(st => st.parent && st.parent === editableType);
      setSubSpendTypes(matchedSubTypes || []);
      if (matchedSubTypes.length > 0) {
        setEditableSubType(matchedSubTypes[0].id);
      }
    }, [editableType]);

    function clearForm() {
      setEditableAmount(0);
      setEditableDirection(props.context.defaultDirection);
      setEditableType(props.context.defaultType);
      setEditableSubType(props.context.defaultSubType);
      setEditableIsFrequent(false);
      setEditableComment('');
      setDateLanded(dateLanded);
    }

    function onSaveButton() {
        props.onSave({
            id: 0,
            amount: editableAmount,
            typeId: editableType,
            subType: editableSubType,
            date: dateLanded,
            isFrequent: editableIsFrequent,
            comment: editableComment,
            currencySign: zlotyCurrencySign,
            direction: editableDirection,
            rawDate: formatAsCommon(dateLanded)
          } as ISpent);

        clearForm();
    }

    if (!props.show || !props.context) {
        return <></>;
    }

    return (
        <Modal show={props.show} onHide={() => {
          props.onClose();
          clearForm();
        }}>
        <Modal.Header closeButton>
          <Modal.Title>Create spend</Modal.Title>
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
        <InputGroup.Text  >{zlotyCurrencySign}</InputGroup.Text>
        <Form.Control aria-label="Amount" type="number" placeholder="10.00" value={editableAmount} onChange={(e) => {
          const stringValue = e.target.value;
          if (isNumeric(stringValue)) {
              setEditableAmount(parseFloat(stringValue));
          }
        }} />
      </InputGroup>

      <InputGroup className="mb-3" >
          <DirectionSelector directions={props.context.directions} onSave={setEditableDirection} />
      </InputGroup>
      <InputGroup className="mb-3" >
          <TypeSelector types={spendTypes} onSave={setEditableType} />
      </InputGroup>
      {spendSubTypes !== undefined && spendSubTypes.length > 0 && <>
        <InputGroup className="mb-3" >
          <SubTypeSelector subTypes={spendSubTypes} onSave={setEditableSubType} />
      </InputGroup>
      </>}
      
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
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    );
}