import React, { useState, useEffect } from 'react';
import '../../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ISpent from '../../business/SpentInterface'
import SpendCard from './SpendCard';
import spendsApi from '../../api/spendsApi';

export default function SpendsGrid() {
    const [spends, setSpends] = useState<ISpent[]>([]);

    async function FetchAllSpends() {
        var spends = await new spendsApi().fetchAll();
        setSpends(spends);
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