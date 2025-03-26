const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size to window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Star class for hyperspace effect
class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2;
        this.speed = Math.random() * 15 + 5;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2})`;
    }

    update() {
        this.z -= this.speed;
        if (this.z <= 0) {
            this.reset();
        }
    }

    draw() {
        const x = (this.x - canvas.width / 2) * (1000 / this.z) + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * (1000 / this.z) + canvas.height / 2;
        const size = this.size * (1000 / this.z);
        
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create stars
const stars = Array(200).fill().map(() => new Star());

// Hyperspace effect
function drawHyperspace() {
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 0, 30, 0.8)');
    gradient.addColorStop(1, 'rgba(30, 0, 50, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw speed lines
    ctx.strokeStyle = 'rgba(100, 100, 255, 0.15)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    // Update and draw stars
    stars.forEach(star => {
        star.update();
        star.draw();
    });
}

// Use requestAnimationFrame for smooth animation
function animate() {
    drawHyperspace();
    requestAnimationFrame(animate);
}

animate();
