import styles from './typewriter.module.css'

const targets = document.querySelectorAll('[data-typewriter-words]');
enum ANIMATIONTYPE {
    STAIR="stair",
    BUBBLE="bubble",
    FLOAT="float",
}

type animationTypes = {
    [key in ANIMATIONTYPE]: {
        cssProperty: string;
        static: string;
        enter: string;
        out: string;
    }
}

const animationTypes: animationTypes = {
    [ANIMATIONTYPE.STAIR]: {
        cssProperty: "translate",
        static: "0 0",
        enter: "0 100%",
        out: "0 -100%",
    },
    [ANIMATIONTYPE.BUBBLE]: {
        cssProperty: "transform",
        static: "scale(1)",
        enter: "scale(0)",
        out: "scale(0)",
    },
    [ANIMATIONTYPE.FLOAT]: {
        cssProperty: "translate",
        static: "0 1px",
        enter: "0 0%",
        out: "0 -1px",
    },
}

const defaultCurrentType = ANIMATIONTYPE.BUBBLE;
let currentType = defaultCurrentType;
let currentAnimationType = animationTypes[defaultCurrentType];
let changeType: ANIMATIONTYPE = currentType;

targets.forEach((el) => {
    const rawWords = el.getAttribute('data-typewriter-words');
    const wordType = el.getAttribute('data-typewriter-type');
    el.innerHTML = "";

    if (!rawWords) return;

    const words = rawWords.split(',').map(p => p.trim())

    const longestWord = words.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    })

    const fallbackWord = document.createElement("div")
    fallbackWord.textContent = longestWord;
    fallbackWord.style.visibility = "hidden"
    fallbackWord.style.opacity = "0"
    el.appendChild(fallbackWord)
        
    const wordsElements = words.map((word, i) => {
        const arrayWord = word.split("");
        const wordEl = document.createElement("span");
        let lastCharWide = 0;

        if (i !== 0) {
            wordEl.style.visibility = "hidden";
        }

        wordEl.classList.add(styles.wordElement);

        arrayWord.forEach((char, i) => {
            const charEl = document.createElement("span");
            charEl.textContent = char;
            charEl.classList.add(styles.charElement);
            charEl.style.display = "inline-block";

            if (i % 2) {
                charEl.style.zIndex = "10";
            }
            
            
            wordEl.appendChild(charEl);
            requestAnimationFrame(() => {
                const width = charEl.getBoundingClientRect().width;
                lastCharWide += width;
                charEl.style.transition = 'none';
                charEl.style.setProperty(animationTypes[wordType].cssProperty, animationTypes[wordType].enter);
                    
                void charEl.offsetHeight; 
                    
                charEl.style.transition = '';
            });

        })

        el.appendChild(wordEl);
        
        return wordEl;
    })


    changeWords(wordsElements, wordType);

    const changeButton = document.createElement("button");
    changeButton.textContent = currentType.toUpperCase();
    changeButton.classList.add(styles.changeButton);

    const animationKeys = Object.values(ANIMATIONTYPE);

    changeButton.addEventListener("click", () => {
        changeType = currentType;
        const currentIndex = animationKeys.indexOf(changeType);
        
        const nextIndex = (currentIndex + 1) % animationKeys.length;
        
        changeType = animationKeys[nextIndex];
        
        changeButton.textContent = changeType.toUpperCase();
    });
    // el.insertAdjacentElement("afterend", changeButton);    
});

function animateChars(
    wordType: string,
    wordEl: HTMLElement,
    startIndex: number = 0,
    delayPerElement: number = 10,
    startFrame: number = 0,
    secondsForOut: number = 100,
    initialTranslate: string = currentAnimationType.static,
) {
    return new Promise((resolve) => {
        let index = startIndex;
        let currentFrame = startFrame;
        let translate = animationTypes[wordType].static;

        function animate() {
            const charElements = [...wordEl.childNodes] as HTMLElement[];
            
            if (currentFrame > 0 && currentFrame % delayPerElement === 0 && index < charElements.length) {
                charElements[index].style.setProperty(animationTypes[wordType].cssProperty, translate);
                index++;
            }
            currentFrame++;
            
            if (currentFrame - (charElements.length * delayPerElement) === secondsForOut) {
                index = 0;
                translate = animationTypes[wordType].out;
            }
            
            if (currentFrame - (charElements.length * delayPerElement) === secondsForOut + (charElements.length * delayPerElement)) {
                charElements.forEach((char) => {
                    char.style.transition = 'none';
                    wordEl.style.visibility = 'none';
                
                    void char.offsetHeight; 
                    
                    char.style.transition = '';
                });
                    
                return resolve(true);
            }
            
            requestAnimationFrame(animate);
        }

        animate();
    });
}

async function changeWords(wordsEls: HTMLElement[], wordType: string, index: number = 0) {
    const currentWord = wordsEls[index % wordsEls.length];
    if (wordType === ANIMATIONTYPE.FLOAT) {
        const letters = currentWord.querySelectorAll('span');

        letters.forEach((letter, index) => {
            letter.classList.add(styles.spanWave1);
            const delay = index * 0.1; 
            
            letter.style.setProperty('--delay', `${delay}s`);
        });
        return;
    }
    if (wordType === "float2") {
        const letters = currentWord.querySelectorAll('span');

        letters.forEach((letter, index) => {
            letter.classList.add(styles.spanWave2);
            const delay = index * 0.1; 
            
            letter.style.setProperty('--delay', `${delay}s`);
        });
        return;
    }
    currentWord.style.visibility = "visible";
    

    await requestAnimationFrame(async ()=>{
        const endWord = await animateChars(wordType, currentWord);

        index = index + 1 % wordsEls.length;
        if (endWord) {
            changeWords(wordsEls, wordType, index);
        }
    })
}
