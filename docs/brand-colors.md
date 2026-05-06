# Brand Color System

All colors are defined in `tailwind.config.js` as full ramps (50-900):

| Token          | Base Hex  | Role                          | Tailwind Class Prefix |
|:---------------|:----------|:------------------------------|:----------------------|
| Deep Space     | `#273440` | Headers, dark backgrounds     | `deep-space-{shade}`  |
| Warm Sand      | `#F2ECCE` | Light backgrounds, surfaces   | `warm-sand-{shade}`   |
| Harvest Gold   | `#F2CF63` | CTAs, accents, highlights     | `harvest-gold-{shade}`|
| Ember          | `#BF895A` | Secondary accents, warmth     | `ember-{shade}`       |
| Oxblood        | `#731702` | Deep accents, passion         | `oxblood-{shade}`     |

## Usage Examples

```html
<!-- Primary CTA button -->
<button class="bg-harvest-gold-200 text-deep-space-800">Get Started</button>

<!-- Dark section -->
<section class="bg-deep-space-800 text-warm-sand-100">...</section>

<!-- Card on light background -->
<div class="bg-white border border-warm-sand-300/30">...</div>
```

## Color Sharing with FIN

To keep both the marketing site and FIN dashboard visually consistent, copy these color tokens into the FIN project's Tailwind config:

```javascript
// In FIN's tailwind.config.js, add to theme.extend.colors:
'deep-space': {
  50: '#e8edf1',
  100: '#c5cfd8',
  // ... (copy full ramps from this project)
  800: '#273440',
  900: '#1a242d',
  950: '#0f161c',
},
'warm-sand': { /* ... */ },
'harvest-gold': { /* ... */ },
'ember': { /* ... */ },
'oxblood': { /* ... */ },
```