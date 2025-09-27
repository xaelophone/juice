# Credit Card Rewards Tracker — UX Spec (Hackathon-ready)

## 0) Product Pillars (P0 scope)
- **Benefits Library → Tasks:** Select a card → auto-generate a checklist of perks.  
- **Progress & Value:** Track completions and show *cash value realized* vs *annual fee*.  
- **Quarter/Month Logic:** Handle benefit reset windows and remaining time.  
- **Fast Input:** Manual “mark as used” + quick notes/receipt link.  

---

## 1) Primary Screens

### Welcome / Onboarding
- Promise: “Juice your cards for all they're worth.”  
- CTA: “Add a card” (Dropdown. Show "American Express Platinum" and "Chase Sapphire Reserve" as options).  

### Card Setup
- Preloaded perks with toggles.  
- Example: “Resy dining credit — $100/quarter.”  
- Save → generates this quarter’s task instances.  

### Dashboard
- Top summary: value used, potential, net ROI.  
- Per-card stacks with perk checklists.  
- CTA: “Add another card.”  

### Perk Details
- Terms snapshot.  
- Mark as used (date, amount, optional note/receipt).  
- Shows remaining and lifetime usage.  

### History
- Timeline of completions with filters.  

### Settings
- Currency.  

---

## 2) Core Flows

### Onboarding
1. Add card → perks appear → save → dashboard.  
2. Generate tasks for current reset periods.  

### Add/Remove Cards
- **Add:** select card, enable perks → merges into dashboard.  
- **Remove:** confirm → delete card + history.  

### Complete Reward
- Open perk modal → mark as used → amount applied.  
- Moves to used list, updates totals, confetti micro-moment.  

### Progress & Value Computation
- **Perk value realized** = sum of completions capped.  
- **Net ROI** = total realized – annual fees.  
- **Capture rate** = realized / total potential.  

---

## 3) Extra Flows (Recommended)
- **What to Use Next:** Nudge banner showing “Closest to expiry” perk.  
- **Custom Perk:** Manual creation (name, cap, cadence, reset).  
- **Lightweight Sign-in:** Email magic link or local storage only.  

---

## 4) Information Architecture

**Entities**  
- `Card` → id, name, fee, perks[]  
- `Perk` → id, card_id, title, cap, cadence, reset anchor, tags  
- `PerkInstance` → period start/end, status, amounts  
- `Completion` → date, amount, note, receipt URL  

---

## 5) States & Empty States
- **New user:** “Add a card.”  
- **All perks used:** 100% captured, preview next reset.  
- **Disabled perks:** Grayed out, excluded from totals.  
- **Near expiry:** Badge “Due soon.”  

---

## 6) Credit Card Rewards
We will feature two credit cards first: American Express Platinum & Chase Sapphire Reserve. Both cards were recently refreshed with updated rewards and new annual fees. Use web search to find their full list of updated rewards and their new annual fee:
- **American Express Platinum:** Updated in September 2025. Use this following webpage as the starting point of your research: https://www.nerdwallet.com/article/credit-cards/benefits-american-express-platinum
- **Chase Sapphire Reserve:** Updated in June 2025. Use this following webpage as the starting point of your research: https://www.lendingtree.com/credit-cards/articles/chase-sapphire-reserve-benefits/

---

## 7) Interaction & Microcopy
- Checkboxes + “mark partial” option.  
- Progress bars per perk/card.  
- Undo snackbar after completion.  

---

## 8) Accessibility & Speed
- Semantic HTML + keyboard friendly.  
- Single-page app, localStorage persistence.  

---

## 9) Technical Notes
- **Stack:** Next.js + localStorage (P0).
- **UI & Components:** ShadCN UI
- **OpenAI API:** Use GPT-5 for all AI related features. Only use the Responses API (https://platform.openai.com/docs/api-reference/responses).

---

## 10) Demo Script
1. Start with pain: “I lose $300 of perks every year.”  
2. Add American Express Platinum → perks appear.  
3. Dashboard shows ROI summary.  
4. Mark Saks $50 used → ROI jumps, confetti.  
5. Add second card → totals update.  
6. Show “Due Soon” badge.  
7. Roadmap: Plaid integration + reminders.  

---

## 11) Edge Cases
- Prorated first period (no need to worry about prorated periods).  
- Partial usage.
- Anniversary vs calendar resets (simplify for MVP).  
- Non-cash perks excluded from ROI calculation.  