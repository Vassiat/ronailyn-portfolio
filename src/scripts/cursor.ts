import styles from './cursor.module.css'
import { isMobileTouchDevice } from './utils';
import jingleBell from '../../public/jingle-bell.svg'

if (!isMobileTouchDevice()) {
    const body = document.body;
    
    body.addEventListener("mousedown", ()=>{
        body.classList.add("cursor-down")
    })

    body.addEventListener("mouseup", ()=>{
        body.classList.remove("cursor-down")
    })


    const complementCursor = document.createElement("div");

    const mouse = {
        x: 0,
        y: 0,
        current: {
            x: 0,
            y: 0,
        },
        currentAngle: 0,
        targetAngle: 100,
        animate: function() {
            const xDistance = this.x - this.current.x;
            const yDistance = this.y - this.current.y;

            const speed = Math.hypot(xDistance, yDistance);

            if (speed > 2) { 
                this.targetAngle = Math.atan2(yDistance, xDistance) * (180 / Math.PI) + 70;
            } else {
                this.targetAngle = 0; 
            }

            let angleDiff = this.targetAngle - (this.currentAngle || 0);
            angleDiff = ((angleDiff + 180) % 360 + 360) % 360 - 180;
            
            const rotationFriction = speed > 2 ? 0.15 : 0.04;
            this.currentAngle = (this.currentAngle || 0) + ((angleDiff) * rotationFriction);

            this.current.x += xDistance * 0.08;
            this.current.y += yDistance * 0.1;

            complementCursor.style.transform = 
                `
                    translate3d(${this.current.x}px, ${this.current.y}px, 0)
                    rotate(${this.currentAngle}deg)
                    `;
                    
            if (Math.abs(xDistance) < 0.05 && Math.abs(yDistance) < 0.05) {
                
                this.currentAngle = (this.currentAngle || 0) + ((angleDiff) * rotationFriction);
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

    fetch(jingleBell.src).then(async (response)=>{
        return await response.text();
    }).then((response)=>{
        complementCursor.innerHTML += response;
    })


    document.body.appendChild(complementCursor);
}
