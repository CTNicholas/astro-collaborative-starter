export function spring(
  initialPosition = 0,
  { stiffness = 200, damping = 10, precision = 100 } = {}
) {
  let position = initialPosition;
  let endPosition = 0;
  let secPerFrame = 1 / 60;
  let velocity = 0;
  let onUpdate = v => {};
  let onRest = v => {};
  let raf;

  const interpolate = () => {
    const distance = endPosition - position;
    const acceleration = stiffness * distance - damping * velocity;
    const newVelocity = velocity + acceleration * secPerFrame;
    const newPosition = position + newVelocity * secPerFrame;

    const isComplete =
      Math.abs(newVelocity) < 1 / precision &&
      Math.abs(newPosition - endPosition) < 1 / precision;

    position = isComplete ? endPosition : newPosition;
    velocity = newVelocity;
    onUpdate(position);

    if (!isComplete) raf = requestAnimationFrame(interpolate);
    else onRest(position);
  };

  return {
    setValue: (v = 0) => {
      cancelAnimationFrame(raf);
      position = endPosition = v;
      onUpdate(position);
    },
    transitionTo: (v = 0) => {
      cancelAnimationFrame(raf);
      endPosition = v;
      raf = requestAnimationFrame(interpolate);
    },
    onUpdate: (fn = v => {}) => {
      onUpdate = fn;
      fn(position);
    },
    onRest: (fn = v => {}) => {
      onRest = fn;
    },
    destroy: () => {
      cancelAnimationFrame(raf);
      onUpdate = () => {};
      onRest = () => {};
    }
  };
}
