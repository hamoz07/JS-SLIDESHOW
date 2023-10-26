//^ get my images | Array.from (to use them later for creating a number of liS elements equals the images number)
const myImages = Array.from(
  document.querySelectorAll(".slideshow-container img")
);
// number of images
const imagesNums = myImages.length;
// starting slide for the user
let currentSlide = 2;
// get slide number
const slideNum = document.getElementById("showNo");
// get prev, next buttons
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

//onclick event of prev, next buttons

prevButton.onclick = prev;
nextButton.onclick = next;

// create ul element to display it later inside span.inicators
const ul = document.createElement("ul");
ul.setAttribute("id", "indicator-ul"); // select the children(li) and put class active on them [line 83]

// create liS equal to my imgs

for (let i = 1; i <= imagesNums; i++) {
  const liS = document.createElement("li");
  //^ setting Attribute data-index to use them for switching between imgs
  liS.setAttribute("data-index", i);
  //^ setting the text content of my liS accourding to my li elements
  liS.appendChild(document.createTextNode(i));
  //appending li in ul
  ul.appendChild(liS);
}
//appending ul in indicators span
document.getElementById("indicators").appendChild(ul);

// getting my ul

const createdUl = document.getElementById("indicator-ul");

const createdli = document.querySelectorAll("#indicator-ul li");

//& testing
console.log(createdli);

// getting my liS in an arrayn
const bullets = Array.from(createdli);

//^ iterating on evrey bullet to switch between my images by clicking on each one
// using forEach as a best practice that makes the code simpler and the same job at the same time
// I used createdli instead of bullets beacuse createdli already returns a NodeList
createdli.forEach((bullet) => {
    bullet.onclick = () => {
      //^ we can't use this instead of bullet because we already iterated each one of them to aplly this action 
    currentSlide = parseInt(bullet.getAttribute("data-index")); //this.getAttribute('data-index') = the value of each data-index
    checker();
  };
});

checker();

function next() {
  if (nextButton.classList.contains("disabled")) {
    return false;
  } else {
    currentSlide++;
    checker();
  }
}
// prev button function
function prev() {
  if (prevButton.classList.contains("disabled")) {
    //do nothing
  } else {
    currentSlide--;
    checker();
  }
}
// next button function

function checker() {
  //setting the current slide number according to my image length and the current slide
  slideNum.textContent = `slide ${currentSlide} of ${imagesNums}`;
  removeActiveClass();

  // putting active class on images
  myImages[currentSlide - 1].classList.add("active");
  // putting active class on liS
  createdUl.children[currentSlide - 1].classList.add("active");

  //checking if the current slide is the first slide
  if (currentSlide == 1) {
    // add disabled class on my prev button
    prevButton.classList.add("disabled");
  } else {
    // remove disabled class on my prev button
    prevButton.classList.remove("disabled");
  }

  //checking if the current slide is the last slide
  if (currentSlide == imagesNums) {
    // add disabled class on my next button
    nextButton.classList.add("disabled");
  } else {
    // remove disabled class on my next button
    nextButton.classList.remove("disabled");
  }
}

//removing active class on image and bullets
function removeActiveClass() {
  myImages.forEach((img) => {
    img.classList.remove("active");
  });

  bullets.forEach((li) => {
    li.classList.remove("active");
  });
}
