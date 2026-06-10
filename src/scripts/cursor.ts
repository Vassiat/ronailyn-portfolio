import styles from './cursor.module.css'

const complementCursor = document.createElement("div");

const mouse = {
    x: 0,
    y: 0,
    current: {
        x: 0,
        y: 0,
    },
    animate: function() {
        const xDistance = this.x - this.current.x;
        const yDistance = this.y - this.current.y;

        this.current.x += xDistance * 0.1;
        this.current.y += yDistance * 0.1;

        complementCursor.style.transform = `translate3d(${this.current.x}px, ${this.current.y}px, 0)`;

        if (Math.abs(xDistance) < 0.05 && Math.abs(yDistance) < 0.05) {
            this.animationActive = false;

            return;
        }

        requestAnimationFrame(this.animate.bind(this));
    },
    animationActive: false,
}
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (!mouse.animationActive) {
        mouse.animationActive = true;
        requestAnimationFrame(mouse.animate.bind(mouse));
    }
})

window.addEventListener('mouseover', (e) => {
    complementCursor.classList.add(styles.show);
})


complementCursor.classList.add(styles.complementCursor);
complementCursor.textContent = "✨";


document.body.appendChild(complementCursor);
