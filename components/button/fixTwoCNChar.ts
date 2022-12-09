export function fixTwoCNChar(node) {
  const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/;
  const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

  let hasTwoCNChar = false;
  if (node) {
    hasTwoCNChar = fixTwoCNChar(node);
    if (hasTwoCNChar) {
      const prefix = node.dataset.prefix || 'ant-btn';
      const cls = `${prefix}-two-chinese-chars`;
      node.classList.add(cls);
    }
  }


  function fixTwoCNChar(node) {
    const buttonText = node.innerText || '';
    if (isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        return true;
      }
    } else {
      return false;
    }
  }
  
  return {
    destroy(){}
  }
}