import React from 'react';

export default class Component extends React.Component {
  static defaultProps = {
    foo: 100
  };
  render() {
    return (
      <div>
        <p>Hello</p>
      </div>
    );
  }

  constructor() {
    this.state = {
      bar: 'bar'
    };
  }

  static propTypes = {
    foo: React.PropTypes.number
  }

  componentDidMount() {
      console.log(this.state.bar);
  }
}
