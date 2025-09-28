# Repository Guidelines

## Project Structure & Module Organization
Source code follows the Next.js App Router layout. Screens and API handlers live under `app/`, with feature-specific folders such as `(dashboard)/` and `(onboarding)/`. Reusable UI primitives are in `components/ui`, while feature widgets live in `components/{feature}`. Shared state helpers reside in `hooks/`, domain data in `data/`, and formatting or API utilities in `lib/`. Static assets are stored in `public/`, and Tailwind configuration lives in `styles/` and `tailwind.config.ts`.

## Build, Test, and Development Commands
Use `npm install` once per environment to sync dependencies. Run `npm run dev` for the local dev server at http://localhost:3000. Ship-ready builds use `npm run build`, followed by `npm run start` to serve the optimized bundle. Execute `npm run lint` before submitting work to catch TypeScript, accessibility, and Tailwind issues.

## Coding Style & Naming Conventions
TypeScript is required across the app. Follow Prettier defaults (two-space indent, single quotes avoided) and keep imports sorted logically. React components should use PascalCase file names, hooks start with `use`, and utility modules use camelCase. Tailwind classes are auto-sorted via `prettier-plugin-tailwindcss`; keep variant ordering consistent (layout → spacing → typography). Prefer functional React components and colocate small CSS overrides in the component file.

## Testing Guidelines
This skeleton does not ship with automated tests yet; add `*.test.tsx` files alongside components when introducing business logic. Favor React Testing Library for UI behaviours and consider high-value integration tests in `app/` routes. Document any manual verification steps in PR descriptions until an automated suite is in place. Keep coverage expectations high for ROI calculations and card lifecycle logic.

## Commit & Pull Request Guidelines
Follow the existing log by prefixing commit summaries with the touched area (e.g., `ui/`, `feat/`). Keep messages imperative and under 72 characters. Pull requests must include: scope summary, testing notes (commands, screenshots for UI), and links to tracking issues or specs (`requirements.md`). Request review from at least one teammate and wait for CI lint checks to pass before merging.

## Security & Configuration Notes
Store secrets in `.env.local` (never commit) and copy the template from `.env.example` when onboarding. When integrating the AI route, validate that `OPENAI_API_KEY` exists before making requests, and avoid logging credentials or full API responses.
