# Button — Component Specification

**Component:** `Button`
**Path:** `src/components/ui/Button.tsx`
**Status:** Ready for implementation
**Applies to:** Sthwalo Holdings marketing site (Vite + React 18 + TypeScript + Tailwind 3)
**Authored against:** `better-ui` design-engineering principles

---

## 1. Component Overview

### 1.1 Purpose

`Button` is the single interactive trigger primitive for the site. It renders one of
three underlying elements depending on where it leads, while presenting one visual
identity:

| Prop | Renders | Use for |
| --- | --- | --- |
| `to` | `<Link>` (react-router) | Internal route navigation (`/contact`, `/blog/slug`) |
| `href` | `<a>` | External URLs and in-page anchors (`#for-business`) |
| neither | `<button>` | Form submits and in-page actions |

### 1.2 Use cases

- Primary page calls to action (`Create a free account`, `Get in Touch`)
- Secondary navigation actions (`Read how FIN works`, `View Our Work`)
- Form submission (`Send Message` on `/contact`)
- Audience routing anchors in the home hero

### 1.3 When to use vs. when not to use

**Use `Button` when** the element performs an action or navigates as a deliberate,
prominent choice, and should carry visual weight.

**Do not use `Button` when:**

| Situation | Use instead |
| --- | --- |
| Inline text link inside a paragraph | Plain `<a>` / `<Link>` with underline |
| Navbar or footer navigation items | Their own nav link styles — `Button` weight would flatten hierarchy |
| An entire card is clickable | Wrap the card in `<Link>`; do not nest a `Button` inside a link |
| Icon-only control (close, menu toggle) | Dedicated `IconButton` — this component requires a text label |
| Toggle with a persistent on/off state | A switch or toggle; `Button` has no pressed state |

**Never nest a `Button` inside another link or button.** Invalid HTML and it breaks
keyboard navigation.

### 1.4 Accessibility requirements

| Requirement | Implementation |
| --- | --- |
| Semantic element | Real `<button>` for actions, real `<a>`/`<Link>` for navigation. Never a clickable `<div>`. |
| Accessible name | Visible text is the name. `aria-label` only when the visible label is insufficient out of context. |
| Focus visible | `:focus-visible` outline, `2px` solid `#d5a827` (`harvest-gold-400`), `2px` offset. Uses `outline` (not `ring`) so it renders correctly on both light and dark surfaces without an offset colour. |
| Keyboard activation | `<button>`: Space and Enter. `<a>`: Enter. Native — do not intercept. |
| Touch target | Minimum `44 × 44px`. `md` (44px) and `lg` (56px) comply. **`sm` is 36px** — when used standalone on touch, wrap in a container with `min-height: 44px` or add `py-3`. |
| Disabled semantics | `<button>` uses the native `disabled` attribute. Links cannot be natively disabled — render as `<span role="link" aria-disabled="true">` with no `href` and `tabIndex={-1}`. |
| Loading semantics | `aria-busy="true"` while loading; `aria-live="polite"` region announces `loadingLabel`. Button stays focused and is not removed from the tab order. |
| Reduced motion | Press scale and all transitions are suppressed by the global `prefers-reduced-motion` guard. Colour changes are retained, so every state remains visible. |
| Colour independence | No state is signalled by colour alone — disabled also dims via opacity, loading also shows a spinner and busy state. |
| Contrast | All variant pairings meet WCAG AA 4.5:1 for their text size (see §2.2). |

---

## 2. Visual Design

### 2.1 Dimensions and spacing

| Size | Padding | Font | Line height | Total height | Icon | Gap |
| --- | --- | --- | --- | --- | --- | --- |
| `sm` | `8px 16px` (`px-4 py-2`) | `14px` (`text-sm`) | `20px` | **36px** | `14px` | `8px` |
| `md` *(default)* | `12px 24px` (`px-6 py-3`) | `14px` (`text-sm`) | `20px` | **44px** | `16px` | `8px` |
| `lg` | `16px 32px` (`px-8 py-4`) | `16px` (`text-base`) | `24px` | **56px** | `16px` | `8px` |

- **Border radius:** `8px` (`rounded-lg`) at every size.
- **Concentric radius:** a `Button` inside a padded container must satisfy
  `outerRadius = 8 + containerPadding`. A card with `p-4` (16px) wrapping a button
  needs `rounded-3xl` (24px).
- **Minimum width:** none. Never stretch a button to fill a container unless the
  layout is explicitly full-width (`className="w-full"` on mobile).
- **Adjacent buttons:** `16px` gap (`gap-4`).

### 2.2 Colour variants

Tokens resolve from `tailwind.config.js`.

#### `primary` — the main action. One per view.

| State | Background | Text | Shadow |
| --- | --- | --- | --- |
| Default | `harvest-gold-200` `#F2CF63` | `deep-space-800` `#273440` | `shadow-btn` |
| Hover | `harvest-gold-300` `#e8be3e` | `deep-space-800` | `shadow-btn-hover` |
| Active | `harvest-gold-300` `#e8be3e` | `deep-space-800` | `shadow-btn` |
| Disabled | `harvest-gold-200` @ 50% opacity | inherited @ 50% | none |

Contrast: `#273440` on `#F2CF63` = **9.2:1** (AA & AAA).

#### `secondary` — supporting action on light surfaces.

| State | Background | Text |
| --- | --- | --- |
| Default | `deep-space-800` `#273440` | `warm-sand-100` `#faf8ea` |
| Hover | `deep-space-700` `#2d4058` | `warm-sand-100` |
| Active | `deep-space-700` | `warm-sand-100` |
| Disabled | `deep-space-800` @ 50% | inherited @ 50% |

Contrast: `#faf8ea` on `#273440` = **12.6:1**.

#### `outline` — tertiary; structural border is meaningful and is retained.

| State | Border | Background | Text |
| --- | --- | --- | --- |
| Default | `2px` `deep-space-800` | transparent | `deep-space-800` |
| Hover | `2px` `deep-space-800` | `deep-space-800` | `warm-sand-100` |
| Active | `2px` `deep-space-800` | `deep-space-700` | `warm-sand-100` |
| Disabled | `2px` @ 50% | transparent | `deep-space-800` @ 50% |

#### `ghost` — lowest emphasis; no border, no shadow.

| State | Background | Text |
| --- | --- | --- |
| Default | transparent | `deep-space-800` |
| Hover | `deep-space-800` @ 5% | `deep-space-800` |
| Active | `deep-space-800` @ 10% | `deep-space-800` |
| Disabled | transparent | `deep-space-800` @ 50% |

#### Elevation

Per **principle 3 — shadows for elevation, borders for structure**, `primary` and
`secondary` carry no border. Their depth comes from layered transparent shadows,
added to `tailwind.config.js`:

```js
boxShadow: {
  btn:         '0 1px 2px rgba(39,52,64,0.06), 0 2px 4px rgba(39,52,64,0.06), 0 4px 8px rgba(39,52,64,0.04)',
  'btn-hover': '0 1px 2px rgba(39,52,64,0.08), 0 4px 8px rgba(39,52,64,0.08), 0 8px 16px rgba(39,52,64,0.06)',
}
```

`outline` keeps its border — it communicates structure, not fake depth.

### 2.3 Typography

| Property | Value |
| --- | --- |
| Family | `Inter`, `system-ui`, `-apple-system`, sans-serif |
| Weight | `600` (semibold) |
| Size | `14px` (`sm`, `md`) / `16px` (`lg`) |
| Letter spacing | normal (`0`) |
| Text transform | none — **never uppercase** |
| Wrapping | single line; `whitespace-nowrap`. Shorten the label rather than wrapping. |

Labels are sentence case, verb-first, 1–4 words: `Start free`, `Get in Touch`.
No terminal punctuation.

### 2.4 Iconography

| Property | Value |
| --- | --- |
| Library | `lucide-react` — the only icon library on this surface |
| Size | `14px` (`sm`) / `16px` (`md`, `lg`) |
| Stroke width | **`2`** — matches the semibold (600) label per principle 13 |
| Colour | `currentColor`, inherited from the button's text colour — never hard-coded |
| Position | Trailing for forward motion (`ArrowRight`), leading for object/action (`BookOpen`, `Send`) |
| Spacing | `8px` from the label (`gap-2`) |
| Shrink | `flex-shrink-0` — never allow the icon to squash |

Icons are decorative here because the label carries the name: mark them
`aria-hidden="true"`.

---

## 3. States and Variants

### 3.1 State matrix

| State | Trigger | Visual | Cursor | Pointer events |
| --- | --- | --- | --- | --- |
| Default | rest | per §2.2 | `default` (links) / `pointer` | yes |
| Hover | pointer over | variant hover colours, elevated shadow | `pointer` | yes |
| Focus-visible | keyboard focus | `2px` `#d5a827` outline, `2px` offset | — | yes |
| Active | press held | variant active colours, `scale(0.96)` | `pointer` | yes |
| Loading | `loading` | spinner cross-fades in, label at `opacity 0`, width held | `wait` | **no** |
| Disabled | `disabled` | `opacity 0.5`, no shadow, no hover response | `not-allowed` | no |

Hover is **not** applied when `disabled` or `loading` is set.

### 3.2 Loading state

Per **principle 7 — contextual icon animations**, and because no motion library is
installed, the spinner and the label both stay in the DOM and cross-fade with CSS.

- The label keeps its space (`opacity: 0`, still laid out), so **the button never
  changes width** when entering or leaving the loading state.
- The spinner is absolutely centred over the label.
- Cross-fade values, exactly:

| Property | Hidden | Visible |
| --- | --- | --- |
| `opacity` | `0` | `1` |
| `scale` | `0.25` | `1` |
| `filter` | `blur(4px)` | `blur(0px)` |

- Duration `300ms`, easing `cubic-bezier(0.2, 0, 0, 1)`.
- The spinner itself rotates: `1s linear infinite` — `linear` is correct here because
  it is a continuous loop.
- Clicks are ignored while loading; `aria-busy="true"` is set.

### 3.3 Disabled state

- Dim with **`opacity: 0.5`**, not a lighter colour token, so the icon and label dim
  together and stay visually related (see `icons.md`).
- `<button>`: native `disabled`.
- Link variants: rendered as `<span role="link" aria-disabled="true" tabIndex={-1}>`
  with no `href`, so they leave the tab order and cannot be activated.
- `disabled` and `loading` are independent; `loading` implies non-interactive.

### 3.4 Error state

`Button` has **no error state**. Errors belong to the surrounding form or field, not
to the trigger. On `/contact`, submission failure is announced by the form's own
status region while the button returns to its default state.

---

## 4. Interaction Patterns

### 4.1 User interactions

| Input | Behaviour |
| --- | --- |
| Click / tap | Fires `onClick`, then navigates if `to`/`href` |
| Enter | Activates (`<button>` and `<a>`) |
| Space | Activates (`<button>` only) |
| Focus | Shows focus ring only for keyboard focus (`:focus-visible`) — not on mouse click |
| Long press (touch) | Held `scale(0.96)`; no context menu suppression |

### 4.2 Animation and transitions

Buttons are a **high-frequency** surface. Per **principle 15 — motion restraint**,
transitions stay at or below `150ms` and no entrance animation is used.

| Property | Duration | Easing |
| --- | --- | --- |
| `background-color`, `border-color`, `color` | `150ms` | `ease-out` |
| `box-shadow` | `150ms` | `ease-out` |
| `transform` (press scale) | `100ms` | `ease-out` |
| Loading cross-fade | `300ms` | `cubic-bezier(0.2, 0, 0, 1)` |

Implemented as a scoped `@layer components` class — **never `transition: all`**
(principle 11):

> **Note:** Tailwind 3's `scale-*` utilities compile to `transform: …scaleX() scaleY()`,
> not the standalone `scale` property. The transition must name `transform` or the
> press scale applies instantly with no easing.

```css
.btn-transition {
  transition-property: background-color, border-color, color, box-shadow, transform;
  transition-duration: 150ms, 150ms, 150ms, 150ms, 100ms;
  transition-timing-function: ease-out;
}
```

- **Press scale is exactly `0.96`** (principle 9). Never below `0.95`.
- Set `static` to opt out of the press scale where motion would distract.
- All transitions are CSS, therefore **interruptible** (principle 4) — moving the
  pointer away mid-fade retargets smoothly rather than restarting.

### 4.3 Responsive behaviour

| Breakpoint | Behaviour |
| --- | --- |
| `< 640px` | Buttons in a group stack vertically (`flex-col`), full width via `className="w-full"` where the group is the page's primary action |
| `>= 640px` | Groups run horizontally (`sm:flex-row`) with `gap-4`, sized to content |

Size does **not** change automatically across breakpoints — pass a different `size`
explicitly if needed. Labels never truncate; they are short by contract.

---

## 5. Technical Specifications

### 5.1 Props

```ts
interface ButtonProps {
  /** Visible label. Required — this component has no icon-only mode. */
  children: ReactNode;

  /** Internal route. Renders react-router <Link>. Mutually exclusive with href. */
  to?: string;

  /** External URL or in-page anchor. Renders <a>. Mutually exclusive with to. */
  href?: string;

  /**
   * Force the external-link treatment (target="_blank" + rel + noopener).
   * Auto-detected from href when omitted: http:// and https:// are external,
   * #anchors and relative paths are not.
   */
  external?: boolean;

  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';   // default 'primary'
  size?: 'sm' | 'md' | 'lg';                                  // default 'md'

  /** Non-interactive and dimmed to 50%. */
  disabled?: boolean;

  /** Shows spinner, holds width, sets aria-busy, ignores clicks. */
  loading?: boolean;

  /** Announced to screen readers while loading. Default 'Loading'. */
  loadingLabel?: string;

  /** Disable the scale(0.96) press feedback. */
  static?: boolean;

  /** Only meaningful for the <button> element. */
  type?: 'button' | 'submit';

  onClick?: () => void;
  className?: string;
  'aria-label'?: string;
}
```

**Defaults:** `variant='primary'`, `size='md'`, `type='button'`, all booleans `false`,
`loadingLabel='Loading'`.

**Constraints**
- `to` and `href` are mutually exclusive. Passing both is a developer error — `to` wins.
- `type` is ignored when `to` or `href` is set.
- `children` is required; there is no icon-only mode.

### 5.2 Events and callbacks

| Event | Signature | Notes |
| --- | --- | --- |
| `onClick` | `() => void` | Suppressed while `disabled` or `loading`. Fires **before** navigation for `to`/`href`. Receives no event argument — call sites needing `preventDefault` should use a plain element. |

### 5.3 Dependencies

| Dependency | Version | Use |
| --- | --- | --- |
| `react` | `^18.3.1` | — |
| `react-router-dom` | `^7.13.1` | `Link` for the `to` variant |
| `lucide-react` | `^0.344.0` | `Loader2` spinner; caller-supplied icons |
| `tailwindcss` | `^3.4.1` | All styling |

No motion library is installed, and this component **must not add one** — the loading
cross-fade is pure CSS by design.

### 5.4 Behaviour notes for implementers

1. **External detection.** Only `http://` and `https://` hrefs get
   `target="_blank" rel="noopener noreferrer"`. In-page anchors (`#for-business`) and
   relative paths must not — opening an anchor in a new tab is a bug.
2. **Width stability.** The loading spinner overlays the label; the label keeps its
   layout space. Verify the button does not resize when toggling `loading`.
3. **`static` is a reserved word.** Destructure as `static: isStatic`.
4. **Focus ring uses `outline`, not `ring`,** so it works on both the light
   (`warm-sand-50`) and dark (`deep-space-800`) surfaces without an offset colour.

### 5.5 Acceptance criteria

- [ ] `npm run typecheck`, `npm run lint`, `npm run build` all pass
- [ ] All four variants × three sizes render at the dimensions in §2.1
- [ ] Keyboard Tab shows the focus ring; mouse click does not
- [ ] Space and Enter activate the `<button>` form; Enter activates links
- [ ] Disabled buttons are unreachable by keyboard and ignore clicks
- [ ] Toggling `loading` does not change the button's width
- [ ] `#anchor` hrefs do not open a new tab
- [ ] With `prefers-reduced-motion: reduce`, press scale is suppressed while colour
      changes remain visible
- [ ] No `transition-all` anywhere in the component
- [ ] Press scale measures exactly `0.96`
