# react-use-mouse-move
### Installation

This is a pluggable custom hook for React 16.8+.

```sh
$ npm install react-use-mouse-move
```

### About

Provides a reusable custom React hook for tracking mouse movement either by attaching to the window or a targetted element ID.

![Example usage](https://raw.githubusercontent.com/hamfz/react-use-mouse-move/master/mouse_move.gif)

### Usage
Hook expects
```js
    useMouseMove(throttle: Number, targetPos: String, targetId: String)
```

- throttle: integer 1 - 10 that controls how often the hook "updates" the given position. Limiting this can be helpful for performance reasons.
- targetPos: string representing what x, y coordinate you want from the event, ex: `['page', 'screen', 'offset', 'client', '']`. By default returns x and y. (See: https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- targetId: string representing target ID of element you wish to track. (Defaults to window)

Additionally, the returned object also includes the following keyDown states: `['altKey', 'ctrlKey', 'metaKey', 'shiftKey']`. Below is the full object returned from an mouse move update.
```js
   {
      x,
      y,
      keydown: {
        altKey,
        ctrlKey,
        metaKey,
        shiftKey
      }
    }
```


##### In a component

```js
import React, { useState } from 'react';
import { useMouseMove } from 'react-use-mouse-move';

const TestHook = (props) => {
  const pos1 = useMouseMove(1);
  const pos2 = useMouseMove(2, 'client');
  const pos3 = useMouseMove(5, 'client');
  const pos4 = useMouseMove(10, 'client', 'myDiv');

  return (
    <div id="myDiv">
      <h2>Throttle 1 (or no throttle)</h2>
      <span>x: {pos1.x} y: {pos1.y}</span>
      <br/>
      <h2>Throttle 2</h2>
      <span>x: {pos2.x} y: {pos2.y}</span>
      <br/>
      <h2>Throttle 5</h2>
      <span>x: {pos3.x} y: {pos3.y}</span>
      <h2>Throttle 10 (max)</h2>
      <span>x: {pos4.x} y: {pos4.y}</span>
    </div>
  );
}

export default TestHook;
```


### Todos

 - tests

License
----

MIT
