import type { Side } from './constants';
import { SIDES } from './constants';

const POSITION_Z = 0.0025;

interface Schema {
  value: string;
  color: string;
  font: string;
  align: string;
  positionX: number;
}

AFRAME.registerComponent('input-text', {
  schema: {
    value: { type: 'string', default: '' },
    color: { type: 'color', default: '#000' },
    font: { type: 'string', default: '' },
    align: { type: 'string', default: 'left' },
    positionX: { type: 'number', default: 0 },
  },

  /** @private */ side: {
    front: document.createElement('a-troika-text'),
    back: document.createElement('a-troika-text'),
  },
  /** @private */ width: 0,
  /** @private */ height: 0,

  init() {
    SIDES.forEach((side) => this.initSide(side));
  },

  /** @private */ initSide(side: Side) {
    this.side[side].setAttribute('side', side);
    this.side[side].setAttribute('font', this.data.font);
    this.side[side].setAttribute('position', { x: 0, y: 0, z: side === 'front' ? POSITION_Z : -POSITION_Z });
    this.side[side].setAttribute('anchor', this.data.align);
    this.el.appendChild(this.side[side]);
  },

  tick() {
    // @ts-ignore
    const { x, y } = this.side.front.object3DMap.mesh.geometry.boundingBox.max;
    this.width = x;
    this.height = y;
  },

  update({
    value,
    color,
    font,
    align,
    positionX,
  }: Schema) {
    if (color !== this.data.color) {
      this.updateColor();
    }

    if (value !== this.data.value) {
      this.updateValue();
    }

    if (font !== this.data.font) {
      this.updateFont();
    }

    if (align !== this.data.align) {
      this.updateAlign();
    }

    if (positionX !== this.data.positionX) {
      this.updatePositionX();
    }
  },

  /** @private */ updateValue() {
    SIDES.forEach((side) => this.side[side].setAttribute('value', this.data.value));
  },
  /** @private */ updateColor() {
    SIDES.forEach((side) => this.side[side].setAttribute('color', this.data.color));
  },
  /** @private */ updateFont() {
    SIDES.forEach((side) => this.side[side].setAttribute('font', this.data.font));
  },
  /** @private */ updateAlign() {
    SIDES.forEach((side) => this.side[side].setAttribute('anchor', this.data.align));
  },
  /** @private */ updatePositionX() {
    SIDES.forEach((side) => this.side[side].setAttribute('position', 'x', this.data.positionX));
  },
});

AFRAME.registerPrimitive('a-input-text', {
  defaultComponents: {
    'input-text': {},
  },
  mappings: {
    value: 'input-text.value',
    color: 'input-text.color',
    font: 'input-text.font',
    align: 'input-text.align',
    'position-x': 'input-text.positionX',
  },
});

export default {};
