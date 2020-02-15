import React, { Component } from 'react';

// import { Container } from './styles';

import TechItem from "./TechItem";

class TechList extends Component {
  state = {
    techs: [],
    newTech: '',
  }

  // Executado sempre que esse componente é mostrado em tela.
  componentDidMount() {
    const techs = localStorage.getItem('techs');
    if (techs) {
      this.setState({ techs: JSON.parse(techs) });
    }
   }

  // Executado sempre que houver alterações nas props/states.
  componentDidUpdate(prevProps, prevState) {
    if (this.state.techs !== prevState) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  // Executado quando o componente deixa de existir.
  componentWillUnmount() {
  }

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  handleDelete = (tech) => {
    this.setState({ 
      techs: this.state.techs.filter(t => t !== tech) 
    })
  }

  render() {
    return (
      <>
        <ul>
          { this.state.techs.map(tech => 
            <TechItem 
              key={tech} 
              tech={tech}
              onDelete={this.handleDelete} 
            />
          )}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            onChange={this.handleInputChange}
            value={this.state.newTech}
            placeholder="Digite o nome de uma tecnologia"
          />
          <button type="submit">Cadastrar Tech</button>
        </form>
      </>
    );
  }
}

export default TechList;
