const carousel = document.querySelector('.carousel');
const slider = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
let direction = -1;
// alert(slide.length)
// console.log(carousel);


slider.style.width = `${100 * slide.length}%`;


const slideshow = (i) => {
    if (document.hidden) return; //preventing function from running when tab is in the background 
    if(i === 1) {
        if (direction === 1) {
            direction = -1;
            slider.prepend(slider.lastElementChild);
        }
        carousel.style.justifyContent = 'flex-start';
    }
    else if(i === -1) {
        if (direction === -1) {
            direction = 1;
            slider.appendChild(slider.firstElementChild);
        }
        carousel.style.justifyContent = 'flex-end';
    }
    slider.style.transform = `translate(${100 / slide.length * direction}%)`;
    
}


slider.addEventListener('transitionend', function () {
    // get the last element and append it to the front

    if (direction === 1) {
        slider.prepend(slider.lastElementChild);
    } else {
        slider.appendChild(slider.firstElementChild);
    }

    slider.style.transition = 'none';
    slider.style.transform = 'translate(0)';
    setTimeout(() => {
        slider.style.transition = 'all 0.5s';
    })
}, false);

//Stop the autoLoop from going forward at its normal interval times when the back/forward buttons are clicked
//in case the autoLoop is about to go forward and it jumps two images 
//Reset the interval instead and ensure smooth transition


function buttonResetTimer(i) {
    clearInterval(autoLoop);
    slideshow((i == 1) ? 1 : -1);
    autoLoop = setInterval(function() {slideshow(1)}, 4000);
}



//Keyboard navigation

const keyboardNav = (e) => {
    if (e.keyCode == "37") {
        buttonResetTimer(-1);

    } else if (e.keyCode == "39") {
        buttonResetTimer(1);
    }
}
window.addEventListener("keydown", keyboardNav);



let autoLoop = setInterval(function() {slideshow(1)}, 4000);

i = 1;
function startStopLoop() {
    if(i == 1) {
        i--;
        clearInterval(autoLoop);
        document.getElementById("playpause").innerHTML = "▶️";
    } else {
        i++;
        autoLoop = setInterval(function() {slideshow(1)}, 4000);
        document.getElementById("playpause").innerHTML = "⏸";
    }
}