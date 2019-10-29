# Builder functions

Functions which create a color (rgba packed 32-bit number).

## `fromRgba`

Construct a color from RGBA values.

```ts
function fromRgba(r: number, g: number, b: number, a: number): Color
```

### Parameters

| Name | Default Value | Description                            |
| ---- | ------------- | -------------------------------------- |
| r    |               | Red channel value. Can be 0 ~ 255.     |
| g    |               | Green channel value. Can be 0 ~ 255.   |
| b    |               | Blue channel value. Can be 0 ~ 255.    |
| a    |               | Alpha channel value. Can be 0.0 ~ 1.0. |

### Returns

A generated color.

## `fromRgb`

Construct a color from RGB values. Equivalent to `fromRgba(r, g, b, 1.0)`.

```ts
function fromRgb(r: number, g: number, b: number): Color
```

### Parameters

| Name | Default value | Description                          |
| ---- | ------------- | ------------------------------------ |
| r    |               | Red channel value. Can be 0 ~ 255.   |
| g    |               | Green channel value. Can be 0 ~ 255. |
| b    |               | Blue channel value. Can be 0 ~ 255.  |

### Returns

A generated color. The alpha channel is always `1.0`.

## `fromHsla`

Construct a color from HSL values. You can also specify the value of alpha channel.

```ts
function fromHsla(h: number, s: number, l: number, a?: number): Color
```

### Parameters

| Name | Default value | Description                                                      |
| ---- | ------------- | ---------------------------------------------------------------- |
| h    |               | The value of hue. Can be -360 ~ 360 (degree).                    |
| s    |               | The value of saturation. Can be 0.0 ~ 1.0, where 1.0 means 100%. |
| l    |               | The value of lightness. Can be 0.0 ~ 1.0, where 1.0 means 100%.  |
| a    | `1.0`         | Alpha channel value. Can be 0.0 ~ 1.0.                           |

### Returns

A generated color. Color space was converted to RGBA.

## `fromHexaString`

Construct a color from hex color notation (`#rgba` or `#rrggbbaa`).

```ts
function fromHexaString(hexa: string): Color
```

### Parameters

| Name | Default value | Description                                              |
| ---- | ------------- | -------------------------------------------------------- |
| hexa |               | Hex notation string. Any invalid inputs will be ignored. |

### Returns

A generated color.

### Returns

A generated color. Color space was converted to RGBA.

## `fromHexString`

Construct a color from hex color notation without alpha (`#rgb` or `#rrggbb`).
Equivalent to `fromHexaString('#rrggbbff')`.

```ts
function fromHexString(hex: string): Color
```

### Parameters

| Name | Default value | Description                                              |
| ---- | ------------- | -------------------------------------------------------- |
| hex  |               | Hex notation string. Any invalid inputs will be ignored. |

### Returns

A generated color. The alpha channel is always `1.0`.
