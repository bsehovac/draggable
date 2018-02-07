# TouchEvents

Touch and Mouse events with passive scrolling support.

## Function

```javascript
TouchEvents(HTMLElement element, Boolean moveActive, Boolean passive)
```

- **element**: `HTMLElement` or `String`. String must be CSS Selector, and will get only first element of query.
- **moveActive**: If set to `true` mousemove listeners will fire always. If set to `false` move listener will fire only after mousedown. Default is `true`.
- **passive**: Set the `{ passive: true || false }` option to touchmove on supported browsers. If not specified option will not be passed to event listener.

## Usage

```javascript
var touchEvents = new TouchEvents('#element');

touchEvents.start = function(e) {
  // code
};

touchEvents.move = function(e) {
  // code
};

touchEvents.end = function(e) {
  // code
};
```

## Getting pageX and pageY

```javascript
var touchEvents = new TouchEvents('#element');

touchEvents.move = function(e) {
  var x = e.x,
      y = e.y;
};
```
