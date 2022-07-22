# About

Welcome! This is the sample repository for vector appearances.
Here you will find information on the api, how to set the project up, and sample code for calling it.

The createAppearance api allows a user to call canvas methods to create a pdf with vector appearances. It
takes in a function containing canvas methods as a parameter and outputs a blob. A user can then optionally use the FileSaver dependency to convert the blob to a pdf and download it.

## Project structure

The api folder contains the bundled dependencies for the createAppearance api.

The src folder contains the index.js file. This is where you can try adding your own functions to add as parameters in the createAppearance api.

The dist folder contains the bundled file of the index.js file. You will have to run the build command every time you make changes to the index.js file to see changes reflected.

## Sample code

Example 1: Simple Rectangle

```
const draw = (ctx) => {
ctx.fillStyle = "red";
ctx.lineWidth = "20";
ctx.strokeStyle = "blue";
ctx.rect(100, 100, 200, 200);
ctx.fill();
ctx.stroke();
};

createAppearance(draw).then((res) => {
    saveAs(res, "example.pdf", true);
});
```

Example 2: Gradient circle patterns

```
const draw = (ctx) => {
  for (let i = 0; i < 12; i++) {
    for (let j = 0; j < 12; j++) {
      ctx.strokeStyle = `rgb(
    0,
    ${Math.floor(255 - 42.5 * i)},
    ${Math.floor(255 - 42.5 * j)})`;
      ctx.beginPath();
      ctx.arc(25 + j * 40, 25 + i * 40, 15, 0, Math.PI * 2, true);
      ctx.stroke();
    }
  }
};

createAppearance(draw).then((res) => {
    saveAs(res, "example.pdf", true);
});
```

Example 3: ellipse hatch annotation

```
const draws = (ctx) => {
  width = 200;
  height = 100;

  X = 300;
  Y = 300;

  const whRatio = width / height;
  ctx.save();
  ctx.translate(300 + ((1 - whRatio) * width) / 2, 300);
  ctx.scale(whRatio, 1);

  ctx.beginPath();
  ctx.arc(
    width * 0.5,
    height * 0.5,
    Math.max(height * 0.5, 0),
    0,
    Math.PI * 2,
    false
  );
  ctx.closePath();
  ctx.restore();
  ctx.clip();

  ctx.stroke();

  const hatchSize = 10;
  const hatchLineWidth = 1;
  ctx.lineWidth = hatchLineWidth;

  for (let i = Y; i < Y + height; i += hatchSize) {
    ctx.beginPath();
    ctx.moveTo(X, i);
    ctx.lineTo(X + width, i);
    ctx.stroke();
  }

  for (let i = X; i < X + width; i += hatchSize) {
    ctx.beginPath();
    ctx.moveTo(i, Y);
    ctx.lineTo(i, Y + height);
    ctx.stroke();
  }
};

createAppearance(draw).then((res) => {
    saveAs(res, "example.pdf", true);
});
```

# Commands

## setup

`npm i`

You can then use vscode live server or http-server to run the project.

## build

Run this every time you change the index.js file. This will update the customer.js bundle file used in index.html

`npm run build`