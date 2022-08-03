import './a-input-text-box';

AFRAME.registerComponent('a-input', {
  init() {
    this.el.innerHTML = '<a-input-text-box />';
  },
});

AFRAME.registerPrimitive('a-input', {
  defaultComponents: {
    'a-input': {},
  },
  mappings: {},
});

export default {};
