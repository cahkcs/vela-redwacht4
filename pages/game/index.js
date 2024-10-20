import Tetris from '../../common/Tetris.js';
import router from '@system.router';
import i18n from '../../i18n/defaults.json';

export default {
  private: {
    tetris: null,
    gameBoard: null,
    isRunning: false,
    intervalId: null,
    startX: 0,
    startY: 0
  },
  methods: {
    startGame($evt) {
      if (!this.isRunning) {
        this.tetris = new Tetris(10, 20); // 10列，20行
        this.gameBoard = document.getElementById('gameBoard');
        this.gameBoard.innerHTML = '';
        this.renderBoard();
        this.intervalId = setInterval(() => {
          if (this.tetris.moveDown()) {
            this.renderBoard();
          } else {
            this.tetris.lockPiece();
            this.tetris.clearLines();
            this.renderBoard();
            if (this.tetris.checkGameOver()) {
              clearInterval(this.intervalId);
              this.isRunning = false;
              alert('游戏结束！');
            }
          }
        }, 500);
        this.isRunning = true;
        this.$refs.startButton.disabled = true;
        this.$refs.pauseButton.disabled = false;
        this.$refs.resetButton.disabled = false;
      }
    },

    pauseGame($evt) {
      if (this.isRunning) {
        clearInterval(this.intervalId);
        this.isRunning = false;
        this.$refs.startButton.disabled = false;
        this.$refs.pauseButton.disabled = true;
      }
    },

    resetGame($evt) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.$refs.startButton.disabled = false;
      this.$refs.pauseButton.disabled = true;
      this.$refs.resetButton.disabled = true;
      this.gameBoard.innerHTML = '';
    },

    renderBoard() {
      const board = this.tetris.getBoard();
      for (let y = 0; y < board.length; y++) {
        for (let x = 0; x < board[y].length; x++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.style.left = x * 20 + 'px';
          cell.style.top = y * 20 + 'px';
          cell.style.backgroundColor = board[y][x] ? 'white' : 'black';
          this.gameBoard.appendChild(cell);
        }
      }
    },

    handleTouchStart($evt) {
      this.startX = $evt.touches[0].clientX;
      this.startY = $evt.touches[0].clientY;
    },

    handleTouchMove($evt) {
      const currentX = $evt.touches[0].clientX;
      const currentY = $evt.touches[0].clientY;

      const deltaX = currentX - this.startX;
      const deltaY = currentY - this.startY;

      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 50) {
          this.tetris.moveRight();
          this.renderBoard();
        } else if (deltaX < -50) {
          this.tetris.moveLeft();
          this.renderBoard();
        }
      }
    },

    handleTouchEnd($evt) {
      this.startX = 0;
      this.startY = 0;
    }
  },
  mounted() {
    this.$refs.pauseButton.disabled = true;
    this.$refs.resetButton.disabled = true;
  }
}