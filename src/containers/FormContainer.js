import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SendingProgress from '../components/SendingProgress'

class FormContainer extends React.Component { 
  render () {
    const sendMsg = <SendingProgress email="faggot" />;
    return (
      <>
        {
          this.props.sendStatus 
          ? (<h1 className="form-container__header">Отправлялка сообщений</h1>) 
          : sendMsg
        }
      </>
  )}
}

FormContainer.propTypes = {
  sendStatus: PropTypes.number.isRequired
}

const mapStateToProps = (state) => {
  const { sendStatus } = state.default;
  return {
    sendStatus
  }
}

export default connect(mapStateToProps)(FormContainer);
