import React, { Component } from "react";

interface ChangingProgressProviderProps {
  interval?: number;
  values: any[];
  children: (value: any) => React.ReactNode;
}

interface ChangingProgressProviderState {
  valuesIndex: number;
}

class ChangingProgressProvider extends Component<
  ChangingProgressProviderProps,
  ChangingProgressProviderState
> {
  static defaultProps: Partial<ChangingProgressProviderProps> = {
    interval: 1000,
  };

  state: ChangingProgressProviderState = {
    valuesIndex: 0,
  };

  intervalId: number | null = null;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => ({
        valuesIndex: (prevState.valuesIndex + 1) % this.props.values.length,
      }));
    }, this.props.interval);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
