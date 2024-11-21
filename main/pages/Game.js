import { Router } from "../router/router.js"
import appState from "../state/appState.js";


class Ball {
    constructor(canvasHeight, x, y, angle, speed, color) {
        this.canvasHeight = canvasHeight
        // reset settings
        this.startX = x
        this.startY = y
        this.startAngle = angle
        // ball settings
        this.x = x
        this.y = y
        this.speed = speed
        this.angle = angle
        this.color = color
        this.vx = this.speed * Math.cos(this.angle)
        this.vy = this.speed * Math.sin(this.angle)
    }

    update() {
        this.x += this.vx
        this.y += this.vy

        if (this.y <= 0 || this.y >= this.canvasHeight) {
            this.xy = -this.vy
        }
    }

    bounceX() {
        this.vx = -this.vx
    }

    bounceY() {
        this.vy = -this.vy
    }

    setAngle(angle) {
        this.angle = angle
        // this.vx = Math.cos(this.angle) * this.speed
        this.vy = Math.sin(this.angle) * this.speed
    }

    reset() {
        this.x = this.startX
        this.y = this.startY
        this.angle = this.startAngle
        this.vx = this.speed * Math.cos(this.angle)
        this.vy = this.speed * Math.sin(this.angle)
    }
}

class Paddle {
    constructor(canvasHeight, x, y, speed, color, score = 0) {
        this.canvasHeight = canvasHeight
        // reset settings
        this.startX = x
        this.startY = y
        this.startSpeed = speed
        // paddle settings
        this.x = x
        this.y = y
        this.score = score
        this.speed = speed
        this.color = color
        this.direction = 0
    }

    move(direction) {
        this.direction = direction
    }

    stop() {
        this.direction = 0
    }

    updatePosition() {
        if (this.direction === -1 && this.y > 0) {
            this.y -= this.speed
        }
        if (this.direction === 1 && this.y < this.canvasHeight - 50) {
            this.y += this.speed
        }
    }

    reset() {
        this.x = this.startX
        this.y = this.startY
        this.speed = this.startSpeed
    }
}

class Engine {
    constructor(container) {
        this.container = container
        this.canvas = container.querySelector("canvas")
        this.leftText = container.querySelector(".text-left")
        this.rightText = container.querySelector(".text-right")
        this.leftScore = container.querySelector(".score-left")
        this.rightScore = container.querySelector(".score-right")
        this.countdownContainer = container.querySelector('.countdown-container');
        this.countdownElement = container.querySelector('#countdown');
        this.game = container.querySelector
        this.ctx = this.canvas.getContext("2d")

        this.socket = null
        this.player = appState.user
        this.opponent = {}
        this.continue = false
        this.winningScore = 1
        this.paddleWidth = 4
        this.paddleHeight = 50
        this.ballRadius = 4
        this.paddleSpeed = 3
        this.ballSpeed = 3
        
        this.remote = false

        this.leftPaddle = new Paddle(this.canvas.height, 0, (this.canvas.height - this.paddleHeight) / 2, this.paddleSpeed, 'white')
        this.rightPaddle = new Paddle(this.canvas.height, this.canvas.width - this.paddleWidth, (this.canvas.height - this.paddleHeight) / 2, this.paddleSpeed, 'white')
        this.ball = new Ball(this.canvas.height, this.canvas.width / 2, this.canvas.height / 2, Math.PI, this.ballSpeed, '#0d6efd')

        this.leftText.innerText = this.player.username
        this.rightText.innerText = 'Opponent'
        this.bindEvents()
    }

    init() {
        this.socket = new WebSocket('http://localhost:8000/ws/game/')
        
    }

    bindEvents() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'w') this.leftPaddle.move(-1)
            if (event.key === 's') this.leftPaddle.move(1)
            if (event.key === 'ArrowUp') this.rightPaddle.move(-1)
            if (event.key === 'ArrowDown') this.rightPaddle.move(1)
        })

        document.addEventListener('keyup', (event) => {
            if (event.key === 'w' || event.key === 's') this.leftPaddle.stop()
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') this.rightPaddle.stop()
        })
    }

    detectCollision() {
        if (this.ball.x - this.ballRadius <= this.leftPaddle.x + this.paddleWidth &&
            this.ball.y > this.leftPaddle.y && this.ball.y < this.leftPaddle.y + this.paddleHeight) {
            let hitPoint = (this.ball.y - this.leftPaddle.y) / this.paddleHeight;
            let angle = hitPoint * Math.PI;
            this.ball.setAngle(angle);
            this.ball.bounceX();
        }

        if (this.ball.x + this.ballRadius >= this.rightPaddle.x &&
            this.ball.y > this.rightPaddle.y && this.ball.y < this.rightPaddle.y + this.paddleHeight) {
            let hitPoint = (this.ball.y - this.rightPaddle.y) / this.paddleHeight;
            let angle = hitPoint * Math.PI;
            this.ball.bounceX();
            this.ball.setAngle(angle);
        }

        if (this.ball.x <= 0) {
            this.leftPaddle.score++;
            this.update()
            this.ball.reset();
        }

        if (this.ball.x >= this.canvas.width) {
            this.rightPaddle.score++;
            this.update()
            this.ball.reset()
        }

        if (this.ball.y <= 0 || this.ball.y >= this.canvas.height) {
            this.ball.bounceY();
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    start() {
        // this.startCountdown()
        this.continue = true
        this.ball.reset()
        this.leftPaddle.reset()
        this.rightPaddle.reset()
        this.update()
        this.loop()
    }

    draw() {
        // Ball
        this.ctx.beginPath()
        this.ctx.arc(this.ball.x, this.ball.y, this.ballRadius, 0, Math.PI * 2, false)
        this.ctx.fillStyle = this.ball.color
        this.ctx.fill()
        this.ctx.closePath()

        // Left Paddle
        this.ctx.fillStyle = this.leftPaddle.color
        this.ctx.fillRect(this.leftPaddle.x, this.leftPaddle.y, this.paddleWidth, this.paddleHeight)

        // Right Paddle
        this.ctx.fillStyle = this.rightPaddle.color
        this.ctx.fillRect(this.rightPaddle.x, this.rightPaddle.y, this.paddleWidth, this.paddleHeight)
    }

    stop() {
        this.pause()
        this.container.querySelector(".result-container").style.display = 'flex';
        this.container.querySelector("#newGame").onclick = function () {
            document.querySelector(".result-container").style.display = 'none'
            Router()
        }
    }

    pause() {
        this.continue = false
    }

    resume() {
        this.continue = true
    }

    update() {
        this.leftScore.innerText = this.leftPaddle.score
        this.rightScore.innerText = this.rightPaddle.score
        if (this.leftPaddle.score == this.winningScore || this.rightPaddle.score == this.winningScore) {
            this.stop()
        }
    }

    loop() {
        if (this.continue) {
            this.clear()
            this.leftPaddle.updatePosition()
            this.rightPaddle.updatePosition()
            this.detectCollision()
            this.ball.update()
            this.draw()
        }
        requestAnimationFrame(() => this.loop())
    }

    startCountdown() {
        let count = 3;
        this.updateCountdown(count);

        const countdownInterval = setInterval(() => {
            count--;
            if (count === 0) {
                clearInterval(countdownInterval);
                this.countdownContainer.style.display = 'none';
                this.resume()
            } else {
                this.updateCountdown(count);
            }
        }, 1000);
    }

    updateCountdown(count) {
        this.countdownElement.textContent = count;
    }
}

class GameManager {
    constructor(container) {
        this.game = new Engine(container)
        this.newGame = container.querySelector(".game-new")
        this.gameMode = this.newGame.querySelector(".form-select")
        this.playButton = this.newGame.querySelector("#play")
        this.playButton.addEventListener('click', () => {
            this.newGame.style.display = 'none'
            if (this.gameMode.value == "online")
                this.game.remote = true
            this.start()
        })
    }

    start() {
        this.game.start()
    }
}

function Game() {
    const container = document.createElement('div')
    container.classList.add('game-container')
    container.innerHTML = `
        <div class="game-area">
            <div class="game-new">
                <p>New Game</p>
                <select class="form-select" aria-label="Default select example">
                    <option value="offline">Offline</option>
                    <option value="online">Online</option>
                    <option value="ai">AI</option>
                </select>
                <button class="btn btn-primary" id="play">Play</button>
            </div>
            <div class="countdown-container">
                <div class="countdown-number" id="countdown"></div>
            </div>
            <div class="result-container">
                <p>Game Finished</p>
                <p class="game-result">You Won</p>
                <button class="btn btn-primary" id="newGame">New Game</button>
            </div>
            <div class="text-container">
                <span class="text-left"></span>
                <span class="score-left">0</span>
                -
                <span class="score-right">0</span>
                <span class="text-right"></span>
            </div>
            <canvas id="gameCanvas"></canvas>
        </div>
    `
    const game = new GameManager(container)
    // game.start()
    return container
}

export default Game