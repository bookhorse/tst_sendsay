import React from 'react';
import PropTypes from 'prop-types';

const shortname = (str) => {
  const limit = 20;
  const split = str.split('.');
  if (!split.length) return str.substring(0, limit) + '...';
  let filename = split[split.length-2];
  const extension = split[split.length-1];
  if (filename.length > limit) {
    filename = filename.substring(0, limit) + '...';
  }
  return filename + (extension.length ? ('.' + extension) : '');
}

function FileItem({file, onDelete}) {
  const filename = shortname(file.name);

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(file);
  }

  return (
    <div className="file-item">
      <div className="file-item__icon"><span role="img" aria-label="paperclip">&#x1f4ce;</span></div>
      <div className="file-item__filename">{ filename }</div>
      <div className="file-item__del">
        <button 
          type="button"
          onClick={handleDelete}
          className="file-item__delbtn">
          <span role="img" aria-label="garbage can">&#x1f5d1;&#xfe0f;</span>Удалить</button>
      </div>
    </div>
  );
}

FileItem.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
}


export default FileItem;
