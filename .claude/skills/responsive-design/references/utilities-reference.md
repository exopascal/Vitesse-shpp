# Responsive Utilities Reference

Complete list of Tailwind responsive utilities.

## Display

```
hidden md:block         /* Hide on mobile, show on desktop */
block md:hidden         /* Show on mobile, hide on desktop */
flex md:grid            /* Flex on mobile, grid on desktop */
inline md:block
```

## Flexbox

```
flex-col md:flex-row    /* Stack on mobile, inline on desktop */
flex-row md:flex-col    /* Reverse: inline on mobile, stack on desktop */
items-start md:items-center
items-center md:items-start
justify-start md:justify-center
justify-center md:justify-start
justify-between md:justify-around
```

## Grid

```
grid-cols-1 md:grid-cols-2 lg:grid-cols-3
grid-cols-2 md:grid-cols-3 lg:grid-cols-4
gap-4 md:gap-6 lg:gap-8
```

## Sizing

### Width
```
w-full md:w-1/2 lg:w-1/3
w-full md:w-2/3 lg:w-1/2
w-auto md:w-full
max-w-sm md:max-w-md lg:max-w-lg
max-w-full md:max-w-7xl
```

### Height
```
h-64 md:h-80 lg:h-96
h-screen md:h-auto
min-h-[400px] md:min-h-[500px] lg:min-h-[600px]
max-h-[300px] md:max-h-[400px] lg:max-h-[500px]
```

## Spacing

### Padding
```
p-4 md:p-8 lg:p-12
px-4 md:px-8 lg:px-12
py-8 md:py-12 lg:py-16
pt-4 md:pt-8
pb-4 md:pb-8
```

### Margin
```
m-4 md:m-8 lg:m-12
mx-auto                 /* Center horizontally */
my-4 md:my-8
mt-4 md:mt-8
mb-4 md:mb-8
```

### Gap
```
gap-3 md:gap-6 lg:gap-8
gap-x-4 md:gap-x-6
gap-y-4 md:gap-y-6
```

## Typography

### Font Size
```
text-base md:text-lg lg:text-xl
text-2xl md:text-3xl lg:text-4xl
text-3xl md:text-4xl lg:text-5xl xl:text-6xl
```

### Line Height
```
leading-normal md:leading-tight
leading-tight md:leading-none
leading-loose md:leading-normal
```

### Font Weight
```
font-normal md:font-semibold
font-medium md:font-bold
```

## Text Alignment

```
text-center md:text-left
text-left md:text-center
text-center md:text-right
text-justify md:text-left
```

## Position

```
relative md:absolute
absolute md:relative
static md:fixed
top-0 md:top-4
left-0 md:left-4
```

## Z-Index

```
z-10 md:z-20
z-0 md:z-10
```

## Opacity

```
opacity-50 md:opacity-100
opacity-0 md:opacity-100
```

## Quick Patterns

### Common Responsive Layouts

**Stack to Side-by-Side:**
```
flex flex-col md:flex-row
```

**1 to 2 to 3 Columns:**
```
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
```

**Center to Left Align:**
```
text-center md:text-left
items-center md:items-start
justify-center md:justify-start
```

**Small to Large Spacing:**
```
gap-4 md:gap-6 lg:gap-8
p-4 md:p-8 lg:p-12
```

**Small to Large Text:**
```
text-base md:text-lg lg:text-xl
text-3xl md:text-4xl lg:text-5xl
```
