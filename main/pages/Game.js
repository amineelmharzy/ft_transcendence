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

        // this.socket = null
        this.player = appState.user
        this.opponent = {}
        this.continue = false
        this.winningScore = 3
        this.paddleWidth = 4
        this.paddleHeight = 50
        this.ballRadius = 4
        this.paddleSpeed = 1
        this.ballSpeed = 1

        // this.oppening = false
        // this.remote = false

        this.leftPaddle = new Paddle(this.canvas.height, 0, (this.canvas.height - this.paddleHeight) / 2, this.paddleSpeed, 'white')
        this.rightPaddle = new Paddle(this.canvas.height, this.canvas.width - this.paddleWidth, (this.canvas.height - this.paddleHeight) / 2, this.paddleSpeed, 'white')
        this.ball = new Ball(this.canvas.height, this.canvas.width / 2, this.canvas.height / 2, Math.PI, this.ballSpeed, '#0d6efd')

        this.leftText.innerText = "Player"
        this.rightText.innerText = 'Opponent'
        // this.init()
    }

    // init() {
    //     this.socket = new WebSocket('ws://localhost:8000/ws/game/')

    //     this.socket.onclose = function (e) {
    //         console.error('Chat socket closed unexpectedly');
    //     }

    //     this.socket.onmessage =  (e) => {
    //         const data = JSON.parse(e.data)
    //         this.opponent = data.opponent
    //         this.oppening = data.oppening
    //     }
    // }

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
        this.bindEvents()
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

class GameSession extends Engine {
    constructor(container) {
        super(container)
        this.socket = null;
        this.opening = false;
        this.isPlayerMoving = false
        this.init()
    }

    bindEvents() {
        this.playerPaddle = this.opening ? this.leftPaddle : this.rightPaddle
        this.opponentPaddle = this.opening ? this.rightPaddle : this.leftPaddle

        document.addEventListener('keydown', (event) => {
            this.isPlayerMoving = true
            if (event.key === 'w') this.playerPaddle.move(-1)
            if (event.key === 's') this.playerPaddle.move(1)
            if (event.key === 'ArrowUp') this.playerPaddle.move(-1)
            if (event.key === 'ArrowDown') this.playerPaddle.move(1)
        })

        document.addEventListener('keyup', (event) => {
            if (event.key === 'w' || event.key === 's') this.playerPaddle.stop()
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown') this.playerPaddle.stop()
            this.isPlayerMoving = false
        })
    }

    start() {
        // this.startCountdown()
        this.bindEvents()
        this.ball.reset()
        this.playerPaddle.reset()
        this.opponentPaddle.reset()
        this.update()
        this.loop()
    }

    detectCollision() {
        if (this.opening) {
            if (this.ball.x - this.ballRadius <= this.playerPaddle.x + this.paddleWidth &&
                this.ball.y > this.playerPaddle.y && this.ball.y < this.playerPaddle.y + this.paddleHeight) {
                let hitPoint = (this.ball.y - this.playerPaddle.y) / this.paddleHeight;
                let angle = hitPoint * Math.PI;
                this.ball.setAngle(angle);
                this.ball.bounceX();
                // this.socket.send(JSON.stringify({ 'player': this.player.id, 'event': 'bounce', 'angle': angle }))
            }

            if (this.ball.x + this.ballRadius >= this.opponentPaddle.x &&
                this.ball.y > this.opponentPaddle.y && this.ball.y < this.opponentPaddle.y + this.paddleHeight) {
                let hitPoint = (this.ball.y - this.opponentPaddle.y) / this.paddleHeight;
                let angle = hitPoint * Math.PI;
                this.ball.bounceX();
                this.ball.setAngle(angle);
            }

        }
        else {
            if (this.ball.x - this.ballRadius <= this.opponentPaddle.x + this.paddleWidth &&
                this.ball.y > this.opponentPaddle.y && this.ball.y < this.opponentPaddle.y + this.paddleHeight) {
                let hitPoint = (this.ball.y - this.opponentPaddle.y) / this.paddleHeight;
                let angle = hitPoint * Math.PI;
                this.ball.setAngle(angle);
                this.ball.bounceX();
            }

            if (this.ball.x + this.ballRadius >= this.playerPaddle.x &&
                this.ball.y > this.playerPaddle.y && this.ball.y < this.playerPaddle.y + this.paddleHeight) {
                let hitPoint = (this.ball.y - this.playerPaddle.y) / this.paddleHeight;
                let angle = hitPoint * Math.PI;
                this.ball.bounceX();
                this.ball.setAngle(angle);
                // this.socket.send(JSON.stringify({ 'player': this.player.id, 'event': 'bounce', 'angle': angle }))
            }
        }
        if (this.ball.x <= 0) {
            if (this.opening) {
                this.playerPaddle.score++
                // this.socket.send(JSON.stringify({ 'player': this.player.id, 'event': 'point' }))
            } else {
                this.opponentPaddle.score++
            }
            this.update()
            this.ball.reset()
        }

        if (this.ball.x >= this.canvas.width) {
            if (this.opening) {
                this.opponentPaddle.score++
                // this.socket.send(JSON.stringify({ 'player': this.player.id, 'event': 'point' }))
            } else {
                this.playerPaddle.score++
            }
            this.update()
            this.ball.reset()
        }

        if (this.ball.y <= 0 || this.ball.y >= this.canvas.height) {
            this.ball.bounceY();
        }
    }

    init() {
        this.socket = new WebSocket('ws://localhost:8000/ws/game/')

        this.socket.onclose = function (e) {
            console.error('Chat socket closed unexpectedly');
        }

        this.socket.onmessage = (e) => {
            const data = JSON.parse(e.data)
            let event
            let player

            this.container.querySelector(".waiting-message").style.display = 'none'
            if (!this.continue) {

                this.opponent = data.opponent
                this.opening = this.opponent.id != this.player.id
                this.continue = true
                this.start()
            } else {
                event = data.event
                player = data.player
                if (player != this.player.id) {
                    if (event == 'move') {
                        if (player.id != this.player.id) {
                            console.log("bounceY => ", data.y)
                        }
                        this.opponentPaddle.y = data.y
                    }
                }
            }
        }
    }

    stop() {
        super.stop()
        this.socket.close()
    }

    updatePaddle() {
        let paddleY = this.playerPaddle.y
        this.playerPaddle.updatePosition()
        this.socket.send(JSON.stringify({ 'player': this.player.id, 'event': 'move', 'y': paddleY }))
    }

    loop() {
        if (this.continue) {
            this.clear()
            this.detectCollision()
            // if (this.isPlayerMoving) {
            this.updatePaddle()
            // }
            this.ball.update()
            this.draw()
        }
        requestAnimationFrame(() => this.loop())
    }
}

class GameManager {
    constructor(container) {
        // this.game = new Engine(container)
        this.newGame = container.querySelector(".game-new")
        this.gameMode = this.newGame.querySelector(".form-select")
        this.playButton = this.newGame.querySelector("#play")
        this.waitingMessage = container.querySelector(".waiting-message")
        this.playButton.addEventListener('click', () => {
            this.newGame.style.display = 'none'
            this.waitingMessage.style.display = 'flex'
            this.game = new GameSession(container)
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
            <div class="waiting-message">
                <p>Waiting for Opponent...</p>
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

// Hello, am Amine 21 years old, Student at 1337 School Morocco, My Journey in Computer Science field started when i was 15 while scrolling over Facebook i find a post someone posts a sample python script a it has a lot of reactions on it, i actually didn't understand what was mean, and my English was not OK since it my first year to study it at school. i just react and continue scrolling but i was surprised after a while a lot of posts talking about programming but this time in Arabic and that's how my journey started even it's a small flame but affect all in my career, i started learning by YouTube courses but i didn't progress too much due to my school, after finish high school i joined the 1337 School, i accepted and it was the beginning of exploring and improving my self and now i complete the common core with it's complicated and interesting project that helps me create an big vision to this world with the ability of the problem solving and try to extract the best ways in those solvings.