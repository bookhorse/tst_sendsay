import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap'

const UploadBox = ({ onFilesChange }) => (
  <Container className="uploadbox">
    <input
      type="file"
      className="input-file"
      multiple
      name="uploadFiles"
      accept="image/*,.doc,.docx,.xls,.xlsx,application/pdf,application/zip" />

    <div className="uploadbox__text">
      <h1>Бросайте файлы сюда, я ловлю</h1>
      <p>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размеры файла до 5 МБ</p>
    </div>
  </Container>
);

UploadBox.propTypes = {
  onFilesChange: PropTypes.func.isRequired
}

export default UploadBox;
