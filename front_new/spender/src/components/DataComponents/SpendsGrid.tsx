import React, { useState, useEffect } from 'react';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ISpent from '../../business/SpentInterface'
import SpendCard from './SpendCard';

export default function SpendsGrid() {
    const [spends, setSpends] = useState<ISpent[]>([]);

    async function FetchAllSpends() {
        const response = await fetch("https://localhost:44322/Spent/get");
        var json = await response.json();

        setSpends(json);
    }

    useEffect(() => {
        FetchAllSpends()
    }, [])

    if (!spends) {
        return <Container><Row>...loading...</Row></Container>
    }

    return (
        <Container fluid>
        {spends.map((element) => {
        return (
            <SpendCard concreteSpent={element} key={element.id} />
        );
      })}
        </Container>
    );
}