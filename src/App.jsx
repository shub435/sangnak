import React, { useRef, useEffect } from "react";
import "./style.css";

const App = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }, []);

  window.addEventListener("resize", () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    addRect();
  });
  
  function addRect() {
    let canvas = canvasRef.current;
    // console.log(canvas);
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let state = {
      x: canvas.width / 2,
      y: 100,
      w: window.innerWidth / 8,
      h: window.innerHeight / 8,
    };
    let input = document.querySelector("input");

    for (let j = 1; j < input.value + 1; j++) {
      let { x, y, w, h } = state;
      if (j === 1) {
        x = canvas.width / 2 - w / 2;
        new Rectangle(x, y, w, h);
      } else if (j === 2) {
        x = canvas.width / 4 - w / 3;
        y += 250;

        for (let i = 1; i <= 3; i++) {
          new Rectangle(x, y, w, h);
          x += w + 200;
        }
      } else if (j === 3) {
        x = canvas.width / 2 + w / 2;
        y += 500;
        for (let i = 1; i <= 2; i++) {
          new Rectangle(x, y, w, h);
          x += w + 200;
        }
      }
    }

    function Rectangle(x, y, w, h) {
      ctx = canvas.getContext("2d");
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.strokeStyle = "black";
      ctx.fillRect(x, y, w, h);
      ctx.fill();
      ctx.stroke();
      console.log(x, y, w, h);
      ctx.fillStyle = "black";
      ctx.font = "bold 9pt Verdana";
      ctx.textAlign = "center";
      let text = `[${x.toFixed(2)}, ${y.toFixed(2)}]`;
      ctx.fillText(text, x + w / 2, y + h / 2);
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.fillRect(x + w / 2 - h / 4, y - h / 4, w / 4, h / 4);
      ctx.fillStyle = "rgba(255,255,255,0.5)";

      ctx.fillRect(x + w / 2 - h / 4, y + h, w / 4, h / 4);

      ctx.fill();
      ctx.stroke();
    }
  }
  return (
    <>
    
      <div>
        <input type="number" />
        <button onClick={addRect}> click me </button>
      </div>

      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default App;
