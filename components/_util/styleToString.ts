// TODO: 支持key为camelcase形式，然后手动转成a-b-c形式
export const styleToString = (style: Record<string, string | number>): string => {
  return Object.keys(style).reduce((str, key) => {
    const value = style[key];
    return str + `${key}: ${value};`;
  }, '');
}

export function formatStyle(obj: { [key: string]: any } | string = {}) {
  if (typeof obj === 'string') return obj;
  return Object.keys(obj)
    .reduce((style, key) => {
      const value = obj[key];
      if (value === null || value === undefined) {
        return style;
      }
      const unit =
        typeof value === 'number' && /width|height|top|right|bottom|left/i.test(key) ? 'px' : '';
      return style.concat(
        `${key.replace(/([A-Z])/, a => `-${a.toLowerCase()}`)}:${value}${unit}`,
      );
    }, [])
    .join(';');
}