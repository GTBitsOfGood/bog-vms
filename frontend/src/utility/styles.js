import { transparentize } from 'polished';

// Creates Bootstrap-esque button focus border CSS snippet (as box-shadow)
export const focusBorder = (color, transparency = 0.7) =>
  `box-shadow: 0 0 0 0.2rem ${transparentize(transparency, color)};`;
