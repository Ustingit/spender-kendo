import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import TopNavbar from './components/navbars/TopNavbar'
import SpendsGrid from './components/DataComponents/SpendsGrid';

// alert
//+ fetch of data
// authorization, simple
//authorization, modern
// toasts
// first report
// full crud
// state
// forms with validations
// translations
// images spend or income
// type to db income or spend
// search for concrete spent
// grouping by date
//waiter for data spinner

function App() {
  return (
    <Container fluid >
      <TopNavbar />
      <SpendsGrid />
   </Container>
  );
}

export default App;
