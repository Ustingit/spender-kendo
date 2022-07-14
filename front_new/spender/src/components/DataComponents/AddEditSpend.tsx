import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ISpent from '../../business/SpentInterface';

interface Props {
    show: boolean
    onClose: () => void
    onSave: () => void
    item?: ISpent
}

export default function AddEditSpendModal(props: Props) {
    

    return (
        <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.item ? "Edit spend" : "Create spend"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.onSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
}