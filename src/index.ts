import 'aframe-troika-text';
import './a-input-text-box';
import './a-input-text';

AFRAME.registerComponent('aframe-input', {
  /** @private */ inputTextBox: document.createElement('a-input-text-box'),
  /** @private */ inputText: document.createElement('a-input-text'),
  /** @private */ input: document.createElement('input'),

  schema: {
    value: { type: 'string', default: '' },
    font: { type: 'string', default: '' },
    width: { type: 'number', default: 5 },
    height: { type: 'number', default: 1 },
    backgroundColor: { type: 'color', default: '#FFF' },
    borderColor: { type: 'color', default: '#000' },
    borderWidth: { type: 'number', default: 0.1 },
    focusBorderColor: { type: 'color', default: '#719ECE' },
  },

  init() {
    this.el.appendChild(this.inputTextBox);
    this.el.appendChild(this.inputText);
    this.el.appendChild(this.input);

    this.setInputStyle();
    this.initInputEvent();
  },

  setInputStyle() {
    this.input.style.position = 'absolute';
    this.input.style.top = '-999px';
    this.input.style.left = '-999px';
  },

  initInputEvent() {
    this.el.addEventListener('click', () => this.input.focus());
    this.input.setAttribute('value', this.data.value);
    this.input.addEventListener(
      'focus',
      () => this.inputTextBox.setAttribute('border-color', this.data.focusBorderColor),
    );
    this.input.addEventListener(
      'blur',
      () => this.inputTextBox.setAttribute('border-color', this.data.borderColor),
    );
    this.input.addEventListener(
      'input',
      (e) => this.el.setAttribute('aframe-input', 'value', (e.target as any).value),
    );
  },

  update(oldData) {
    if (oldData.value !== this.data.value) {
      this.inputText.setAttribute('value', this.data.value);
    }

    if (oldData.font !== this.data.font) {
      this.inputText.setAttribute('font', this.data.font);
    }

    if (oldData.width !== this.data.width) {
      this.inputTextBox.setAttribute('width', this.data.width);
    }

    if (oldData.height !== this.data.height) {
      this.inputTextBox.setAttribute('height', this.data.height);
    }

    if (oldData.backgroundColor !== this.data.backgroundColor) {
      this.inputTextBox.setAttribute('color', this.data.backgroundColor);
    }

    if (oldData.borderColor !== this.data.borderColor) {
      this.inputTextBox.setAttribute('border-color', this.data.borderColor);
    }

    if (oldData.borderWidth !== this.data.borderWidth) {
      this.inputTextBox.setAttribute('border-width', this.data.borderWidth);
    }
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
    'focus-border-color': 'aframe-input.focusBorderColor',
  },
});

export default {};
