import { useEffect, useState, useMemo } from 'react';

function useMouseMove(throttle, targetPos, targetId) {
  const [pos, setPos] = useState({x: 0, y: 0});
  let prevPos;

  throttle = useMemo(() => Math.max(1, Math.min(throttle, 10)), [throttle]);

  const throttlePos = (prevPos, x, y) => {
    if (prevPos) {
      return {
        x: Math.abs(prevPos.x - x) % throttle === 0 ? x : prevPos.x,
        y: Math.abs(prevPos.y - y) % throttle === 0 ? y : prevPos.y
      };
    }

    return { x, y };
  }

  const moveHandler = (evt) => {
    const { altKey, ctrlKey, metaKey, shiftKey } = evt;
    const { x, y } = throttlePos(
      prevPos,
      evt[targetPos ? `${targetPos}X` : 'x'],
      evt[targetPos ? `${targetPos}Y` : 'y']
    );

    const nextPos = {
      x,
      y,
      keydown: {
        altKey,
        ctrlKey,
        metaKey,
        shiftKey
      }
    };

    if (prevPos !== nextPos) {
      setPos(nextPos);
      prevPos = nextPos;
    }
  }

  useEffect(() => {
    let targetElement = window;
    if (targetId) {
      targetElement = document.getElementById(targetId)
    }

    targetElement.addEventListener('mousemove', moveHandler);
    return () => {
      targetElement.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  return pos;
}

export { useMouseMove }
