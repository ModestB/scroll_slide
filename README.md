# Scroll Slide

Simple slide show using only the mouse-wheel/touchpad scroll.


## Usage

```html

<div class="ss-container"> 
  <div class="ss-item active">
    <!-- content... -->
  </div>
  <div class="ss-item">
    <!-- content... -->
  </div>
  <!-- Add as many ss-items as you need. -->
</div>

```
```javascript
  //Initialize
  scrollSlide({
      container: '.ss-container', // Container of slides
      item: '.ss-item',           // Individual slides    
      animType: 'ss-move-up',     // Animation type
      duration: 1,                // Animation transition duration
      delay: 0,                   // Animation transition delay
      uncutMove: true,            // One slide immediately follows another
      dots: true                  // Adds slide indicator dots
  });

Animation types: ss-fade, ss-move-right, ss-move-left, ss-move-up, ss-move-down
```

## Preview

[modestas-bujanauskas/pen/exJwQq](https://codepen.io/collection/DLLxMW/)
