import React, { Component } from 'react';

import Post from "../Post";

import './index.css';

export default class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Rick Elton",
          avatar: "https://avatars0.githubusercontent.com/u/25726888?s=460&v=4"
        },
        date: "15 Fev 2020",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Jośe Davi",
              avatar: "https://avatars1.githubusercontent.com/u/40031432?s=460&v=4"
            },
            content: "Não sei, espero ter ajudado :)"
          },
          {
            id: 2,
            author: {
              name: "Matheus Santana",
              avatar: "https://avatars3.githubusercontent.com/u/40031356?s=460&v=4"
            },
            content: "Esse Davi é um bosta mesmo hein"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "José Davi",
          avatar: "https://avatars1.githubusercontent.com/u/40031432?s=460&v=4"
        },
        date: "15 Fev 2020",
        content: "Pessoal, JavaScript é muito fácil slk",
        comments: [
          {
            id: 1,
            author: {
              name: "Rick Elton",
              avatar: "https://avatars0.githubusercontent.com/u/25726888?s=460&v=4"
            },
            content: "Sinal que não aprendeu direito"
          },
          {
            id: 2,
            author: {
              name: "Matheus Santana",
              avatar: "https://avatars3.githubusercontent.com/u/40031356?s=460&v=4"
            },
            content: "Cala a boca argentino"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Yuri Santos",
          avatar: "https://avatars0.githubusercontent.com/u/49256137?s=460&v=4"
        },
        date: "14 Fev 2020",
        content: "LEDA AUMENTOU MEU CRA",
        comments: [
          {
            id: 1,
            author: {
              name: "Rick Elton",
              avatar: "https://avatars0.githubusercontent.com/u/25726888?s=460&v=4"
            },
            content: "Ta querendo atenção, meu rei ?"
          },
          {
            id: 2,
            author: {
              name: "Vínicius Barbosa",
              avatar: "https://avatars2.githubusercontent.com/u/34755896?s=460&v=4"
            },
            content: "FMCC2, Cálculo 1 e 2 aumentou o meu tbm"
          }
        ]
      },
      {
        id: 4,
        author: {
          name: "Igor Silveira",
          avatar: "https://avatars3.githubusercontent.com/u/39952041?s=460&v=4"
        },
        date: "14 Fev 2020",
        content: "Sport só empta, mds. Vou é assistir basquete",
        comments: [
          {
            id: 1,
            author: {
              name: "Rick Elton",
              avatar: "https://avatars0.githubusercontent.com/u/25726888?s=460&v=4"
            },
            content: "E o São Paulo que só perde"
          }
        ]
      },
      {
        id: 5,
        author: {
          name: "Levi Gostozinho",
          avatar: "https://avatars0.githubusercontent.com/u/38697815?s=460&v=4"
        },
        date: "14 Fev 2020",
        content: "Vou ali dar uma voltinha com minha ferrari e já volto",
        comments: [
          {
            id: 1,
            author: {
              name: "Eduardo",
              avatar: "https://avatars1.githubusercontent.com/u/40031298?s=460&v=4"
            },
            content: "Você não era assim, tu piorasse, pelo menos chama os amiguinhos né"
          }
        ]
      },
    ]
  };

  render() {
    return (
      <div className="div-posts">
        { this.state.posts.map(post => <Post key={post.id} post={post} />) }
      </div>
    );
  }
}
