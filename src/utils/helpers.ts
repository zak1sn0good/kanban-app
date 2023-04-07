const colors = [
  'orange',
  'blue',
  'red',
  'yellow',
  'green',
  'gray',
  'cyan',
  'purple',
  'teal',
  'pink'
];

export const pickChakraRandomColor = (variant = '') : string => {
  const color = colors[Math.floor(Math.random() * colors.length)]
  return color + variant;
};

export function swap<T>(arr : T[], i : number, j : number) : T[] {
  
  const copy  = [...arr];
  const tmp = copy[i];
  copy[i] = copy[j];
  copy[j] = tmp;

  return copy;

};