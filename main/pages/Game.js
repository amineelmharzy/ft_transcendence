class Game {
    constructor() {
        this.ballX = 0
        this.ballY = 0
        this.goUp = 0
        this.goDown = 0
        this.ballSpeed = 0
        
    }
}
// function Game() {
//     const container = document.createElement('div')
//     container.classList.add('game-area')
//     container.innerHTML = `
//         <div class="game-board">
//             <div class="paddle paddle-left"></div>
//             <div class="ball"></div>
//             <div class="paddle paddle-right"></div>
//         </div>
//     `

//     const leftPaddle = container.querySelector(".paddle-left")
//     const rightPaddle = container.querySelector(".paddle-right")

//     // leftPaddle.addEventListener('mousemove', () => {
//     //     leftPaddle.
//     // })
//     console.log(leftPaddle)
//     console.log(rightPaddle)
//     return container
// }

// export default Game