import React, { useCallback } from "react";
import Color from "color";

window.Color = Color;

const RatingCircle = ({
  width,
  value,
  color = "#32a852",
  children,
  id,
  className
}) => {
  const draw = useCallback(
    canvas => {
      if (!canvas) return;
      // Setup the canvas to display sharply
      // https://stackoverflow.com/a/46920541/5070971
      const diameter = width;
      const radius = diameter / 2;
      const pixelRatio = window.devicePixelRatio;
      canvas.width = pixelRatio * diameter;
      canvas.height = pixelRatio * diameter;
      canvas.style.width = diameter + "px";
      canvas.style.height = diameter + "px";

      console.log("Drawing..");

      const context = canvas.getContext("2d"); //to return drawing context on canvas
      context.scale(pixelRatio, pixelRatio);
      let loaded = 0; // use it for Amount loaded

      //here width and height is divided by two so to get our progressbar in middle.
      const cx = radius; // center of the box
      const cy = radius; // center of the box

      let angle = 0; //to load progress bar Slowly
      const barColor = Color(color);
      const barWidth = 6; //pixels

      // We will draw one background black circle a little bit larger
      // than the rating bar
      // then we draw another circle to be the shaded placeholder of the rating bar
      // then we draw the progress bar on top

      const animate = () => {
        // in this tick, how much should we draw of the circle in radians
        angle = (loaded / 100) * Math.PI * 2;

        // clear each redraw
        context.clearRect(0, 0, diameter, diameter);

        // Create the background circle
        context.beginPath();
        context.arc(cx, cy, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "#000"; // Set the fill color
        context.fill(); //Fill the arc path black

        // Draw the shaded placeholder
        context.beginPath();
        context.arc(cx, cy, radius - 5, 0, 2 * Math.PI, false);
        context.strokeStyle = barColor.darken(0.6).hex();
        context.lineWidth = barWidth;
        context.stroke();

        // Draw the Bar
        context.beginPath();

        // The arc top with ccw corresponds to angle 270 deg
        const start = (Math.PI * 3) / 2;
        context.arc(cx, cy, radius - barWidth, start, angle + start, false);
        context.strokeStyle = barColor.hex();
        context.lineWidth = barWidth;
        context.lineCap = "round";
        context.stroke();

        // Write the text indicator
        const fontSize = radius / 2.5;
        context.font = `${fontSize}px Segoe UI`; // specify the font
        context.fillStyle = "#fff";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(loaded + "%", cx - 1, cy + 1); //text value & text position

        // if we reached the target value, stop the animation
        if (loaded < value) window.requestAnimationFrame(animate);

        loaded++;
      };
      window.requestAnimationFrame(animate);
    },
    [value, width, color]
  );

  return (
    <div id={id} className={className} style={{ width, height: width }}>
      <canvas ref={draw} id="rating-circle-canvas" />
    </div>
  );
};

export default RatingCircle;
