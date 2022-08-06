import type { Side } from './constants';
import { SIDES } from './constants';

const POSITION_Z = 0.004;

interface Schema {
  size: number;
  color: string;
  opacity: number;
  positionX: number;
}

AFRAME.registerComponent('input-cursor', {
  schema: {
    size: { type: 'number', default: 1 },
    color: { type: 'color', default: '#000' },
    opacity: { type: 'number', default: 0.5 },
    positionX: { type: 'number', default: 0 },
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
      x: this.data.positionX + (this.data.size * 0.05),
      y: 0,
      z: side === 'front' ? POSITION_Z : -POSITION_Z,
    });
    this.side[side].setAttribute('color', this.data.color);
    this.side[side].setAttribute('opacity', this.data.opacity);
    this.side[side].setAttribute('transparent', true);
    this.side[side].setAttribute('width', this.data.size * 0.01);
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
    positionX,
    size,
  }: Schema) {
    if (color !== this.data.color) {
      this.updateColor();
    }

    if (opacity !== this.data.opacity) {
      this.updateOpacity();
    }

    if (positionX !== this.data.positionX) {
      this.updatePositionX();
    }

    if (size !== this.data.size) {
      this.updateSize();
    }
  },

  /** @private */ updateColor() {
    SIDES.forEach((side) => this.side[side].setAttribute('color', this.data.color));
  },
  /** @private */ updateOpacity() {
    SIDES.forEach((side) => this.side[side].setAttribute('opacity', this.data.opacity));
    SIDES.forEach((side) => this.side[side].setAttribute('animation', 'from', this.data.opacity));
  },
  /** @private */ updatePositionX() {
    SIDES.forEach((side) => this.side[side].setAttribute('position', {
      x: this.data.positionX + (this.data.size * 0.05),
      y: 0,
      z: side === 'front' ? POSITION_Z : -POSITION_Z,
    }));
  },
  /** @private */ updateSize() {
    SIDES.forEach((side) => this.side[side].setAttribute('width', this.data.size * 0.01));
    SIDES.forEach((side) => this.side[side].setAttribute('position', {
      x: this.data.positionX + (this.data.size * 0.05),
      y: 0,
      z: side === 'front' ? POSITION_Z : -POSITION_Z,
    }));
  },
});

AFRAME.registerPrimitive('a-input-cursor', {
  defaultComponents: {
    'input-cursor': {},
  },
  mappings: {
    color: 'input-cursor.color',
    opacity: 'input-cursor.opacity',
    'position-x': 'input-cursor.positionX',
    size: 'input-cursor.size',
  },
});

export default {};
