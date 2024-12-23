// 종횡비를 고정하고 싶을 경우: 아래 두 변수를 0이 아닌 원하는 종, 횡 비율값으로 설정.
// 종횡비를 고정하고 싶지 않을 경우: 아래 두 변수 중 어느 하나라도 0으로 설정.
const aspectW = 4;
const aspectH = 3;
// html에서 클래스명이 container-canvas인 첫 엘리먼트: 컨테이너 가져오기.
const container = document.body.querySelector('.container-canvas');
// 필요에 따라 이하에 변수 생성.

let candles = []; //arrayList 생성

function setup() {
  // 컨테이너의 현재 위치, 크기 등의 정보 가져와서 객체구조분해할당을 통해 너비, 높이 정보를 변수로 추출.
  const { width: containerW, height: containerH } =
    container.getBoundingClientRect();
  // 종횡비가 설정되지 않은 경우:
  // 컨테이너의 크기와 일치하도록 캔버스를 생성하고, 컨테이너의 자녀로 설정.
  if (aspectW === 0 || aspectH === 0) {
    createCanvas(containerW, containerH).parent(container);
  }
  // 컨테이너의 가로 비율이 설정한 종횡비의 가로 비율보다 클 경우:
  // 컨테이너의 세로길이에 맞춰 종횡비대로 캔버스를 생성하고, 컨테이너의 자녀로 설정.
  else if (containerW / containerH > aspectW / aspectH) {
    createCanvas((containerH * aspectW) / aspectH, containerH).parent(
      container
    );
  }
  // 컨테이너의 가로 비율이 설정한 종횡비의 가로 비율보다 작거나 같을 경우:
  // 컨테이너의 가로길이에 맞춰 종횡비대로 캔버스를 생성하고, 컨테이너의 자녀로 설정.
  else {
    createCanvas(containerW, (containerW * aspectH) / aspectW).parent(
      container
    );
  }
  init();
  // createCanvas를 제외한 나머지 구문을 여기 혹은 init()에 작성.
}

// windowResized()에서 setup()에 준하는 구문을 실행해야할 경우를 대비해 init이라는 명칭의 함수를 만들어 둠.
function init() {
  candles = [];
  //랜덤위치 불꽃 여러개 생성
  const candleCount = 20;
  for (let i = 0; i < candleCount; i++) {
    const x = random(width * 0.1, width * 0.9);
    const y = random(height * 0.5, height * 0.9);
    const heightFactor = random(0.2, 0.4);
    const flameColor = color(random(200, 255), random(100, 200), 0);
    candles.push({x, y, heightFactor, flameColor});
  }
}

function draw() {
  background(30);
  //circle(mouseX, mouseY, 50);

  //촛대
  candles.forEach((candle) => {
    noStroke();
    fill(200);
    const candleWidth = 20;
    const candleHeight = height * candle.heightFactor;
    rect(candle.x - candleWidth / 2, candle.y - candleHeight,
      candleWidth, candleHeight);

      //불꽃
      const flameWobble = random(-5, 5);
      fill(candle.flameColor);
      ellipse(candle.x + flameWobble, candle.y - candleHeight, 50, 70);

      // 불꽃 가운데
      fill(255, 200, 0, 150);
      ellipse(candle.x + flameWobble, candle.y - candleHeight, 30, 50);

      // 불빛
      noFill();
      stroke(255, 200, 0, 50);
      strokeWeight(2);
      for (let i = 0; i < 10; i++) {
        ellipse(
          candle.x + flameWobble,
          candle.y - candleHeight,
          70 + i * 5,
          100 + i * 5
        );
      }
    });
  }
  

//마우스 움직임
function mouseMoved() {
  candles.forEach((candle) => {
    candle.x += (mouseX - width / 2) * 0.001;
    candle.y += (mouseY - height / 2) * 0.001;
  });
}
  
//마우스 클릭
function mousePressed() {
  candles.forEach((candle) => {
    candle.flameColor = color(random(200, 255), random(100, 200), 0);
  });
}

function windowResized() {
  // 컨테이너의 현재 위치, 크기 등의 정보 가져와서 객체구조분해할당을 통해 너비, 높이 정보를 변수로 추출.
  const { width: containerW, height: containerH } =
    container.getBoundingClientRect();
  // 종횡비가 설정되지 않은 경우:
  // 컨테이너의 크기와 일치하도록 캔버스 크기를 조정.
  if (aspectW === 0 || aspectH === 0) {
    resizeCanvas(containerW, containerH);
  }
  // 컨테이너의 가로 비율이 설정한 종횡비의 가로 비율보다 클 경우:
  // 컨테이너의 세로길이에 맞춰 종횡비대로 캔버스 크기를 조정.
  else if (containerW / containerH > aspectW / aspectH) {
    resizeCanvas((containerH * aspectW) / aspectH, containerH);
  }
  // 컨테이너의 가로 비율이 설정한 종횡비의 가로 비율보다 작거나 같을 경우:
  // 컨테이너의 가로길이에 맞춰 종횡비대로 캔버스 크기를 조정.
  else {
    resizeCanvas(containerW, (containerW * aspectH) / aspectW);
  }
  // 위 과정을 통해 캔버스 크기가 조정된 경우, 다시 처음부터 그려야할 수도 있다.
  // 이런 경우 setup()의 일부 구문을 init()에 작성해서 여기서 실행하는게 편리하다.
  // init();
}
