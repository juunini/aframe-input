import type { Side } from './constants';
import { SIDES } from './constants';

const POSITION_Z = 0.004;

interface Schema {
  color: string;
  opacity: number;
  positionX: number;
}

AFRAME.registerComponent('input-cursor', {
  schema: {
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
    this.side[side].setAttribute('position', { x: 0, y: 0, z: side === 'front' ? POSITION_Z : -POSITION_Z });
    this.side[side].setAttribute('color', this.data.color);
    this.side[side].setAttribute('opacity', this.data.opacity);
    this.side[side].setAttribute('transparent', true);
    this.side[side].setAttribute('width', 0.1);
    this.side[side].setAttribute('height', 0.25);
    this.side[side].setAttribute('position', { x: this.data.positionX, y: 0, z: 0 });

    this.el.appendChild(this.side[side]);
  },

  update({
    color,
    opacity,
    positionX,
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
  },

  /** @private */ updateColor() {
    SIDES.forEach((side) => this.side[side].setAttribute('color', this.data.color));
  },
  /** @private */ updateOpacity() {
    SIDES.forEach((side) => this.side[side].setAttribute('opacity', this.data.opacity));
  },
  /** @private */ updatePositionX() {
    SIDES.forEach((side) => this.side[side].setAttribute('position', 'x', this.data.positionX));
  },
});

AFRAME.registerPrimitive('a-input-cursor', {
  defaultComponents: {
    'input-cursor': {},
  },
  mappings: {
    color: 'input-cursor.color',
    opacity: 'input-cursor.opacity',
  },
});

export default {};
