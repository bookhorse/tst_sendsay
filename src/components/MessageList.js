import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap'
import MessagesHeader from './MessagesHeader'
import MessageItem from './MessageItem'

function MessageList({messages}) {
  const list = messages.map((el, idx) => (
    <MessageItem item={el} key={idx} />
  ))

  return (
    <Container>
      <MessagesHeader />
      { list }
    </Container>
  );
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
}


export default MessageList;
