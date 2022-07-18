import React from 'react';
import '../../App.css';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ISpent from '../../business/SpentInterface'
import AddEditSpendModal from '../DataComponents/AddEditSpend'

interface Props {
    concreteSpent: ISpent;
    onDelete: (id: number) => void
    onEdit: (item: ISpent, isNew: boolean) => void,
    onSetShowPopup: (value: boolean) => void,
    showPopup: boolean
}

export default function SpendCard(props: Props) {
    return (
        <Row>
            <AddEditSpendModal show={props.showPopup} onClose={() => props.onSetShowPopup(false)} onSave={props.onEdit} item={props.concreteSpent} />
                 <Col>
                 <Card style={{ width: '400rem' }}>
      <Card.Body>
        <Card.Title>{props.concreteSpent.amount}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.concreteSpent.typeName} {props.concreteSpent.subTypeName && props.concreteSpent.subTypeName}</Card.Subtitle>
        <Card.Text>
            {props.concreteSpent.comment}
        </Card.Text>
        <Card.Link href="#" onClick={() => props.onSetShowPopup(true)} >Edit</Card.Link>
        <Card.Link href="#" onClick={(e: any) => props.onDelete(Number(props.concreteSpent.id))} >Delete</Card.Link>
        <Card.Link href="#">Mark as usual</Card.Link>
      </Card.Body>
    </Card>
                 </Col>
            </Row>
    );
}