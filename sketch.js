let beat;
let analyzer;

function preload() {
  beat = loadSound('beat.mp3');
}

function setup() {
  createCanvas(600, 400);

  analyzer = new p5.Amplitude();
  analyzer.setInput(beat);
}

function draw() {
  background(15, 20, 35, 10);

  let t = frameCount * 0.025;
  let x = width / 2 + sin(t) * 165;
  let y = height / 2 + sin(t * 1.4) * 95;

  let red = map(mouseX, 0, width, 60, 255);
  red = constrain(red, 60, 255);

  let volume = analyzer.getLevel();
  let pulse = volume * 180;

  noStroke();

  fill(red, 140, 255, 28);
  circle(x, y, 95 + pulse);

  let size = 32 + sin(t * 3) * 8 + pulse;
  fill(red, 140, 255, 175);
  circle(x, y, size);

  fill(255, 255, 255, 190);
  circle(x - 5, y - 5, 7);

  let x2 = width / 2 + sin(t + PI) * 165;
  let y2 = height / 2 + sin((t + PI) * 1.4) * 95;

  fill(150, 220, 255, 90);
  circle(x2, y2, 10);
}

async function mousePressed() {
  await userStartAudio();

  if (beat.isPlaying()) {
    beat.stop();
  } else {
    beat.loop();
  }
}
