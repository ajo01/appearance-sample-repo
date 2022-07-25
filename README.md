# About

Welcome! This is the sample repository for vector appearances.
Here you will find information on the api, how to set the project up, and sample code for calling it.

Annotation appearances are a special way of rendering an annotation inside a PDF and can be useful in scenarios where users require custom annotations. Usually appearances involve rasterization, leading to blurriness of the annotation when you zoom in. Note that this library generates actual PDF drawing calls to create a PDF with vector graphics.

The createAppearance api allows a user to call canvas methods on a pdf to create appearances. It takes in a function containing canvas methods as a parameter and outputs a blob. A user can then optionally use the FileSaver dependency to convert the blob to a pdf and download it. The api uses modified versions of canvas2pdf and pdfkit under the hood, bundled as the createAppearance.js file with Webpack.

## Project structure

The api folder contains the bundled dependencies for the createAppearance api.

The src folder contains the script.js and draw.js file. The draw.js file is where you can try adding your own functions to add as parameters in the createAppearance api while the script.js is where the api is actually being called.

The dist folder contains the bundled file of the script.js file. The index.html file relies on the customer.js bundle and you will have to run the build command every time you make changes to the script.js file to see changes reflected.

## Commands

### setup

```bash
npm i
```

You can then use vscode live server or http-server to run the project.

### build

Run this every time you change the script.js file. This will update the customer.js bundle file used in index.html

```bash
npm run build
```

### step by step summary

1. Run `npm i`
2. Update the draw function in script.js file
3. Run `npm run build`
4. Open live server or http-server

Expected behavior: The website should automatically download a pdf with an annotation you had drawn with canvas methods. The annotation should have vector image quality.

## Sample code

Example 1: Simple Rectangle

```js
const draw = (ctx) => {
  ctx.fillStyle = "red";
  ctx.lineWidth = "20";
  ctx.strokeStyle = "black";
  ctx.rect(100, 100, 200, 200);
  ctx.fill();
  ctx.stroke();
};
```

<img width="427" alt="case1" src="https://user-images.githubusercontent.com/70789275/180508517-e48233e8-b740-4fe3-a120-4b8db90edc70.png">

Example 2: Gradient circle patterns

```js
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
```

<img width="450" alt="case2" src="https://user-images.githubusercontent.com/70789275/180508978-1b147c6d-746a-4ae9-a58b-67f41dc2ee5b.png">

Example 3: ellipse hatch annotation

```js
const draw = (ctx) => {
  let width = 200;
  let height = 100;

  let X = 300;
  let Y = 300;

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
```

<img width="451" alt="case3" src="https://user-images.githubusercontent.com/70789275/180509024-53da7e29-13d7-4b01-a68e-c239280196d8.png">

Note: annotation for case 3 will not display correctly on Chrome. Please test on Safari.
