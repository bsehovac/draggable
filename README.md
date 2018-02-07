# TouchEvents

Touch and Mouse Events with Passive Support.

## Usage

```javascript
var element = document.querySelector('#element');
var touchEvents = new TouchEvents(element, false);

touchEvents.start = function(e) {
  var x = e.position.x,
      y = e.position.y;
};

touchEvents.move = function(e) {
  e.preventDefault();
  var x = e.position.x,
      y = e.position.y;
};

touchEvents.end = function(e) {
  var x = e.position.x,
      y = e.position.y;
};
```
