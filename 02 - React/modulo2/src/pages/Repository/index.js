import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssueList, StateFiler, Paginacao } from './styles';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {
      repository: {},
      issues: {},
      loading: true,
      stateFilter: 'open',
      page: 1,
      lastPage: undefined,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { repo },
      },
    } = this.props;
    const repoName = decodeURIComponent(repo);

    const { stateFilter, page } = this.state;

    const [responseRepo, responseIssues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateFilter,
          page,
          per_page: 3,
        },
      }),
    ]);

    const lastPage = Number(
      responseIssues.headers.link
        .split('; rel="next", ')[1]
        .split('&page=')[1]
        .split('&')[0]
    );

    this.setState({
      repository: responseRepo.data,
      issues: responseIssues.data,
      loading: false,
      lastPage,
    });
  }

  async changeStateIssues(state) {
    const { repository, page } = this.state;
    this.setState({ stateFilter: state });

    const issues = await api.get(
      `/repos/${repository.owner.login}/${repository.name}/issues`,
      {
        params: {
          state,
          page,
          per_page: 3,
        },
      }
    );

    this.setState({ issues: issues.data });
  }

  async previousPage() {
    const { page, stateFilter } = this.state;

    if (page !== 1) {
      await this.setState({ page: page - 1 });
      this.changeStateIssues(stateFilter);
    }
  }

  async nextPage() {
    const { page, lastPage, stateFilter } = this.state;

    if (page !== lastPage) {
      await this.setState({ page: page + 1 });
      this.changeStateIssues(stateFilter);
    }
  }

  render() {
    const { repository, issues, loading, page, lastPage } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <StateFiler>
            <button
              type="button"
              onClick={() => this.changeStateIssues('open')}
            >
              Open
            </button>
            <button
              type="button"
              onClick={() => this.changeStateIssues('closed')}
            >
              Closed
            </button>
            <button type="button" onClick={() => this.changeStateIssues('all')}>
              All
            </button>
          </StateFiler>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} rel="noopener noreferrer">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
          <Paginacao>
            <button
              disabled={page === 1}
              type="button"
              onClick={() => this.previousPage()}
            >
              Anterior
            </button>
            <button
              disabled={page === lastPage}
              type="button"
              onClick={() => this.nextPage()}
            >
              Próximo
            </button>
          </Paginacao>
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }).isRequired,
};
