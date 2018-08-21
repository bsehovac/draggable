window.addEventListener('touchmove', function() {});

function extendObject( options, defaults ) {
  var extended = {}, key;

  for ( key in defaults )
    if ( defaults.hasOwnProperty( key ) )
      extended[key] = defaults[key];

  for ( key in options )
    if ( options.hasOwnProperty( key ) )
      extended[key] = options[key];

  return extended;
}

function TouchEvents( element, options ) {
  var t = this;

  options = extendObject((( typeof options !== 'undefined' ) ? options : {}), {
    passiveEvent: false,
    touchEvents: true,
    mouseEvents: true,
    useVector: false,
    convertPosition: false,
    start: function() {},
    drag: function() {},
    end: function() {},
    move: false,
  });

  t.options = options;

  t.position = ( typeof options.useVector === 'function' )
    ? new options.useVector()
    : { x: 0, y: 0 };

  t.converted = ( typeof options.useVector === 'function' )
    ? new options.useVector()
    : { x: 0, y: 0 };

  t.element = ( typeof element === 'string' )
    ? document.querySelector(element)
    : element;

  t.passive = { passive: options.passiveEvent };

  t.touch = null;

  t.functions = {

    start: function( event ) {
      t.getPosition( event );
      t.touch = (event.type == 'touchstart');
      options.start( event, t.position, t.converted, t.touch );
      window.addEventListener( (t.touch) ? 'touchmove' : 'mousemove', t.functions.drag, t.passive );
      window.addEventListener( (t.touch) ? 'touchend' : 'mouseup', t.functions.end, false );
    },

    drag: function( event ) {
      t.getPosition( event );
      options.drag( event, t.position, t.converted, t.touch );
    },

    end: function( event ) {
      t.getPosition( event );
      options.end( event, t.position, t.converted, t.touch );
      window.removeEventListener( (t.touch) ? 'touchmove' : 'mousemove', t.functions.drag, t.passive );
      window.removeEventListener( (t.touch) ? 'touchend' : 'mouseup', t.functions.end, false );
    },

    move: function( event ) {
      t.getPosition( event );
      options.move( event, t.position, t.converted, false );
    },

  };

   return t;
}

TouchEvents.prototype.init = function() {
  var t = this;

  t.element.addEventListener( 'touchstart', t.functions.start, false );
  t.element.addEventListener( 'mousedown', t.functions.start, false );

  if (typeof t.options.move === 'function')
    t.element.addEventListener( 'mousemove', t.functions.move, false );

  return t;
};

TouchEvents.prototype.dispose = function() {
  var t = this;

  t.element.removeEventListener( 'touchstart', t.functions.start, false );
  t.element.removeEventListener( 'mousedown', t.functions.start, false );

  if (typeof t.options.move === 'function')
    t.element.removeEventListener( 'mousemove', t.functions.start, false );

  return t;
};

TouchEvents.prototype.getPosition = function( event ) {
  var t = this;
  var offset = t.element.getBoundingClientRect();
  var e = event.changedTouches ? event.changedTouches[0] : event;

  t.position.x = e.pageX - offset.left;
  t.position.y = e.pageY - offset.top;
  
  if (t.options.convertPosition !== true) return;

  t.converted.x = ( t.position.x / t.element.offsetWidth ) * 2 - 1;
  t.converted.y = ( t.position.y / t.element.offsetHeight ) * 2 - 1;
};
