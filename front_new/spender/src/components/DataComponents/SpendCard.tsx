import React from 'react';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import ISpent from '../../business/SpentInterface'

interface Props {
    concreteSpent: ISpent;
}

export default function SpendCard(props: Props) {
    return (
<Row>
                 <Col>
                 <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{props.concreteSpent.amount}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.concreteSpent.typeName} {props.concreteSpent.subTypeName && props.concreteSpent.subTypeName}</Card.Subtitle>
        <Card.Text>
            {props.concreteSpent.comment}
        </Card.Text>
        <Card.Link href="#">Edit</Card.Link>
        <Card.Link href="#">Delete</Card.Link>
        <Card.Link href="#">Mark as usual</Card.Link>
      </Card.Body>
    </Card>
                 </Col>
            </Row>

       
    );
}