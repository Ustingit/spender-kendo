import React, {useState, useEffect} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import TopNavbar from './components/navbars/TopNavbar'
import SpendsGrid from './components/DataComponents/SpendsGrid';
import SpendContext from './business/SpendContextInfo';
import contextApi from './api/spendsContextApi';
import StatisticsDto from './business/SpendStatistics';

// alert
//+ fetch of data
// authorization, simple
// authorization, modern
// toasts
// first report web
// report to excel
// report to pdf (this new package of poland guy from JetBrains)
// +full crud
// state
// forms with validations
// translations
// +images spend or income
// +type to db income or spend
// +search for concrete spent
// +grouping by date
// +waiter for data spinner
// pages (react-router)
// +all the selectors for types\subtypes\etc
// add total sum to the page
// move helpers in back-end to external nuget package and use it in next applications

const emptyStatistics = new StatisticsDto(0, 0, 0, 0, 0, 0);
const emptyContext = new SpendContext([], [], [], 0, null, 0, emptyStatistics);

function App() {
  const [searchString, setSearchString] = useState<string>("");
  const [context, setContext] = useState<SpendContext>(emptyContext);

  async function fetchContext() {
    const context = await new contextApi().fetchContext();
    setContext(context);
  }
  
  useEffect(() => {
    fetchContext();
  }, [])

  return (
    <Container fluid >
      <TopNavbar onFilterChange={(filterValue) => setSearchString(filterValue)} />
      <SpendsGrid filterValue={searchString} context={context} />
   </Container>
  );
}

export default App;
