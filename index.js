var originals = {};

mstub = function (object, method, callback) {
  if ('undefined' === typeof originals[object.modelName]) {
    originals[object.modelName] = {};
  }
    
  // Save original behaviour
  originals[object.modelName][method] = object.prototype[method] || object[method];
  
  if ('undefined' === typeof object[method]) {
    // Change behaviour with prototype
    object.prototype[method] = callback;
  } else {
    // Change behaviour
    object[method] = callback;
  }

};

exports.mstub = module.exports.mstub = mstub;

munstub = function (object, method) {
  // Unstub specific method
  if ('undefined' === typeof method) {
    for (var k in originals[object.modelName]) {
      if ('undefined' === typeof object[k]) {
        object.prototype[k] = originals[object.modelName][k];
      } else {
        object[k] = originals[object.modelName][k];
      }

      // Delete saved original behaviour
      delete originals[object.modelName][k];        
    }
  } else {
    // object.prototype[method] = originals[object.modelName][method];

    if ('undefined' === typeof object[method]) {
      object.prototype[method] = originals[object.modelName][method];
    } else {
      object[method] = originals[object.modelName][method];
    }
    // Delete saved original behaviour
    delete originals[object.modelName][method];
  }
};

exports.munstub = module.exports.munstub = munstub;