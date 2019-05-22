let mobilenet;
let classifier;
let video;
let label = "test";
let obj1Button;
let obj2Button;
let obj3Button;
let testButton;
let overlay = document.getElementById("overlay");

function setup() {
  createCanvas(320, 270);
  video = createCapture(VIDEO);
  video.elt.setAttribute("playsinline", "");
  video.hide();
  background(0);

  mobilenet = ml5.featureExtractor("MobileNet", () => {
    console.log("Model ready");
  });

  classifier = mobilenet.classification(video, () => {
    console.log("Webcam buffer ready");
  });
}

function draw() {
  background(0);
  image(video, 0, 0, 320, 240);
  fill(255);
  textSize(16);
  text(label, 10, height - 10);
}

obj1Button = document.getElementById("obj1b");
obj1Button = document.getElementById("obj2b");
obj2Button = document.getElementById("obj3b");
obj3Button = document.getElementById("trainb");

let obj1i = document.getElementById("obj1i");
let obj2i = document.getElementById("obj2i");
let obj3i = document.getElementById("obj3i");


obj1Button.addEventListener("click", () => {
  classifier.addImage(obj1i.value);
});

obj2Button.addEventListener("click", () => {
  classifier.addImage(obj2i.value);
});

obj3Button.addEventListener("click", () => {
  classifier.addImage(obj3i.value);
});

obj3Button.addEventListener("click", () => {
  console.log("hi");
  toggleOverlay(0);

  classifier.train(loss => {
    if (loss == null) {
      toggleOverlay(1);
      classifier.classify(gotResults);
    }
  });
});

function gotResults(err, res) {
  label = res;
  classifier.classify(gotResults);
}

function toggleOverlay(s){
    if(s == 0)
    {
        overlay.classList.add('show');
        overlay.classList.remove('hide');
    }else {
        overlay.classList.remove('show');
        overlay.classList.add('hide');
    }
}

window.addEventListener('load', ()=> overlay.classList.add('hide'))