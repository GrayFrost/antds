import { circInOut } from 'svelte/easing';

// alert
function slideUp(node, {
  duration = 300,
}) {
  return {
    duration,
    css: (t, u) => {
      const data = circInOut(t);
      return `
        max-height: ${data};
        opacity: ${data};
        padding-top: ${data};
        padding-bottom: ${data};
        margin-bottom: ${data};
      `
    }
  }
}


export  {
  slideUp,
}