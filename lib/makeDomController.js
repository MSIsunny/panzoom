module.exports = makeDomController;

module.exports.canAttach = isDomElement;

function makeDomController(domElement, options) {
  var elementValid = isDomElement(domElement); 
  if (!elementValid) {
    throw new Error('panzoom requires DOM element to be attached to the DOM tree');
  }

  var owner = domElement.parentElement;
  domElement.scrollTop = 0;
  
  if (!options.disableKeyboardInteraction) {
    owner.setAttribute('tabindex', 0);
  }

  var api = {
    getBBox: getBBox,
    getOwner: getOwner,
    applyTransform: applyTransform,
  };
  
  return api;

  function getOwner() {
    return owner;
  }

  function getBBox() {
    // TODO: We should probably cache this?
    return  {
      left: 0,
      top: 0,
      width: domElement.clientWidth,
      height: domElement.clientHeight
    };
  }

  function applyTransform(transform) {
    // TODO: Should we cache this?
    // domElement.style.transformOrigin = '0 0 0';
    // domElement.style.transform = 'matrix(' +
    //   transform.scale + ', 0, 0, ' +
    //   transform.scale + ', ' +
    //   transform.x + ', ' + transform.y + ')';

    // Make transformOrigin from (0 0 0) to center.
    let width = domElement.clientWidth;
    let height = domElement.clientHeight;
    let tx = transform.x + (width / 2) * transform.scale - (width / 2);
    let ty = transform.y + (height / 2) * transform.scale - (height / 2);
    domElement.style.transformOrigin = `center`;
    domElement.style.transform = 'matrix(' +
        transform.scale + ', 0, 0, ' +
        transform.scale + ', ' +
        tx + ', ' + ty + ')';
  }
}

function isDomElement(element) {
  return element && element.parentElement && element.style;
}
