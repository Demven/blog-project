const TOTAL_ITERATIONS:number = 50;

let targetPosition:number = 0;
let startPosition:number = 0;
let requestAnimationFrameFunction:Function;
let iteration:number = 0;

function easeOutCubic(
  currentIteration:number,
  startValue:number,
  changeInValue:number,
  totalIterations:number,
):number {
  return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
}

function scrollToPosition() {
  window.scrollTo(0, easeOutCubic(iteration, startPosition, targetPosition - startPosition, TOTAL_ITERATIONS));
  iteration++;

  if (iteration === TOTAL_ITERATIONS) {
    return;
  }

  requestAnimationFrameFunction(scrollToPosition);
}

export default function scrollTo(targetPositionToScroll:number) {
  targetPosition = targetPositionToScroll;
  startPosition = window.scrollY || window.document.documentElement.scrollTop;
  requestAnimationFrameFunction = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  iteration = 0;

  scrollToPosition();
}
