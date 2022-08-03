import 'aframe-troika-text';
import './a-input-text-box';
import './a-input-text';

AFRAME.registerComponent('aframe-input', {
  /** @private */ inputTextBox: document.createElement('a-input-text-box'),
  /** @private */ inputText: document.createElement('a-input-text'),

  schema: {
    value: { type: 'string', default: '' },
    font: { type: 'string', default: '' },
    width: { type: 'number', default: 5 },
    height: { type: 'number', default: 1 },
    backgroundColor: { type: 'color', default: '#FFF' },
    borderColor: { type: 'color', default: '#000' },
    borderWidth: { type: 'number', default: 0.1 },
  },

  init() {
    this.el.appendChild(this.inputTextBox);
    this.el.appendChild(this.inputText);
  },

  update() {
    this.inputText.setAttribute('value', this.data.value);
    this.inputText.setAttribute('font', this.data.font);
    this.inputTextBox.setAttribute('width', this.data.width);
    this.inputTextBox.setAttribute('height', this.data.height);
    this.inputTextBox.setAttribute('color', this.data.backgroundColor);
    this.inputTextBox.setAttribute('borderColor', this.data.borderColor);
    this.inputTextBox.setAttribute('borderWidth', this.data.borderWidth);
  },
});

AFRAME.registerPrimitive('a-input', {
  defaultComponents: {
    'aframe-input': {},
  },
  mappings: {
    value: 'aframe-input.value',
    font: 'aframe-input.font',
    width: 'aframe-input.width',
    height: 'aframe-input.height',
    'background-color': 'aframe-input.backgroundColor',
    'border-color': 'aframe-input.borderColor',
    'border-width': 'aframe-input.borderWidth',
  },
});

export default {};
