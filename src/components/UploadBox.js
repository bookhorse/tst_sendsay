import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap'

class UploadBox extends React.Component {
  constructor(props) {
    super(props);

    this.fileinput = React.createRef();
  }
  
  handleClick() {
    this.fileinput.current.click();
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onFilesChange(e.dataTransfer.files);
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleInputChange(e) {
    this.props.onFilesChange(e.target.files)
  }

  render() {
    return (
      <>
        <input
          type="file"
          ref={this.fileinput}
          onChange={this.handleInputChange.bind(this)}
          className="uploadbox__fileinput"
          multiple
          name="uploadFiles"
          accept="image/*,.doc,.docx,.xls,.xlsx,application/pdf,application/zip" />
        <Container
          className="uploadbox"
          onClick={this.handleClick.bind(this)}
          onDrop={this.handleDrop.bind(this)}
          onDragOver={this.handleDragOver.bind(this)}
        >

          <div className="uploadbox__text">
            <h1>Бросайте файлы сюда, я ловлю</h1>
            <p>Мы принимаем картинки (jpg, png, gif), офисные файлы (doc, xls, pdf) и zip-архивы. Размеры файла до 5 МБ</p>
          </div>
        </Container>
      </>
    )}
}

UploadBox.propTypes = {
  onFilesChange: PropTypes.func.isRequired
}

export default UploadBox;
