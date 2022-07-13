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

    async function deleteSpend(id: number) {
        console.log('in delete 1');
        var successful = await new spendsApi().delete(id);
        
        if (successful) {
            const newSpends = spends.filter(x => Number(x.id) !== id);
            setSpends(newSpends);
        }
    } 

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.target);
        console.log(event.currentTarget);
      };

    if (!spends) {
        return <Container><Row>...loading...</Row></Container>
    }

    return (
        <Container fluid>
        {spends.map((element) => {
        return (
            <SpendCard concreteSpent={element} key={element.id} onDelete={deleteSpend} />
        );
      })}
        </Container>
    );
}