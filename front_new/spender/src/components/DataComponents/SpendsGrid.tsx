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
import SpendContext from '../../business/SpendContextInfo';
import CreateSpend from './CreateSpend';
import EditSpendModal from './EditSpend';
import { groupDataByDateAsString } from '../../helpers/dataTransmutators';
import * as _ from "lodash";
import { BasicSpinner } from '../common/Spinners/CommonSpinner';
import SpendStatistics from './SpendStatistics';

interface Props {
    filterValue: string;
    context: SpendContext;
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

const emptyDefaultSpend = {} as ISpent;

export default function SpendsGrid(props: Props) {
    const [loading, setLoading] = useState<boolean>(true);
    const [spends, setSpends] = useState<ISpent[]>([]);
    const [showEditPopup, setShowEditPopup] = useState<boolean>(false);
    const [showCreatePopup, setShowCreatePopup] = useState<boolean>(false);
    const [itemToEdit, setItemToEdit] = useState<ISpent>(emptyDefaultSpend);

    async function FetchAllSpends() {
        var spends = await new spendsApi().fetchAll();
        setSpends(spends);
        setLoading(false);
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

    function onEditPopupShow(item: ISpent) {
        setItemToEdit(item);
        setShowEditPopup(true);
    }

    async function addSpend(item: ISpent) {
        var savedSpend = await new spendsApi().create(item);

            if (savedSpend) {
                const updatedSpends = spends.concat(savedSpend);
                setSpends(updatedSpends);
            }

            setShowCreatePopup(false);
    }

    if (loading) {
        return <Container><Row><BasicSpinner /></Row></Container>
    }

    const itemsToRepresent = props && props.filterValue 
        ? groupDataByDateAsString(filterValues(spends, props.filterValue) , "date")
        : groupDataByDateAsString(spends, "date");

    return (
        <Container fluid>
        <SpendStatistics statistics={props.context.statisticsDto} />
        <div>
            <Button variant="primary" onClick={() => setShowCreatePopup(true)} >Add spend</Button>{' '}
            {showCreatePopup && <CreateSpend show={showCreatePopup} onClose={() => setShowCreatePopup(false)} onSave={addSpend} context={props.context} />}
            {showEditPopup && <EditSpendModal onClose={() => setShowEditPopup(false)} onSave={editSpend} item={itemToEdit} context={props.context} />}
            <p style={{marginTop: "5px"}}>Spends:</p>
        </div>
        {
            _.keys(itemsToRepresent).map((key, index) => {
                return (
                    <div className="period bold" key={index} style={{width: "100%"}} >
                        <p>{new Date(key).toLocaleString('en-us',{month:'short', year:'numeric', day: 'numeric'})}</p>
                        {
                            itemsToRepresent[key].map((element) => {
                                return <SpendCard concreteSpent={element} key={element.id} onDelete={deleteSpend} onEditPopupShow={onEditPopupShow} />
                            })
                        }
                    </div>
                );
            })
        }
        </Container>
    );
}