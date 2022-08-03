type Side = 'front' | 'back';
const SIDES: Side[] = ['front', 'back'];

interface Schema {
  width: number;
  height: number;
  color: string;
  borderColor: string;
  borderWidth: string;
}

AFRAME.registerComponent('input-text-box', {
  schema: {
    width: { type: 'number', default: 5 },
    height: { type: 'number', default: 1 },
    color: { type: 'color', default: '#FFF' },
    borderColor: { type: 'color', default: '#000' },
    borderWidth: { type: 'number', default: 0.1 },
  },

  /** @private */ side: {
    front: document.createElement('a-plane'),
    back: document.createElement('a-plane'),
  },
  /** @private */ border: document.createElement('a-plane'),

  init() {
    this.initBorder();
    this.initSide('front');
    this.initSide('back');
  },

  /** @private */ initBorder() {
    this.border.setAttribute('side', 'double');
    this.border.setAttribute('width', this.data.width + this.data.borderWidth);
    this.border.setAttribute('height', this.data.height + this.data.borderWidth);
    this.el.appendChild(this.border);
  },

  /** @private */ initSide(side: Side) {
    this.side[side].setAttribute('side', side);
    this.side[side].setAttribute('position', { x: 0, y: 0, z: side === 'front' ? 0.001 : -0.001 });
    this.side[side].setAttribute('color', this.data.color);
    this.side[side].setAttribute('width', this.data.width);
    this.side[side].setAttribute('height', this.data.height);
    this.el.appendChild(this.side[side]);
  },

  update({
    width,
    height,
    color,
    borderColor,
    borderWidth,
  }: Schema) {
    if (width !== this.data.width) {
      this.updateWidth();
      this.updateBorderWidth();
    }

    if (height !== this.data.height) {
      this.updateHeight();
      this.updateBorderHeight();
    }

    if (color !== this.data.color) {
      this.updateColor();
    }

    if (borderColor !== this.data.borderColor) {
      this.updateBorderColor();
    }

    if (borderWidth !== this.data.borderWidth) {
      this.updateBorderWidth();
      this.updateBorderHeight();
    }
  },

  /** @private */ updateBorderWidth() {
    this.border.setAttribute('width', this.data.width + this.data.borderWidth);
  },
  /** @private */ updateBorderHeight() {
    this.border.setAttribute('height', this.data.height + this.data.borderWidth);
  },
  /** @private */ updateWidth() {
    SIDES.forEach((side) => this.side[side].setAttribute('width', this.data.width));
  },
  /** @private */ updateHeight() {
    SIDES.forEach((side) => this.side[side].setAttribute('height', this.data.height));
  },
  /** @private */ updateColor() {
    SIDES.forEach((side) => this.side[side].setAttribute('color', this.data.color));
  },
  /** @private */ updateBorderColor() {
    this.border.setAttribute('color', this.data.borderColor);
  },
});

AFRAME.registerPrimitive('a-input-text-box', {
  defaultComponents: {
    'input-text-box': {},
  },
  mappings: {
    width: 'input-text-box.width',
    height: 'input-text-box.height',
    color: 'input-text-box.color',
    'border-color': 'input-text-box.borderColor',
    'border-width': 'input-text-box.borderWidth',
  },
});

export default {};
