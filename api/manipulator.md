# Manipulator functions

Manipulator functions take a color and zero or more parameters as input, then return another color based on inputs.

## `setAlpha`

Returns the color with specified alpha value.

```ts
function setAlpha(color: Color, alpha: number): Color
```

### Parameters

| Name  | Default Value | Description                                |
| ----- | ------------- | ------------------------------------------ |
| color |               | A color to be based on.                    |
| alpha |               | New alpha channel value. Can be 0.0 ~ 1.0. |

### Returns

A color with specified alpha value.

## `blend`

Mix two colors.

```ts
function blend(color1: Color, color2: Color, weight?: number): Color
```

### Parameters

| Name   | Default Value | Description                           |
| ------ | ------------- | ------------------------------------- |
| color1 |               | A color to be blended.                |
| color2 |               | An another color to mix.              |
| weight | `0.5`         | A weight of color1. Can be 0.0 ~ 1.0. |

### Returns

A blended color. When you set the weight to `0.0` the color equals to color2 and `1.0` results in color1.

## `lighten`

Makes the input color lighter. Unlike Sass, this function scales the lightness.

```ts
function lighten(color: Color, amount: number): Color
```

### Parameters

| Name   | Default Value | Description                                              |
| ------ | ------------- | -------------------------------------------------------- |
| color  |               | A color to lighten.                                      |
| amount |               | A ratio between the `color` and white. Can be 0.0 ~ 1.0. |

### Returns

A lightened color. When you set the amount to `0.0` a returned value will be same as input (a value of `color`) and `1.0` results in white (`#fff`).

## `darken`

Makes the input color darker. Unlike Sass, this function shrinks the lightness.

```ts
function darken(color: Color, amount: number): Color
```

### Parameters

| Name   | Default Value | Description                                              |
| ------ | ------------- | -------------------------------------------------------- |
| color  |               | A color to lighten.                                      |
| amount |               | A ratio between the `color` and black. Can be 0.0 ~ 1.0. |

### Returns

A darkened color. When you set the amount to `0.0` a returned value will be same as input (a value of `color`) and `1.0` results in black (`#000`).

## `rotate`

Rotate hue of a color.

```ts
function rotate(color: Color, degree: number): Color
```

### Parameters

| Name   | Default Value | Description                                                               |
| ------ | ------------- | ------------------------------------------------------------------------- |
| color  |               | A color to lighten.                                                       |
| degree |               | How much degrees to added to the color's hue. Can be -360 ~ 360 (degree). |

### Returns

A rotated color.
