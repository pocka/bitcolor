# Getter Functions

Getter functions take a color as input and return _something_. Getter functions could be described as `getter(color, ...params) => T`.

## `getRelativeLuminance`

Get [a relative luminance](https://www.w3.org/TR/WCAG21/#dfn-relative-luminance) of a color.

```ts
function getRelativeLuminance(color: Color): number
```

### Parameters

| Name  | Default Value | Description             |
| ----- | ------------- | ----------------------- |
| color |               | A color to get value of |

### Returns

The relative luminance of the color. The value will be 0.0 ~ 1.0, where 0.0 for darkest black and 1.0 for lightest white.

## `getContrastRatio`

Get [the constrast ratio](https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio) of the colors.

```ts
function getContrastRatio(color1: Color, color2: Color): number
```

### Parameters

| Name   | Default Value | Description |
| ------ | ------------- | ----------- |
| color1 |               |             |
| color2 |               |             |

### Returns

The contrast ratio of the colors. The value will be 1.0 ~ 21.0 (1:1 ~ 21:1).
