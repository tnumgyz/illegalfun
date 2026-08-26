# illegalfun.net

## What this is

A blog of **hypothetical, clearly-fictional psychedelic experience narratives**. It is
creative writing / speculative fiction — a travelogue of places that don't exist.
It is **not** a how-to, a dosing guide, or a sourcing guide.

## Voice

First-person, reflective, literary. Journal/travelogue register — the narrator is
recounting something that happened to them, in past tense, with the texture of memory.
Not clinical, not instructional, not a trip report with numbers in it.

- Sensory and spatial over pharmacological. Describe the room, the light, the dread,
  the geometry — never the mechanism.
- Restraint beats intensity. The prose should feel like it's remembering something
  hard to say, not performing weirdness.
- Fictional substances, fictional settings, fictional people. Invent names.

## Non-negotiables

These are hard rules. Do not relax them for stylistic reasons, and do not ship a
change that weakens them.

1. **Fiction disclaimer on every post** — a visible banner at the top of the
   post body (before the first paragraph). Not a tooltip, not
   an `aria-label`, not collapsed behind a toggle. It renders in the layout so it
   cannot be forgotten per-post; authors don't opt in.
2. **No literal dosing, sourcing, synthesis, or route-of-administration detail.** No
   quantities, no units, no combinations, no plant/chemical identification, no
   acquisition. Narrative only. If a draft drifts toward instructional, cut it.
3. **Accessible contrast**, even against the dark/neon palette — see Accessibility.
4. **No motion-only content.** Anything conveyed by animation must also be present in
   the static DOM.

---

## Visual direction

Riffed on the current illegalfun.net: near-black editorial base, serif typography,
one saturated teal accent doing all the work, and slow scroll-reveal motion. Keep
that skeleton; push further on gradient bloom and generative texture. The target
feeling is **alive, not loud** — the page breathes rather than flashes.

### Color

Near-black base, never pure `#000`. One dominant accent; the other two are rare.

```css
:root {
  /* base */
  --bg:         #121212;  /* page ground — hsl(0 0% 7%) */
  --surface:    #1a1a1a;  /* alternating section bands */
  --card:       #1e1e1e;  /* cards, inputs, raised panels */

  /* text */
  --text:       #f7f7f7;  /* headings, primary copy */
  --text-dim:   #dadada;  /* body copy, secondary */
  --text-muted: #929292;  /* metadata — see Accessibility note */

  /* accent */
  --accent:     #1abc9c;  /* teal — primary, hsl(168 76% 42%) */
  --accent-2:   #1a8fbc;  /* azure — hsl(198 76% 42%), sparingly */
  --accent-3:   #bc1a3d;  /* crimson — hsl(348 76% 42%), rare */

  --hairline:   rgba(218, 218, 218, 0.2);
  --scrim:      rgba(0, 0, 0, 0.55);       /* over hero imagery */
  --ghost:      rgba(247, 247, 247, 0.12); /* oversized background wordmark */
}
```

Rules of thumb:

- **Accent is a spice, not a paint.** Teal appears in eyebrow labels, links, the 3px
  rules under headings, one CTA, and glow. It is never a large fill behind body text.
- Crimson is reserved. If a page has crimson and teal fighting, the crimson is wrong.
- **Glow, don't stroke.** Emphasis comes from `box-shadow: 0 0 40px rgba(26,188,156,.2)`
  and low-opacity blurred gradient blooms (`blur(40px)`–`blur(64px)` at 5–20% opacity,
  absolutely positioned, `pointer-events: none`, behind content) — not from borders.
- Card borders start `1px solid transparent` and reveal a hairline/accent edge on
  hover over `0.3s`.

### Typography

Serif throughout — the serif is what keeps this literary instead of cyberpunk.

- **Headings:** `"Playfair Display", Georgia, serif` — mostly weight **400**, not bold.
  The size does the emphasis. Reserve 700 for buttons and small caps-y labels.
- **Body:** `"Lora", Georgia, serif`.
- **Mono:** system stack, for the rare timestamp or footnote marker.

Scale (fluid, `clamp()`):

| Role | Value |
|---|---|
| Ghost wordmark (hero backdrop) | `clamp(56px, 10vw, 100px)`, `--ghost`, tracking `-0.02em` |
| Hero `h1` | `clamp(28px, 5vw, 48px)`, weight 400, `line-height: 1.2`, `max-width: 700px` |
| Section `h2` | `clamp(28px, 4vw, 42px)`, weight 400, `line-height: 1.2` |
| Card `h3` | 20–22px, weight 700 |
| Body | 16–18px, `line-height: 1.7`, measure `max-width: 68ch` |
| Eyebrow label | 12–13px, `--accent`, `letter-spacing: 0.04em`, uppercase |

Long-form posts get a generous measure and loose leading — the reading experience is
the product.

### Layout

- **Sticky header**, `z-50`, hairline bottom border (`rgba(255,255,255,.1)`), optional
  `backdrop-filter: blur(4px)`. Wordmark left, minimal nav right.
- **Hero:** `min-height: 100vh`, full-bleed cover image, `--scrim` overlay, and the
  oversized ghost wordmark drifting behind the headline.
- **Section rhythm:** `padding: 6rem 1.5rem`. Alternate `--bg` / `--surface` bands so
  sections separate by value, not by rules.
- **Asymmetry as texture:** the about-style image sits at `rotate(2deg)`,
  `aspect-ratio: 3/4`, `border-radius: 4px`, with a teal glow shadow.
- **Post grid:** `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`.
- **Footer:** `--bg` with a hairline top border. Carries the fiction disclaimer.
- Corners stay tight — `--radius: 0.5rem` max, 4px on imagery. No pill shapes.

### Motion

Slow, few, purposeful. Nothing bounces.

- **Scroll reveal** is the primary effect: `opacity: 0 → 1` with `translateY(16–24px)`
  (or `translateX(±30px)` for side-entering blocks), `0.5s–0.8s`, eased out.
- **Stagger** siblings by `delay: (i + 1) * 0.1s`. Cap the cascade at ~5 items.
- **Ambient loop:** the ghost wordmark marquee runs on a very slow cycle (~18s, linear,
  infinite). This is background texture and must never carry information.
- **Hover:** `border-color` and `box-shadow` over `0.3s`. Nothing scales more than 1.02.
- **Generative bloom:** slowly drifting radial gradients behind the hero — CSS-driven
  where possible. If a canvas is used, it must be `aria-hidden`, cheap, and pause when
  the tab is hidden or the section is offscreen.

**`prefers-reduced-motion` is mandatory** and the reference site does not implement it —
we do. Every animated surface needs a reduced-motion path, and reduced motion means
*settled final state*, never a hidden element:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Because scroll-reveal starts at `opacity: 0`, that alone is not enough — under reduced
motion, and when JS fails, reveal targets must resolve to `opacity: 1; transform: none`.
Prefer CSS-only reveal (`animation-timeline: view()`) with a `@supports` fallback that
leaves content visible, over a JS observer that can strand content invisible.

---

## Accessibility

- Body and heading text must clear **4.5:1** against its actual background
  (`--text` and `--text-dim` on `--bg` are comfortable; `--accent` on `--bg` is ~7:1
  and fine for text and links).
- **`--text-muted` was `#474747` on the reference site (~2.3:1 — fails).** It is
  lightened to `#929292` here — 6.0:1 on `--bg`, and 4.6:1 over the soft aurora
  field where post dates sit. Do not darken it back for aesthetics.
- `--text-muted` measures 3.8:1 over a **full-strength** aurora field, so it must
  not be used inside one. Only the homepage hero runs at full strength.
- Never rely on the teal alone to signal state — pair with underline, weight, or icon.
- Decorative imagery, blooms, ghost wordmark, and any canvas: `aria-hidden="true"` and
  empty `alt`. Post imagery gets real alt text.
- Visible focus rings everywhere, in `--accent`, with offset so they read against dark.
- Text over hero imagery always sits above the `--scrim`.

---

## Tech

- **Astro**, with Markdown **content collections** for posts (`src/content/posts/`).
  Define the collection schema in `src/content/config.ts` — title, description, date,
  hero image, tags. Keep frontmatter typed; don't hand-roll globs.
- Layouts live in `src/layouts/`; the post layout injects the fiction disclaimer at top
  and in the footer, so it is structurally impossible to publish a post without it.
- Styling: plain CSS with the custom properties above (or Tailwind mapped onto those
  same tokens). Tokens live in one place; components read them.
- Ship as little JS as possible — Astro islands only where motion genuinely needs it.
- RSS at `/feed.xml`.

### Deploy

- **GitHub Actions → GitHub Pages.** `site` and `base` in `astro.config.mjs` must match
  the custom domain.
- Custom domain **illegalfun.net**, DNS at **GoDaddy**. A `public/CNAME` containing
  `illegalfun.net` is required or Pages drops the domain on every deploy.

## Working agreements

- When adding a post, the only thing an author writes is Markdown + frontmatter.
  Disclaimers, layout, and motion are the layout's job.
- Every post must contain a story specific image. Provide placeholder that can be replaced later.
- Before shipping any visual change, check it at 320px wide, with
  `prefers-reduced-motion: reduce`, and with JS disabled.
- If a change would make the site louder rather than more alive, it's the wrong change.
