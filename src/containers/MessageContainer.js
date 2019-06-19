import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import MessageList from '../components/MessageList';

class MessageContainer extends React.Component {
  render () {
    const list = <MessageList messages={this.props.messages} />
    const emptyList = (<p>Сообщения еще не отправлялись</p>);
    return(
      <Container>
        <Row>
          <h2 className="message-container__header">Отправленные сообщения</h2>
        </Row>
        <Row>
          { this.props.messages.length ? list : emptyList }
        </Row>
      </Container>
  )}
}

MessageContainer.propTypes = {
  messages: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  const { messages } = state.default;
  return {
    messages
  }
}

export default connect(mapStateToProps)(MessageContainer);
