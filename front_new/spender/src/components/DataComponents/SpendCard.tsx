import React from 'react';
import '../../App.css';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ISpent from '../../business/SpentInterface'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowTrendUp, faArrowTrendDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
    concreteSpent: ISpent;
    onDelete: (id: number) => void
    onEditPopupShow: (item: ISpent) => void,
}

export default function SpendCard(props: Props) {
    var arrow = props.concreteSpent.direction === 0 ? faArrowTrendDown : faArrowTrendUp;

    return (
        <Row>
                 <Col>
                 <Card style={{ width: "100%" }}>
                    <Card.Header><FontAwesomeIcon icon={arrow} /></Card.Header>
      <Card.Body>
        <Card.Title>{props.concreteSpent.currencySign} {props.concreteSpent.amount}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.concreteSpent.typeName} {props.concreteSpent.subTypeName && props.concreteSpent.subTypeName}</Card.Subtitle>
        <Card.Text>
            {props.concreteSpent.comment}
        </Card.Text>
        <Card.Link href="#" onClick={() => props.onEditPopupShow(props.concreteSpent)} >Edit</Card.Link>
        <Card.Link href="#" onClick={(e: any) => props.onDelete(Number(props.concreteSpent.id))} >Delete</Card.Link>
        <Card.Link href="#">Mark as usual</Card.Link>
      </Card.Body>
    </Card>
                 </Col>
            </Row>
    );
}