# Y Combinator S26 Application Draft

**Company name:** Phantom AI
**Company url:** https://tryphantom.dev
**Describe what your company does in 50 characters or less:**
Headless browser swarms for automated UX testing.

## Company Description (What are you building?)
We don't sell bots; we summon ghosts. Phantom uses state-of-the-art vision LLMs tied to headless Chromium instances via CDP (Chrome DevTools Protocol). Our engine simulates specific target personas (e.g., "B2B Executive") who navigate our clients' web applications autonomously. By tracking Cumulative Layout Shift (CLS), Input Delay (INP), and semantic frustration, we mathematically quantify "rage-clicks" and cognitive overload, replacing thousands of dollars in manual QA and beta testing.

## How far along are you?
We have built a fully functional MVP. Our Next.js front-end orchestrates a FastAPI Python backend. If an engineer provides a staging URL, our backend spins up headless Chromium instances, injects a defined persona context, and streams "thoughts" via WebSockets. **We have recently launched our "Forensic Substrate" which generates automated Diagnostic Certificates (PDF)** summarizing friction points and PMF velocity scores. We have a working lead magnet at `tryphantom.dev/roast` and are currently acquiring our first 10 beta testers.

## Why did you pick this idea to work on? Do you have domain expertise in this area? How do you know people need what you're making?
As developers, we realized that AI is fundamentally shifting the bottleneck of software engineering. Claude and Cursor can write thousands of lines of React code in seconds, but verifying that the code results in a good *user experience* still requires a human beta tester. Traditional E2E testing (Cypress, Playwright) is deterministic: it passes or fails based on an element selector. It cannot tell you if a user feels frustrated or if a form is confusing. We know founders need this because every B2B SaaS startup struggles with activation rates and "Silent Churn" where users drop off without ever filing a bug report.

## Who are your competitors, and who might become competitors? Who do you fear most?
Our indirect competitors are deterministic testing frameworks (Cypress, Playwright, Selenium) and passive analytics tools (PostHog, LogRocket). We fear passive analytics tools the most because if they successfully integrate active AI simulation into their massive existing datasets, they own the distribution channel. However, our advantage is that we are purpose-built for *semantic, proactive* testing during the CI/CD pipeline, catching the UX bug before the release, rather than recording a user getting angry after it is in production.

## If you had any other ideas you considered applying with, please list them. One may be something we've been waiting for.
- An AI native PR Agent for highly-technical devtool founders to secure organic distribution on HackerNews and Substack.
- A deterministic LLM reverse-engineering framework that maps undocumented legacy enterprise systems into modern GraphQL schemas.
