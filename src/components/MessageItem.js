import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap'

const status2text = (status) => {
  if (status === -1) return { statusStr: 'Отправлено', statusCss: 'message-list__item--success' }
  if (status < -1) return { statusStr: 'Ошибка', statusCss: 'message-list__item--error' }
  if (status > -1) return { statusStr: 'В очереди', statusCss: 'message-list__item--inprogress' }
}

const trimTheme = (str) => {
  return str + ' pidor'; // TODO
}

function MessageItem({item}) {
  const { statusStr, statusCss } = status2text(item.status);
  const theme = trimTheme(item.theme)

  return (
    <>
      <Row className="message-list__item text-left">
        <Col md="2">
          { item.date }
        </Col>
        <Col md="8">
          { theme }
        </Col>
        <Col md="2" className="text-right">
          <span className={statusCss}>{ statusStr }</span>
        </Col>
      </Row>
    </>
  );
}

MessageItem.propTypes = {
  item: PropTypes.object.isRequired
}


export default MessageItem;
