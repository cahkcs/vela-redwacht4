class Tetris {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this.createBoard(width, height);
    this.currentPiece = this.createPiece();
    this.currentPosition = { x: Math.floor(width / 2), y: 0 };
  }

  createBoard(width, height) {
    return Array.from({ length: height }, () => Array(width).fill(0));
  }

  createPiece() {
    const shapes = [
      [[1, 1], [1, 1]], // O
      [[0, 1, 0], [1, 1, 1]], // T
      [[1, 1, 1, 1]], // I
      [[1, 1, 0], [0, 1, 1]], // Z
      [[0, 1, 1], [1, 1, 0]], // S
      [[1, 1, 1], [0, 0, 1]], // L
      [[1, 1, 1], [1, 0, 0]] // J
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    return shape.map(row => row.slice());
  }

  moveDown() {
    if (this.isValidMove(this.currentPosition.x, this.currentPosition.y + 1)) {
      this.currentPosition.y++;
      return true;
    }
    return false;
  }

  moveLeft() {
    if (this.isValidMove(this.currentPosition.x - 1, this.currentPosition.y)) {
      this.currentPosition.x--;
    }
  }

  moveRight() {
    if (this.isValidMove(this.currentPosition.x + 1, this.currentPosition.y)) {
      this.currentPosition.x++;
    }
  }

  isValidMove(x, y) {
    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        if (this.currentPiece[i][j] !== 0) {
          const newX = x + j;
          const newY = y + i;
          if (newX < 0 || newX >= this.width || newY >= this.height || this.board[newY][newX] !== 0) {
            return false;
          }
        }
      }
    }
    return true;
  }

  lockPiece() {
    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        if (this.currentPiece[i][j] !== 0) {
          this.board[this.currentPosition.y + i][this.currentPosition.x + j] = 1;
        }
      }
    }
    this.currentPiece = this.createPiece();
    this.currentPosition = { x: Math.floor(this.width / 2), y: 0 };
  }

  clearLines() {
    let linesCleared = 0;
    for (let i = this.height - 1; i >= 0; i--) {
      if (this.board[i].every(cell => cell !== 0)) {
        this.board.splice(i, 1);
        this.board.unshift(Array(this.width).fill(0));
        linesCleared++;
      }
    }
  }

  checkGameOver() {
    return this.board[0].some(cell => cell !== 0);
  }

  getBoard() {
    const board = this.board.map(row => row.slice());
    for (let i = 0; i < this.currentPiece.length; i++) {
      for (let j = 0; j < this.currentPiece[i].length; j++) {
        if (this.currentPiece[i][j] !== 0) {
          board[this.currentPosition.y + i][this.currentPosition.x + j] = this.currentPiece[i][j];
        }
      }
    }
    return board;
  }
}

export default Tetris;