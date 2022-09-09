import React from 'react';
import Container from 'react-bootstrap/Container';
import StatisticsDto from '../../business/SpendStatistics';

interface Props {
    statistics: StatisticsDto;
}

export default function SpendStatistics(props: Props) {
    return(
        <Container fluid >
            <div>
                <p>Year numbers: <span>Income: {props.statistics.totalYearIncomes}</span> <span>Outcome: {props.statistics.totalYearOutcomes}</span></p>
                <p>Month: <span>Income: {props.statistics.totalMonthIncomes}</span> <span>Outcome: {props.statistics.totalMonthOutcomes}</span></p>
                <p>Balance: <span>Month: {props.statistics.monthlyBalance}</span> <span>Year: {props.statistics.yearBalance}</span></p>
            </div>
        </Container>
    );
 }