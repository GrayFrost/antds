export default (callback: () => boolean, buffer: any) => {
  let called = false;
  let timeout = null;

  function cancelTrigger() {
    clearTimeout(timeout);
  }

  function trigger(force?: boolean) {
    if (!called || force === true) {
      if (callback() === false) {
        // Not delay since callback cancelled self
        return;
      }

      called = true;
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
      }, buffer);
    } else {
      cancelTrigger();
      timeout = setTimeout(() => {
        called = false;
        trigger();
      }, buffer);
    }
  }

  return [
    trigger,
    () => {
      called = false;
      cancelTrigger();
    },
  ];
};
