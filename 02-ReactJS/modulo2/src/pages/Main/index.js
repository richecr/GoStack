import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import { Container, Form, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      loading: false,
      repos: [],
    };
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repos } = this.state;

    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name,
    };

    this.setState({
      repos: [...repos, data],
      newRepo: '',
      loading: false,
    });
  };

  render() {
    const { newRepo, repos, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {repos.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <a href="#a">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
