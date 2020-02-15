import React from 'react';

import Comment from "../Comment";

import './index.css';

export default function Post({ post }) {
  return (
    <div className="div-post">
      <div className="info-post">
        <div className="img-author">
          <img src={ post.author.avatar } alt="avatar do autor" />
        </div>
        <div className="author">
          <strong id="name-author">{ post.author.name }</strong>
          <strong id="date-post">{ post.date }</strong>
        </div>
      </div>
      
      <div className="div-content">
        <p>{ post.content }</p>
      </div>
      
      <div id="divisor"></div>

      <div className="div-comments">
        { post.comments.map(comment => <Comment key={comment.id} comment={ comment } />) }
      </div>

    </div>
  );
}
