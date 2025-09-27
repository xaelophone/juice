# Juice Rewards Tracker

Hackathon-ready Next.js app skeleton for tracking credit card perks and ROI, based on the product spec in `requirements.md`.

## Features
- App router layout with onboarding, dashboard, history, and settings screens.
- Pre-seeded data for American Express Platinum and Chase Sapphire Reserve perks.
- LocalStorage-powered state for card selection, perk completions, and settings.
- ShadCN-style UI primitives (buttons, cards, dialog, etc.) with Tailwind CSS.
- Currency switcher and ROI calculations (realized, potential, net ROI, capture rate).
- Placeholder OpenAI Responses API route for perk copy generation.

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Run the dev server
   ```bash
   npm run dev
   ```
3. Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY` if you plan to call the AI endpoint.

## Project Structure
```
app/
  (onboarding)/welcome/page.tsx  # landing & card picker
  (dashboard)/layout.tsx         # shared app shell
  (dashboard)/dashboard/page.tsx # ROI dashboard
  (dashboard)/history/page.tsx   # completion timeline
  (dashboard)/settings/page.tsx  # currency and input prefs
  api/perk-copy/route.ts         # OpenAI Responses API hook
components/
  dashboard/…                    # summary and card stack UI
  onboarding/…                   # card selection UI
  history/…                      # history timeline
  layout/…                       # app shell navigation
  settings/…                     # settings forms
  ui/…                           # shadcn-inspired primitives
  perks/…                        # perk dialog for completions
hooks/                           # local storage + state helpers
lib/                             # formatting and OpenAI utilities
data/                            # seeded card + perk definitions
```

## Next Steps
- Flesh out quarterly reset logic and expiring perk nudges.
- Add validation/tests around ROI calculations and cadence handling.
- Integrate additional cards or custom perk creation flow.
- Connect the AI route to a UI action (e.g., perk summary suggestions).
