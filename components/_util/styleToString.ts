// TODO: 支持key为camelcase形式，然后手动转成a-b-c形式
export const styleToString = (style: Record<string, string | number>): string => {
  return Object.keys(style).reduce((str, key) => {
    const value = style[key];
    return str + `${key}: ${value};`;
  }, '');
}