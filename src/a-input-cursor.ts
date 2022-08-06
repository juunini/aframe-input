import type { Side } from './constants';
import { SIDES } from './constants';

const POSITION_Z = 0.004;

interface Schema {
  color: string;
  opacity: number;
  selectionStart: number;
  selectionEnd: number;
}

AFRAME.registerComponent('input-cursor', {
  schema: {
    color: { type: 'color', default: '#000' },
    opacity: { type: 'number', default: 0.5 },
    selectionStart: { type: 'number', default: 0 },
    selectionEnd: { type: 'number', default: 0 },
  },

  /** @private */ side: {
    front: document.createElement('a-plane'),
    back: document.createElement('a-plane'),
  },

  init() {
    SIDES.forEach((side) => this.initSide(side));
  },

  /** @private */ initSide(side: Side) {
    this.side[side].setAttribute('side', side);
    this.side[side].setAttribute('position', {
      x: this.data.selectionEnd,
      y: 0,
      z: side === 'front' ? POSITION_Z : -POSITION_Z,
    });
    this.side[side].setAttribute('color', this.data.color);
    this.side[side].setAttribute('opacity', this.data.opacity);
    this.side[side].setAttribute('transparent', true);
    this.side[side].setAttribute('width', this.data.selectionEnd - this.data.selectionStart + 0.01);
    this.side[side].setAttribute('height', 0.25);
    this.side[side].setAttribute('animation', {
      property: 'opacity',
      from: this.data.opacity,
      to: 0,
      loop: true,
      dur: 1000,
      dir: 'alternate',
    });

    this.el.appendChild(this.side[side]);
    this.el.setAttribute('visible', false);
  },

  update({
    color,
    opacity,
    selectionStart,
    selectionEnd,
  }: Schema) {
    if (color !== this.data.color) {
      this.updateColor();
    }

    if (opacity !== this.data.opacity) {
      this.updateOpacity();
    }

    if (selectionStart !== this.data.selectionStart) {
      this.selectionStart();
    }

    if (selectionEnd !== this.data.selectionEnd) {
      this.selectionEnd();
    }
  },

  /** @private */ updateColor() {
    SIDES.forEach((side) => this.side[side].setAttribute('color', this.data.color));
  },
  /** @private */ updateOpacity() {
    SIDES.forEach((side) => this.side[side].setAttribute('opacity', this.data.opacity));
    SIDES.forEach((side) => this.side[side].setAttribute('animation', 'from', this.data.opacity));
  },
  /** @private */ selectionStart() {
    SIDES.forEach((side) => this.side[side].setAttribute('width', this.data.selectionEnd - this.data.selectionStart + 0.01));
  },
  /** @private */ selectionEnd() {
    SIDES.forEach((side) => this.side[side].setAttribute('position', {
      x: this.data.selectionEnd,
      y: 0,
      z: side === 'front' ? POSITION_Z : -POSITION_Z,
    }));
    SIDES.forEach((side) => this.side[side].setAttribute('width', this.data.selectionEnd - this.data.selectionStart + 0.01));
  },
});

AFRAME.registerPrimitive('a-input-cursor', {
  defaultComponents: {
    'input-cursor': {},
  },
  mappings: {
    color: 'input-cursor.color',
    opacity: 'input-cursor.opacity',
    'selection-start': 'input-cursor.selectionStart',
    'selection-end': 'input-cursor.selectionEnd',
  },
});

export default {};
