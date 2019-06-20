import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SendsayForm from '../components/SendsayForm'
import SendingProgress from '../components/SendingProgress'
import { sendMessage } from '../store/actions/api'

class FormContainer extends React.Component { 
  render () {
    const sendMsg = <SendingProgress email="faggot" />;
    return <>{
      this.props.sendStatus === 0
      ? <SendsayForm onSend={this.props.send} sendStatus={1} />
      : sendMsg
    }</>
}}

FormContainer.propTypes = {
  sendStatus: PropTypes.number.isRequired,
  send: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { sendStatus } = state.default;
  return {
    sendStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    send: event => dispatch(sendMessage(event)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
