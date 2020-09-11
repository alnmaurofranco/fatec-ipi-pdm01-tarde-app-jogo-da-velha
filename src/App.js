import React from "react";
import "./App.css";

class Tabuleiro extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quadrados: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleResetGame() {
    this.setState({ quadrados: [] });
  }

  handleRandomGame() {
    const quadrados = this.state.quadrados.slice();
    if (calculateWinner(quadrados)) {
      alert("Jogo já acabou");
      return;
    }
    while (true) {
      const random = Math.floor(Math.random() * 10);
      if (!quadrados[random]) {
        quadrados[random] = this.state.xIsNext ? "X" : "0";
        break;
      }
    }
    this.setState({
      quadrados: quadrados,
      xIsNext: !this.state.xIsNext,
    });
  }

  render() {
    const vencedor = calculateWinner(this.state.quadrados);
    let status;

    if (vencedor) {
      status = "Vencedor:" + vencedor;
    } else {
      status = "Jogador: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderizarQuadrado(0)}
          {this.renderizarQuadrado(1)}
          {this.renderizarQuadrado(2)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(3)}
          {this.renderizarQuadrado(4)}
          {this.renderizarQuadrado(5)}
        </div>
        <div className="board-row">
          {this.renderizarQuadrado(6)}
          {this.renderizarQuadrado(7)}
          {this.renderizarQuadrado(8)}
        </div>
        <button className="btn" onClick={() => this.handleResetGame()}>
          Reniciar
        </button>
        <button className="btn" onClick={() => this.handleRandomGame()}>
          Jogada Aleatoria
        </button>
      </div>
    );
  }

  renderizarQuadrado(i) {
    return (
      <Quadrado
        value={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  handleClick(i) {
    const quadrados = this.state.quadrados.slice();

    if (calculateWinner(quadrados)) {
      alert("Jogo já acabou");
      return;
    }

    if (quadrados[i]) {
      alert("Quadrado ocupado!");
      return;
    }

    quadrados[i] = this.state.xIsNext ? "X" : "0";
    this.setState({ quadrados: quadrados, xIsNext: !this.state.xIsNext });
  }
}

class Quadrado extends React.Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Jogo extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Tabuleiro />
        </div>
        <div className="game-info">
          <ol>{"Movimentos"}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
    return null;
  }
}

function App() {
  return <Jogo />;
}

export default App;
