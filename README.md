<h1 align="center">AFRAME Input(WIP)</h1>

<p align="center">
  <img src="https://github.com/juunini/aframe-input/blob/main/assets/README.gif" alt="" />
  <br />
  <strong>Using input element in AFRAME!</strong>
</p>

<p align="center">
  <a href="https://npmjs.org/package/aframe-input">
    <img src="https://img.shields.io/npm/dt/aframe-input.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/aframe-input">
    <img src="https://img.shields.io/npm/v/aframe-input.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://www.jsdelivr.com/package/npm/aframe-input">
    <img src="https://data.jsdelivr.com/v1/package/npm/aframe-input/badge" alt="jsdelivr">
  </a>
  <a href="https://npmjs.com/package/aframe-input">
    <img src="https://img.shields.io/npm/l/aframe-input.svg?style=flat-square" alt="License"></a>
  </a>
</p>

## Caution

This library is not develope completed

## Demo

https://juunini.github.io/aframe-input

## Usage

```html
<html>
  <head>
    <script src="https://aframe.io/releases/1.3.0/aframe.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/aframe-input@latest/dist/aframe-input.min.js"></script>
  </head>
  <body>
    <a-scene cursor="rayOrigin: mouse;">
      <a-input
        position="0 1 -3"
        value="안녕, 세상!"
        font="https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@latest/Subset/SpoqaHanSansNeo/SpoqaHanSansNeo-Regular.woff"
      />
    </a-scene>
  </body>
</html>
```

## License

This program is free software and is distributed under an [MIT License](LICENSE).
