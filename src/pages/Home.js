import React from 'react';
import { Container, Row } from 'react-bootstrap'
import Logo from '../components/Logo'
import MessageContainer from '../containers/MessageContainer'
import FormContainer from '../containers/FormContainer'
import '../styles/common.scss';

function HomePage() {
  return (
    <Container className="main-container">
      <Row className="logo">
        <Logo />
      </Row>
      <Row className="form-container">
        <FormContainer />
      </Row>
      <Row className="message-container">
        <MessageContainer />
      </Row>
    </Container>
  );
}




export default HomePage;
