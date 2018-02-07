(function() {

  var passiveSupport = getPassiveSupport();
  
  this.TouchEvents = function(element, passive, getPosition) {
    var touch = this;

    touch.element = element;
    touch.passive = (typeof passive !== 'undefined' && passiveSupport) ?
      { passive: passive } : false;

    touch.start = function() {};
    touch.move = function() {};
    touch.end = function() {};

    var touchEvents = { start: 'touchstart', move: 'touchmove', end: 'touchend' };
    var mouseEvents = { start: 'mousedown', move: 'mousemove', end: 'mouseup' };

    touch.initEvents(mouseEvents);
    touch.initEvents(touchEvents);
  };

  this.TouchEvents.prototype.initEvents = function(events) {
    var touch = this;
    var istouch = (events.start == 'touchstart') ? true : false;

    touch.element.addEventListener(events.start, start);

    function start(e) {
      e.position= getPosition(e);
      touch.start(e, istouch);
      document.addEventListener(events.move, move, touch.passive);
      document.addEventListener(events.end, end);
    }

    function move(e) {
      e.position = getPosition(e);
      touch.move(e, istouch);
    }

    function end(e) {
      e.position = getPosition(e);
      touch.end(e, istouch);
      document.removeEventListener(events.move, move, touch.passive);
      document.removeEventListener(events.end, end); 
    }
  };

  function getPosition(e) {
    e = event.changedTouches ? event.changedTouches[0] : e;
    return { x: e.pageX, y: e.pageY };
  }

  function getPassiveSupport() {
    var passiveSupported = false;

    try {
      var options = Object.defineProperty({}, 'passive', {
        get: function() {
          passiveSupported = true;
        }
      });
      window.addEventListener('test', options, options);
      window.removeEventListener('test', options, options);
    } catch(err) {
      passiveSupported = false;
    }

    return passiveSupported;
  }

})();
