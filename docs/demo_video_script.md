# Phantom AI: The 60-Second "Aha!" Demo Script

*This is the blueprint for the primary demo asset to be used on Product Hunt, Y Combinator applications, and cold email outreach to B2B founders.*

## Video Specifications
- **Length:** 60 - 90 seconds.
- **Aspect Ratio:** 16:9 (Desktop) and 9:16 (Twitter/LinkedIn Shorts).
- **Style:** Fast-paced, Loom-style screen recording with a highly confident voiceover. No fluff.

## The Script & Visuals

**[0:00 - 0:05] The Hook (The Problem)**
*Visual:* The screen shows a beautiful, complex SaaS dashboard (e.g., Vercel, Stripe, or a staging environment of Phantom itself). Someone is frantically clicking around, looking for a hidden settings toggle.
*Voiceover:* "You just shipped a massive redesign. Cypress says all the buttons exist. PostHog says people are logging in. But your activation rate just dropped 15%. Why?"

**[0:05 - 0:15] The Introduction (The Solution)**
*Visual:* Switch to the Phantom AI terminal CLI or the sleek `tryphantom.dev` dashboard. 
*Voiceover:* "Because deterministic tests can't feel frustration. Phantom can. We use vision LLMs and headless browser swarms to load-test human behavior natively in the DOM."

**[0:15 - 0:35] The Magic (The "Aha!" Moment)**
*Visual:* The user opens the Phantom Dashboard and types in `localhost:3000/settings` (or the staging URL). They select the persona: "Non-Technical Enterprise Buyer." They hit *Simulate*.
The screen splits. On the left: a headless Chromium instance furiously navigating the site. On the right: The real-time WebSocket dashboard streaming the AI's internal monologue and friction metrics.
*Voiceover:* "Watch what happens when we send a synthetic B2B Executive Persona into our own staging environment. Within seconds, it parses the DOM, identifies the cognitive friction caused by a misaligned form, and flags a potential 'Rage Click'—all before your real users ever see it."

**[0:35 - 0:45] The Value Proposition**
*Visual:* Zoom in on the specific JSON thought stream where the agent says: `"I am confused by the wording of the 'Delete Account' modal. It implies my data is saved."`
*Voiceover:* "This isn't generic QA. This is semantic empathy at scale. Phantom catches the silent churn that passive analytics misses."

**[0:45 - 0:60] The Call to Action**
*Visual:* The screen transitions to the brutalist Phantom Front Door landing page, specifically the `/roast` section.
*Voiceover:* "Stop waiting for beta testers to get angry. Test your UX at the speed of thought. Drop your staging URL at tryphantom.dev and let our swarms roast your friction."

---
## Execution Checklist for Founder
1. Ensure `GEMINI_API_KEY` is loaded.
2. Record the left/right split-screen using OBS or ScreenFlow.
3. Keep the mouse movements fast and precise.
4. Export in 4K for maximum clarity of the glowing amber/abyssal black UI.
