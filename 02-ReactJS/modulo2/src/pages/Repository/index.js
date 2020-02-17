import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import api from '../../services/api';
import Container from '../../components/Container';
import { Loading, Owner, IssueList, StateFiler } from './styles';

export default class Repository extends Component {
  constructor() {
    super();
    this.state = {
      repository: {},
      issues: {},
      loading: true,
      stateFilter: 'open',
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { repo },
      },
    } = this.props;
    const repoName = decodeURIComponent(repo);

    const { stateFilter } = this.state;

    const [responseRepo, responseIssues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateFilter,
          per_page: 5,
        },
      }),
    ]);

    this.setState({
      repository: responseRepo.data,
      issues: responseIssues.data,
      loading: false,
    });
  }

  async changeStateIssues(state) {
    const { repository } = this.state;
    this.setState({ stateFilter: state });

    const issues = await api.get(
      `/repos/${repository.owner.login}/${repository.name}/issues`,
      {
        params: {
          state,
          per_page: 5,
        },
      }
    );

    this.setState({ issues: issues.data });
  }

  render() {
    const { repository, issues, loading } = this.state;

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
