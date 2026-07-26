# Superdesign Implementation Plan

Source design:
- Project: `809c07bf-56fd-4480-a79e-a0939ff3d914`
- Draft: `42cfa473-1cd6-4405-a51d-7ea99e62a96b`
- Title: `Pricing & Plans | CodePulse AI`

Design intent extracted from Superdesign:
- Red-noir pricing page with dark background, glassmorphism, and vibrant red accents.
- Three plan cards: Starter, Pro, Enterprise, with Pro visually featured and scaled.
- Annual/monthly billing toggle, feature comparison table, FAQ, final CTA, and footer.
- Marketing-style navigation state that highlights pricing while staying consistent with the existing CodePulse AI brand.

Current codebase anchors:
- `apps/web/src/App.tsx` has no `/pricing` route yet, so the pricing page will need new route wiring.
- `apps/web/src/pages/LoginPage.tsx` is the closest public-facing entry surface and can link into pricing.
- `apps/web/src/pages/AdminPage.tsx` already mentions subscription controls, so it is the natural operational companion for plan management.
- `apps/web/src/components/layout/AppShell.tsx`, `Topbar.tsx`, `Sidebar.tsx`, and `styles/index.css` define the shared shell and theme that the pricing page must harmonize with.
- `apps/web/src/pages/ConnectGithub.tsx` and `DashboardPage.tsx` show the current red-noir direction and can serve as visual references.

## Implementation Phases

### 1. Establish the pricing visual system
- Refine `apps/web/src/styles/index.css` so the pricing page can use a deeper noir backdrop, stronger ambient glow, and more deliberate red accents.
- Standardize glass panels, borders, and shadows for marketing sections, plan cards, tables, and FAQ blocks.
- Preserve readability for the comparison table and billing toggle against the dark background.

### 2. Build the pricing hero and plan cards
- Create a dedicated `apps/web/src/pages/PricingPage.tsx` that implements the pricing hero, headline, supporting copy, and billing toggle.
- Add the three pricing cards with clear hierarchy: Starter, Pro, Enterprise.
- Make Pro the featured option using the visual treatment from the draft: red border, scale emphasis, and stronger glow.

### 3. Add comparison and conversion sections
- Implement the detailed feature comparison table with checkmarks across all plans.
- Add the FAQ section and final CTA so the page ends with a strong conversion path instead of stopping at the cards.
- Include footer content that fits the brand and keeps the page feeling complete.

### 4. Wire the page into the product
- Add a `/pricing` route in `apps/web/src/App.tsx` and connect it to the new pricing page.
- Surface a clear entry point from the login/marketing experience so the page is discoverable.
- If needed, update admin subscription controls so they point back to the same plan model and terminology.

### 5. Align reusable components
- Reuse and refine shared shell, button, and panel patterns before introducing page-specific pricing primitives.
- Extract reusable pricing card, comparison row, or FAQ components only if the page starts repeating patterns.
- Keep typography, spacing, radius, and motion behavior consistent with the broader CodePulse AI visual language.

## Suggested File Work

- `apps/web/src/pages/PricingPage.tsx`
- `apps/web/src/App.tsx`
- `apps/web/src/pages/LoginPage.tsx`
- `apps/web/src/pages/AdminPage.tsx`
- `apps/web/src/components/layout/AppShell.tsx`
- `apps/web/src/components/layout/Topbar.tsx`
- `apps/web/src/components/layout/Sidebar.tsx`
- `apps/web/src/styles/index.css`

## Validation Checklist

- Verify the pricing page renders cleanly at desktop and mobile widths.
- Confirm the Pro plan is visually emphasized without breaking the overall hierarchy.
- Check the billing toggle, table, FAQ, and CTA for contrast and spacing against the dark theme.
- Run the web app build and typecheck after the route and page changes are implemented.

## Notes

- The fetched design is a standalone pricing/upgrade page, not a dashboard or onboarding flow.
- The repo currently lacks a pricing route, so the implementation should include both the page and the route wiring.