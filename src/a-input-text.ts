type Side = 'front' | 'back';
const SIDES: Side[] = ['front', 'back'];
const POSITION_Z = 0.0025;

interface Schema {
  value: string;
  color: string;
  font: string;
}

AFRAME.registerComponent('input-text', {
  schema: {
    value: { type: 'string', default: '' },
    color: { type: 'color', default: '#000' },
    font: { type: 'string', default: '' },
  },

  /** @private */ side: {
    front: document.createElement('a-troika-text'),
    back: document.createElement('a-troika-text'),
  },

  init() {
    SIDES.forEach((side) => this.initSide(side));
  },

  /** @private */ initSide(side: Side) {
    this.side[side].setAttribute('side', side);
    this.side[side].setAttribute('font', this.data.font);
    this.side[side].setAttribute('position', { x: 0, y: 0, z: side === 'front' ? POSITION_Z : -POSITION_Z });
    this.el.appendChild(this.side[side]);
  },

  update({
    value,
    color,
    font,
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
});

AFRAME.registerPrimitive('a-input-text', {
  defaultComponents: {
    'input-text': {},
  },
  mappings: {
    value: 'input-text.value',
    color: 'input-text.color',
    font: 'input-text.font',
  },
});

export default {};
