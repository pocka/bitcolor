# Converter functions

Converter functions take a color as input, then return _something_. They are the function which could be represented as `converter(color, ...params) => T`.

## `toRgbaString`

Generate `rgba(r,g,b,a)` format string.

```ts
function toRgbaString(color: Color): string
```

### Parameters

| Name  | Default Value | Description        |
| ----- | ------------- | ------------------ |
| color |               | A color to convert |

### Returns

A rgba string. The value of `rgb` will be 0 ~ 255 and of `a` will be 0.0 ~ 1.0.

## `toRgbString`

Generate `rgb(r,g,b)` format string.

```ts
function toRgbString(color: Color): string
```

### Parameters

| Name  | Default Value | Description        |
| ----- | ------------- | ------------------ |
| color |               | A color to convert |

### Returns

A rgb string. Each value will be 0 ~ 255.

## `toHexaString`

Generate `#rrggbbaa` format string.

```ts
function toHexaString(color: Color): string
```

### Parameters

| Name  | Default Value | Description        |
| ----- | ------------- | ------------------ |
| color |               | A color to convert |

### Returns

A hexa string. The generated string will never be shortened.

## `toHexString`

Generate `#rrggbb` format string.

```ts
function toHexString(color: Color): string
```

### Parameters

| Name  | Default Value | Description        |
| ----- | ------------- | ------------------ |
| color |               | A color to convert |

### Returns

A hex string. The generated string will never be shortened.

## `toHslaObject`

Generate HSL object with alpha channel.

```ts
interface HSLA {
  h: number
  s: number
  l: number
  a: number
}

function toHslaObject(color: Color): HSLA
```

### Parameters

| Name  | Default Value | Description        |
| ----- | ------------- | ------------------ |
| color |               | A color to convert |

### Returns

A HSL object. `h` will be 0 ~ 360 (unit is degree) and other properties will be 0.0 ~ 1.0.
