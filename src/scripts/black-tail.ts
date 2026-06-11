const totalImages: number = 19;
const fps: number = 12; 
const initialDuration: number = 1000 / fps; 
const svgsPath: string = '/black-cat/tail/'; 
const initialFrame: number = 0; 

const durationPerFrame: Record<number, number> = {
    0: 100,
    1: 100,
    2: 100,
    3: 10,
    4: 10,
    5: 10,
    6: 10,
    7: 100,
    8: 100,
    11: 1250,
};

let currentIndex: number = Math.max(0, Math.min(initialFrame - 1, totalImages - 1));
let svgCache: string[] = [];

const container = document.getElementById('tail-svg') as HTMLElement;

async function preloadSVGs(): Promise<void> {
    try {
        const promesas: Promise<string>[] = [];
        
        for (let i = 1; i <= totalImages; i++) {
            const url: string = `${svgsPath}${i}.svg`;
            
            promesas.push(
                fetch(url).then((res: Response) => {
                    if (!res.ok) throw new Error(`Not found SVG: ${i}.svg`);
                    return res.text();
                })
            );
        }

        svgCache = await Promise.all(promesas);
        
        if (container) {
            container.innerHTML = '';
            iniciarAnimacion();
        }

    } catch (error) {
        console.error("Error load SVGs:", error);
    }
}

function iniciarAnimacion(): void {
    function showNextFrame(): void {
        if (!container || svgCache.length === 0) return;

        container.innerHTML = svgCache[currentIndex];

        const duracionFrameActual = durationPerFrame[currentIndex] !== undefined 
            ? durationPerFrame[currentIndex] 
            : initialDuration;

        currentIndex = (currentIndex + 1) % totalImages;

        setTimeout(showNextFrame, duracionFrameActual);
    }

    showNextFrame();
}

preloadSVGs();