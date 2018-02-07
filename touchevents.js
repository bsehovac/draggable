(function() {

  var passiveSupport = getPassiveSupport();
  var safariFix = false;
  
  this.TouchEvents = function(element, moveActive, passive) {
    var touch = this;

    if (!safariFix) {
      window.addEventListener('touchmove', function() {});
      safariFix = true;
    }

    touch.element = (typeof element === 'string') ?
      document.querySelector(element) :
      element;
    touch.passive = (typeof passive !== 'undefined' && passiveSupport) ?
      { passive: passive } :
      false;

    touch.start = function() {};
    touch.move = function() {};
    touch.end = function() {};

    var touchEvents = { start: 'touchstart', move: 'touchmove', end: 'touchend' };
    var mouseEvents = { start: 'mousedown', move: 'mousemove', end: 'mouseup' };

    touch.initEvents(mouseEvents, moveActive);
    touch.initEvents(touchEvents);
  };

  this.TouchEvents.prototype.initEvents = function(events, moveActive) {
    var touch = this;
    var istouch = (events.start == 'touchstart') ? true : false;

    if (!istouch && moveActive) {
      touch.element.addEventListener(events.start, start, false);
      touch.element.addEventListener(events.move, start, false);
      touch.element.addEventListener(events.end, start, false);
    }

    touch.element.addEventListener(events.start, start, false);

    function start(e) {
      var position= getPosition(e);
      e.x = position.x;
      e.y = position.y;
      touch.start(e, istouch);
      if (!istouch && moveActive) {
        window.addEventListener(events.move, move, touch.passive);
        window.addEventListener(events.end, end, false);
      }
    }

    function move(e) {
      var position= getPosition(e);
      e.x = position.x;
      e.y = position.y;
      touch.move(e, istouch);
    }

    function end(e) {
      var position= getPosition(e);
      e.x = position.x;
      e.y = position.y;
      touch.end(e, istouch);
      if (!istouch && moveActive) {
        window.removeEventListener(events.move, move, touch.passive);
        window.removeEventListener(events.end, end, false); 
      }
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
