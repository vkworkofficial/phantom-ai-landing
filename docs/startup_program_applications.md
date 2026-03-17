# The Master Application File

*Use this document to copy-paste answers directly into AWS Activate, Google Cloud, Vercel, Microsoft, and PostHog startup program applications. The narrative is optimized to sound highly technical and ambitious.*

---

## 50-Character Elevator Pitch
Headless browser swarms for automated UX testing.

## 150-Character Description
Phantom deploys swarms of autonomous synthetic users to test your staging environments, catching rage-clicks and UX friction before your real users do.

## 500-Character Technical Description
We don't sell bots; we summon ghosts. Phantom uses state-of-the-art vision LLMs tied to headless Chromium instances via CDP (Chrome DevTools Protocol). Our engine simulates specific target personas (e.g., "B2B Executive") who navigate our clients' web applications autonomously. By tracking Cumulative Layout Shift (CLS), Input Delay (INP), and semantic frustration, we mathematically quantify "rage-clicks" and cognitive overload, replacing thousands of dollars in manual QA and beta testing.

## Q: What problem are you solving? (Why this, why now?)
Traditional QA testing is fundamentally broken. E2E testing frameworks like Cypress or Playwright verify that a button exists, but they cannot tell you if a user feels frustrated clicking it. Beta testing takes weeks to organize, and user feedback is often qualitative and biased. Furthermore, as AI slashes the time needed to ship code, the bottleneck in software development has entirely shifted from *writing* software to *testing* software. Phantom solves this by treating human behavior as a load-testing problem. We allow founders to hit a single API endpoint and immediately see how 10,000 synthetic B2B personas react to their new feature flag natively in the DOM.

## Q: How are you using [Provider's Service]?

**For AWS Activate / Google Cloud:**
"We require high-concurrency, short-lived compute environments to orchestrate ephemeral headless Chromium browsers via Playwright. We use [ECS Fargate / Cloud Run] to sandbox these agent execution environments safely. Additionally, we stream massive amounts of JSON telemetry (DOM nodes, network traffic, rendering metrics) from the browsers back to our analytical engine, requiring high-bandwidth egress and low-latency message queues ([SQS / PubSub])."

**For Microsoft Founders Hub (Azure OpenAI):**
"Our core cognitive inference engine evaluates the raw HTML/DOM parsing of web pages. We require massive token windows and high-rate-limit access to advanced foundational models. We plan to utilize Azure OpenAI Service to deploy dedicated inference endpoints for semantic evaluation, ensuring low latency when our swarms are processing complex WebGL or highly interactive React applications."

**For Vercel for Startups:**
"Our frontend is built on Next.js 14 utilizing React Server Components. We rely heavily on Vercel's Edge runtime and WebSockets to stream real-time logging and cognitive telemetry from our Python backend directly to the user dashboard. As we scale the 'Roast My UX' lead magnet, we need Vercel Pro capabilities to handle traffic spikes and edge caching."

---

## Competitor / Differentiation Question
*If asked how you differ from existing tools (like Selenium, Cypress, LogRocket).*

We sit perfectly between deterministic testing (Cypress) and passive analytics (LogRocket). Cypress is deterministic; it fails if a button moves 2 pixels. LogRocket is passive; it records real users getting angry in production. Phantom is active, synthetic, and semantic. We find the anger *in staging* before the user ever sees it, by simulating the cognitive load of interacting with the interface.
