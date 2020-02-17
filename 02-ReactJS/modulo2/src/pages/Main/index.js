import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../components/Container';
import { Form, Input, SubmitButton, List } from './styles';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      newRepo: '',
      loading: false,
      repos: [],
      repoNotFound: false,
    };
  }

  // Carregar dados do localStorage
  componentDidMount() {
    const repos = localStorage.getItem('repos');

    if (repos) {
      this.setState({ repos: JSON.parse(repos) });
    }
  }

  // Salvar os dados no localStorage
  componentDidUpdate(props, prevState) {
    const { repos } = this.state;

    if (prevState.repos !== repos) {
      localStorage.setItem('repos', JSON.stringify(repos));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repos } = this.state;

    try {
      const response = await api.get(`/repos/${newRepo}`);
      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repos: [...repos, data],
        newRepo: '',
        loading: false,
        repoNotFound: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      this.setState({ repoNotFound: true });
    }
  };

  render() {
    const { newRepo, repos, loading, repoNotFound } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit}>
          <Input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
            repoNotFound={repoNotFound}
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
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
