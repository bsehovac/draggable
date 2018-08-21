# TouchEvents

Touch and Mouse events with passive scrolling support.

## Function

```javascript
TouchEvents(HTMLElement element, Object options)
```

- **element**: `HTMLElement` or `String`. String must be CSS Selector, and will get only first element of query.

## Usage

```javascript
var touchEvents = new TouchEvents('#element', {
  start: function( event, position, converted, touch ),
  drag: function( event, position, converted, touch ),
  end: function( event, position, converted, touch ),
});
```

## Getting pageX and pageY

```javascript
var touchEvents = new TouchEvents('#element');

touchEvents.move = function(e) {
  var x = e.x,
      y = e.y;
};
```

## Disable document scrolling when dragging element

```javascript
var touchEvents = new TouchEvents('#element', false, false);

touchEvents.start = function(e) {
  // code
};

touchEvents.move = function(e) {
  e.preventDefault();
  // code
};

touchEvents.end = function(e) {
  // code
};
```
