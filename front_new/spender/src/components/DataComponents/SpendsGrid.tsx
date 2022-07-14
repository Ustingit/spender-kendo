import React, { useState, useEffect } from 'react';
import '../../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ISpent from '../../business/SpentInterface'
import SpendCard from './SpendCard';
import spendsApi from '../../api/spendsApi';
import { isNumeric } from '../../helpers/numberHelper'

interface Props {
    filterValue: string;
}

function filterValues(items: ISpent[], filter: string) : ISpent[] {
    if (!filter || !items) {
        return items;
    }

    var loweredFilter = filter.toLowerCase();
    return items.filter(x => (x.comment && x.comment.toLowerCase().includes(loweredFilter))
        || (x.typeName && x.typeName.toLowerCase().includes(loweredFilter))
        || (x.subTypeName && x.subTypeName.toLowerCase().includes(loweredFilter))
        || (x.amount && isNumeric(loweredFilter) && x.amount.toString().includes(loweredFilter))
    );
}

export default function SpendsGrid(props: Props) {
    const [spends, setSpends] = useState<ISpent[]>([]);

    async function FetchAllSpends() {
        var spends = await new spendsApi().fetchAll();
        setSpends(spends);
    }

    useEffect(() => {
        FetchAllSpends()
    }, [])

    async function deleteSpend(id: number) {
        var successful = await new spendsApi().delete(id);
        
        if (successful) {
            const newSpends = spends.filter(x => Number(x.id) !== id);
            setSpends(newSpends);
        }
    } 

    async function editSpend(item: ISpent) {
        var successful = await new spendsApi().edit(item);
        
        if (successful) {
            const newSpends = spends.filter(x => x.id == item.id);
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

    const itemsToRepresent = props && props.filterValue 
        ? filterValues(spends, props.filterValue) 
        : spends;

    return (
        <Container fluid>
        {itemsToRepresent.map((element) => {
        return (
            <SpendCard concreteSpent={element} key={element.id} onDelete={deleteSpend} onEdit={editSpend} />
        );
      })}
        </Container>
    );
}