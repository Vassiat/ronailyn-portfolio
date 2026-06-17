import styles from "./hero-scroll.module.css";

function initBG(){
    const section = document.querySelector(".hero-section .circles");
    const dotSpacing = 45;
    
    if (section) {
        // const width = section.clientWidth;
        const width = window.outerWidth;
        const height = section.clientHeight + 100;
    
        const cols = Math.floor(width / dotSpacing);
        const rows = Math.floor(height / dotSpacing);
    
        const centerX = cols / 2;
        const centerY = 1; 
    
        const maxDistance = Math.sqrt(centerX * centerX + rows * rows);
    
        const fragment = document.createDocumentFragment();
    
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const distX = x - centerX;
                const distY = y - centerY;
                const distance = Math.sqrt(distX * distX + distY * distY);
                
                const normalizedDist = distance / maxDistance;
    
                const minSize = 1;
                const maxSize = 83;
                const size = minSize + (normalizedDist * (maxSize - minSize));
    
                const maxDelay = 2.4; 
                const delay = normalizedDist * maxDelay;
    
                
                const circle = document.createElement("span");
                circle.classList.add(styles.circle);
                circle.style.setProperty("--delay", `${delay.toFixed(2)}s`);
    
                circle.style.setProperty("--size", `${size}px`);
                
                const speed = 1 - normalizedDist;
                circle.style.setProperty("--speed", speed.toFixed(2));
    
                circle.style.left = `${x * dotSpacing}px`;
                circle.style.top = `${y * dotSpacing}px`;
    
                fragment.appendChild(circle);
            }
        }
        
        section.appendChild(fragment);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    requestAnimationFrame(()=>setTimeout(initBG, 500))
})