import React from 'react';
import PropTypes from 'prop-types';
// import { Row } from 'react-bootstrap'
import FileItem from './FileItem';

function MessageList({files, onDelete}) {
  const list = files.map((el, idx) => (
    <FileItem file={el} key={idx} onDelete={onDelete} />
  ))

  return (
    <>
      { list }
    </>
  );
}

MessageList.propTypes = {
  files: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired
}


export default MessageList;
