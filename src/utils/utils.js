// From the man himself, Mr. Paul Irish.
// The requestAnimationFrame polyfill
// Put it on window just to preserve its context
// without having to use .call
window._rAF = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         function(callback) {
           window.setTimeout(callback, 16);
         };
})();

window.reqFrame = function reqFrame(cb) {
  return function() {
    cb.apply(this, arguments);
  };
};
