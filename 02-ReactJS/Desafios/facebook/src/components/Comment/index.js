import React from 'react';

import './index.css';

export default function Comment({ comment }) {
  return (
    <div className="div-comment">
      <div className="info-comment">
        <div className="img-author">
          <img src={ comment.author.avatar } alt="avatar do autor" />
        </div>

        <div className="div-content-comment">
          <p id="text">
            <strong id="name-author">{ comment.author.name }</strong> { comment.content }
          </p>
        </div>


      </div>
    </div>
  );
}
