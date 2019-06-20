import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Button, Container, Col } from 'react-bootstrap';
import * as Yup from 'yup';

const cantBeEmpty = "Не может быть пустым";
const cantBeShort = "Не менее 2 символов";
const cantBeBig = "Слишком длинный текст";
const invalidEmail = "Неправильный формат почты";

const validSchema = Yup.object({
  senderName: Yup.string()
    .min(2, cantBeShort)
    .max(50, cantBeBig)
    .required(cantBeEmpty),
  senderEmail: Yup.string()
    .email(invalidEmail)
    .required(cantBeEmpty),
  receiverName: Yup.string()
    .min(2, cantBeShort)
    .max(50, cantBeBig)
    .required(cantBeEmpty),
  receiverEmail: Yup.string()
    .email(invalidEmail)
    .required(cantBeEmpty),
  theme: Yup.string()
    .min(2, cantBeShort)
    .max(100, cantBeBig)
    .required(cantBeEmpty),
  textarea: Yup.string()
    .min(2, cantBeShort)
    .required(cantBeEmpty)
});

const initialVals = {
  senderName: '',
  senderEmail: 'bestpony@horsefucker.org',
  receiverName: '',
  receiverEmail: 'fgsfds123@mail.ru',
  theme: '',
  textarea: ''
};

class SendsayForm extends React.Component { 
  render () {
    const myform = (props) => {
      const {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        isValid,
        touched,
        errors,
} = props;
      return (
        <Form noValidate onSubmit={handleSubmit} className="sendform_form">
          <Form.Label className="sendform__label">От кого</Form.Label>
          <Form.Row>
            <Col className="sendform__compact-col">
              <Form.Group className="sendform__compact-formgroup" controlId="validationFormik01">
                <Form.Control
                  name="senderName"
                  value={values.senderName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.senderName && errors.senderName}
                  className="sendfrom__left-input"
                  placeholder="Имя" />
                <Form.Control.Feedback type="invalid">{errors.senderName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="sendform__compact-col">
              <Form.Group className="sendform__compact-formgroup" controlId="validationFormik02">
                <Form.Control
                  name="senderEmail"
                  type="email"
                  value={values.senderEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.senderEmail && errors.senderEmail}
                  className="sendfrom__right-input"
                  placeholder="Email" />
                <Form.Control.Feedback type="invalid">{errors.senderEmail}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Label className="sendform__label">Кому</Form.Label>
          <Form.Row>
            <Col className="sendform__compact-col">
              <Form.Group className="sendform__compact-formgroup" controlId="validationFormik03">
                <Form.Control
                  name="receiverName"
                  value={values.receiverName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.receiverName && errors.receiverName}
                  className="sendfrom__left-input"
                  placeholder="Имя" />
                <Form.Control.Feedback type="invalid">{errors.receiverName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col className="sendform__compact-col">
              <Form.Group className="sendform__compact-formgroup" controlId="validationFormik04">
                <Form.Control
                  name="receiverEmail"
                  type="email"
                  value={values.receiverEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.receiverEmail && errors.receiverEmail}
                  className="sendfrom__right-input"
                  placeholder="Email" />
                <Form.Control.Feedback type="invalid">{errors.receiverEmail}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} className="sendform__compact-formgroup" controlId="validationFormik05">
              <Form.Label className="sendform__label">Тема письма</Form.Label>
              <Form.Control
                name="theme"
                value={values.theme}
                onBlur={handleBlur}
                isInvalid={touched.theme && errors.theme}
                onChange={handleChange}
                placeholder="Тема" />
              <Form.Control.Feedback type="invalid">{errors.theme}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} className="sendform__compact-formgroup" controlId="validationFormik06">
              <Form.Label className="sendform__label">Сообщение</Form.Label>
              <Form.Control
                as="textarea"
                name="textarea"
                value={values.textarea}
                onBlur={handleBlur}
                isInvalid={touched.textarea && errors.textarea}
                onChange={handleChange}
                placeholder="Текст вашего сообщения"
                rows="4" />
              <Form.Control.Feedback type="invalid">{errors.textarea}</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <a href="#" className="sendform__attachfile" onClick="">📎 Прикрепить файл</a>
          </Form.Row>
          <Button
            variant="primary"
            type="submit"
            disabled={!isValid}
            className="sendform__submit"
            onClick={handleSubmit}>
              Отправить
          </Button>
        </Form>
      )
    }

    return (
      <Container> 
        <h1 className="sendform__header">Отправлялка сообщений</h1>
        <Formik
          initialValues={initialVals}
          validationSchema={validSchema}
          onSubmit={values => {
            this.props.onSend(values)
          }}
          render={myform}
        />
      </Container>
  )}
}

SendsayForm.propTypes = {
  sendStatus: PropTypes.number.isRequired,
  onSend: PropTypes.func.isRequired,
}

export default SendsayForm;
