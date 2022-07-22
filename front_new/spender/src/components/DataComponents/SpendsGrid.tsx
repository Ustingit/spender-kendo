import React, { useState, useEffect } from 'react';
import '../../App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button';
import ISpent from '../../business/SpentInterface'
import SpendCard from './SpendCard';
import spendsApi from '../../api/spendsApi';
import { isNumeric } from '../../helpers/numberHelper'
import { updateSpend } from '../../helpers/business/spendsHelper';
import AddEditSpendModal from '../DataComponents/AddEditSpend';
import SpendContext from '../../business/SpendContextInfo';

interface Props {
    filterValue: string;
    context: SpendContext | null;
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
    const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
    const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);

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

    async function editSpend(item: ISpent, isNew: boolean) {
        if (isNew) {
            var savedSpend = await new spendsApi().create(item);

            if (savedSpend) {
                const updatedSpends = spends.concat(savedSpend);
                setSpends(updatedSpends);
            }

            setShowCreatePopup(false);
        } else {
            var successful = await new spendsApi().edit(item);
        
            if (successful) {
                var newSpends = spends;
                const index = newSpends.findIndex((obj => obj.id === item.id));
                const itemToUpdate = newSpends[index];

                if (itemToUpdate) {
                    newSpends[index] = updateSpend(itemToUpdate, item);
                    setSpends(newSpends);
                }
            }

            setShowEditPopup(false);
        }
    }

    if (!spends) {
        return <Container><Row>...loading...</Row></Container>
    }

    const itemsToRepresent = props && props.filterValue 
        ? filterValues(spends, props.filterValue) 
        : spends;

    return (
        <Container fluid>
        <div>
            <Button variant="primary" onClick={() => setShowCreatePopup(true)} >Add spend</Button>{' '}
            <AddEditSpendModal show={showCreatePopup} onClose={() => setShowCreatePopup(false)} onSave={editSpend} item={undefined} context={props.context} />
        </div>
        {itemsToRepresent.map((element) => {
            return (
                <SpendCard concreteSpent={element} key={element.id} onDelete={deleteSpend} onEdit={editSpend} showPopup={showEditPopup} onSetShowPopup={setShowEditPopup}  context={props.context} />
            );
        })}
        </Container>
    );
}