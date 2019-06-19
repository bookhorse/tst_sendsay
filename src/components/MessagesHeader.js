import React from 'react';
import { Row, Col } from 'react-bootstrap'

const MessagesHeader = () => (
  <>
    <Row className="message-list__header" noGutters>
      <Col md="2">
          Дата
      </Col>
      <Col md="8">
          Тема
      </Col>
      <Col md="2" className="text-right">
          Статус
      </Col>
    </Row>
    <hr />
  </>
);

export default MessagesHeader;
