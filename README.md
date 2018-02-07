# TouchEvents

Touch and Mouse Events with Passive Support.

## Usage

```javascript
var element = document.querySelector('#element');
var touchEvents = new TouchEvents(element);

touchEvents.start = function(e) {
  var x = e.x, y = e.y;
  // mouse || touch start code
};

touchEvents.move = function(e) {
  e.preventDefault();
  var x = e.x, y = e.y;
  // mouse || touch move code
};

touchEvents.end = function(e) {
  var x = e.x, y = e.y;
  // mouse || touch end code
};
```

## Function

```javascript
TouchEvents(Element, Passive)
```

- Element: HTMLElement or String. String must be CSS Selector, and will get only first element of query.
- Passive: Pass the { passive: true } option to touchmove on supported browser, if not specified option will not be passed.
