import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SendsayForm from '../components/SendsayForm'
import SendingProgress from '../components/SendingProgress'
import { sendMessage } from '../store/actions/api'

class FormContainer extends React.Component { 
  render () {
    const sendMsg = <SendingProgress email={this.props.sendTo} />;
    const form = <SendsayForm
      onSend={this.props.send}
      sendStatus={1} />;
    return <>{
      this.props.sendStatus === 0 ? form : sendMsg
    }</>
  }
}

FormContainer.propTypes = {
  sendStatus: PropTypes.number.isRequired,
  sendTo: PropTypes.string.isRequired,
  send: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { sendStatus, sendTo } = state.default;
  return {
    sendStatus,
    sendTo
  }
}

const mapDispatchToProps = dispatch => {
  return {
    send: (values, files) => dispatch(sendMessage(values, files)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
