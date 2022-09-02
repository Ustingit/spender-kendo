import React, {useState, useEffect} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import TopNavbar from './components/navbars/TopNavbar'
import SpendsGrid from './components/DataComponents/SpendsGrid';
import SpendContext from './business/SpendContextInfo';
import contextApi from './api/spendsContextApi';

// alert
//+ fetch of data
// authorization, simple
// authorization, modern
// toasts
// first report
// full crud
// state
// forms with validations
// translations
// images spend or income
// +type to db income or spend
// +search for concrete spent
// +grouping by date
// waiter for data spinner
// pages (react-router)

const emptyContext = new SpendContext([], [], []);

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
