import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap'

const SendingProgress = ({ email }) => (
  <Container className="sending-progress">
    <Row>
      <h1 className="sending-progress__header">
        Сообщение поставлено в очередь на отправку
      </h1>
    </Row>
    <Row>
      <p>Совсем скоро сообщение вылетит из сервера, и будет двигаться в сторону почты получателя «{email}» со скоростью электронов.</p>        
    </Row>
  </Container>
);

SendingProgress.propTypes = {
  email: PropTypes.string
}

export default SendingProgress;
