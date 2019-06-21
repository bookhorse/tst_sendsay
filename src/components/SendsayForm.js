import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Form, Button, Container, Col } from 'react-bootstrap';
import UploadBox from './UploadBox';
import FilesList from './FilesList';
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
  senderName: 'sendsaytester',
  senderEmail: 'sendsaytester@hitler.rocks',
  receiverName: '',
  receiverEmail: 'fgsfds123@mail.ru',
  theme: '',
  textarea: ''
};

class SendsayForm extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      showUpload: false,
      files: []
    };
  }

  attachFile (_e) {
    this.setState({
      showUpload: true
    });
  }

  deleteFile (file) {
    const idx = this.state.files.indexOf(file);
    if (idx === -1) return;
    const newFiles = [...this.state.files];
    newFiles.splice(idx, 1);
    this.setState({
      files: newFiles
    })
  }

  pushFile(name, e) {
    const base64data = e.target.result.split(',')[1];
      
    const file = {
      name,
      data: base64data
    }
    this.setState({
      files: [...this.state.files, file]
    });
  }

  handleFiles (files) {
    this.setState({
      showUpload: false
    });
    // eslint-disable-next-line
    for (const [_, file] of Object.entries(files)) {
      const reader = new FileReader()
      reader.onload = this.pushFile.bind(this, file.name)
      reader.readAsDataURL(file)
    }
  }

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
            <FilesList files={this.state.files} onDelete={this.deleteFile.bind(this)} />
            { this.state.showUpload ? <UploadBox onFilesChange={this.handleFiles.bind(this)} /> : null }
          </Form.Row>
          <Form.Row>
            <Button type="button" className="sendform__attachfile"  onClick={this.attachFile.bind(this)}>
              <span role="img" aria-label="paperclip">📎</span>Прикрепить файл</Button>
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
      <Container className="sendform__rootcontainer"> 
        <h1 className="sendform__header">Отправлялка сообщений</h1>
        <Formik
          initialValues={initialVals}
          validationSchema={validSchema}
          onSubmit={values => {
            this.props.onSend(values, this.state.files)
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
