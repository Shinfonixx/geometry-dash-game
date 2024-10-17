const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; // Ancho del canvas
canvas.height = 400; // Alto del canvas

let player = {
    x: 50, // Posición horizontal del jugador
    y: 350, // Posición vertical del jugador
    width: 30, // Ancho del jugador
    height: 30, // Alto del jugador
    gravity: 0.5, // Fuerza de gravedad
    velocityY: 0, // Velocidad vertical
    jumpForce: -10 // Fuerza del salto
};

let obstacles = []; // Array para almacenar obstáculos
let score = 0; // Puntuación
let gameSpeed = 2; // Velocidad del juego
let isGameOver = false; // Estado del juego
const obstacleGap = 150; // Espacio mínimo entre obstáculos

// Función para dibujar el jugador
function drawPlayer() {
    ctx.fillStyle = 'cyan'; // Color del jugador
    ctx.fillRect(player.x, player.y, player.width, player.height); // Dibuja el cuadrado
}

// Función para dibujar obstáculos
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.fillStyle = obstacle.color; // Color del obstáculo
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height); // Dibuja cada obstáculo
    });
}

// Función para actualizar la posición del jugador
function updatePlayer() {
    // Aplicar gravedad
    player.velocityY += player.gravity;
    player.y += player.velocityY;

    // Verificar si el jugador toca el suelo
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height; // Mantener en el suelo
        player.velocityY = 0; // Detener la caída
    }

    // Verificar colisión con obstáculos
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            isGameOver = true; // Termina el juego si colisiona
        }
    });
}

// Función para actualizar obstáculos
function updateObstacles() {
    // Generar nuevos obstáculos con un espacio mínimo entre ellos
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - obstacleGap) {
        const height = Math.random() * 40 + 10; // Altura del obstáculo (máx. 50)
        const width = Math.random() * 20 + 10; // Ancho del obstáculo (máx. 30)
        const y = canvas.height - height; // Posición Y del obstáculo

        obstacles.push({
            x: canvas.width,
            y: y,
            width: width,
            height: height,
            color: getRandomColor() // Color aleatorio para el obstáculo
        });
    }

    // Mover obstáculos
    obstacles.forEach(obstacle => {
        obstacle.x -= gameSpeed; // Mueve el obstáculo hacia la izquierda
    });

    // Filtrar obstáculos fuera del canvas
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

// Función para obtener un color aleatorio
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para actualizar la puntuación
function updateScore() {
    score++;
    document.getElementById('score').innerText = `Puntuación: ${score}`; // Actualiza la puntuación en pantalla
}

// Función para reiniciar el juego
function resetGame() {
    player.y = 350; // Reiniciar posición del jugador
    player.velocityY = 0; // Reiniciar velocidad vertical
    obstacles = []; // Reiniciar obstáculos
    score = 0; // Reiniciar puntuación
    isGameOver = false; // Reiniciar estado del juego
}

// Función para dibujar todo en el canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas
    drawPlayer(); // Dibujar jugador
    drawObstacles(); // Dibujar obstáculos

    // Verificar si el juego está en curso
    if (!isGameOver) {
        updatePlayer(); // Actualizar jugador
        updateObstacles(); // Actualizar obstáculos
        updateScore(); // Actualizar puntuación
    } else {
        ctx.fillStyle = 'white'; // Color del mensaje de game over
        ctx.font = '30px Arial';
        ctx.fillText('¡Juego Terminado!', canvas.width / 2 - 100, canvas.height / 2); // Mensaje de fin de juego
    }
}

// Función de salto
function jump() {
    if (player.y + player.height >= canvas.height) { // Si el jugador está en el suelo
        player.velocityY = player.jumpForce; // Aplicar fuerza de salto
    }
}

// Manejar la tecla de salto
window.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        jump(); // Salto al presionar la barra espaciadora
    }
});

// Loop de actualización
function gameLoop() {
    draw(); // Dibujar todo
    requestAnimationFrame(gameLoop); // Llamar a la siguiente actualización
}

// Iniciar el juego
gameLoop();

// Función para reiniciar el juego al hacer clic en el botón
document.getElementById('restartButton').addEventListener('click', resetGame);