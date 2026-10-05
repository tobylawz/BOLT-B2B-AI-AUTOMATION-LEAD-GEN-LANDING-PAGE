# Implementation Plan: V2 Premium Polish

## Summary
Building on the initial dynamic visuals, this phase focuses on typography, deep tactile texture, interactive elements, and high-end scroll mechanics. The goal is to elevate the site from "animated" to a "premium software experience" (excluding custom cursor overrides).

## Progress Checklist

### 1. Typography & Layout Refinement
- [ ] Import and integrate a premium modern typeface (e.g., *Geist*, *Outfit*, or *Inter*) globally to replace the system default.
- [ ] Adjust letter-spacing (tracking): tighten it for large hero headlines to make them feel punchy, and loosen it for small uppercase labels for elegance.
- [ ] Refine the visual hierarchy by fine-tuning font weights and line heights across all sections.

### 2. Enhanced Texture and Depth
- [ ] Add a global, extremely subtle, low-opacity animated film grain/noise overlay. This breaks up the flat digital background and provides a cinematic, physical texture.

### 3. Interactive Hero "Playground"
- [ ] Upgrade the floating "automation workflow" nodes in the hero section to be genuinely interactive.
- [ ] Make the nodes draggable by the user using Framer Motion's drag capabilities.
- [ ] Add rubber-band physics or spring animations so they snap back or react smoothly when interacted with.

### 4. Advanced Scroll-Linked Animations
- [ ] Move beyond simple "appear on scroll" animations by linking movement directly to scroll progress.
- [ ] Implement subtle continuous rotation, scaling, or parallax shifting on background elements relative to how fast and far the user scrolls.

### 5. Sticky Scrolling Process Section
- [ ] Refactor the layout of the "How we approach it" (Process) section.
- [ ] Pin the section title and description on the left side of the screen (or top on mobile) while the user scrolls.
- [ ] Have the process step cards (01, 02, 03, 04) scroll up and stack like a deck of cards on the right side.

### 6. Refined Button States
- [ ] Add an automated, subtle "sheen" or light sweep animation that periodically passes over the primary CTA buttons.
- [ ] This continuously draws the eye to the button even when the user isn't hovering over it.
