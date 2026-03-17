# Phantom Startup Stack & Zero-Cost Infrastructure

As an early-stage, pre-seed startup, Phantom's objective is to achieve maximum runway with zero infrastructure costs until our Seed round. This document serves as the master directory for the Founder to claim thousands of dollars in startup credits.

## 1. Google for Startups Cloud Program
**Link:** [Google for Startups Cloud Program](https://cloud.google.com/startup)
**What we need it for:** 
- Running headless Chromium instances on **Google Cloud Run** at scale.
- Accessing **Vertex AI** for Gemini 2.5 Flash API credits once we exceed the free tier.
**Offer:** Up to $350,000 USD in Cloud Credits over 2 years (AI-first startups get more). At the minimum "Start" tier (no funding required), you get $2,000.
**Action:** The Founder must apply using the pre-written copy in `startup_program_applications.md`. 
*Interim Solution:* Use [Google AI Studio](https://aistudio.google.com/) for the free Gemini 2.5 Flash API key (1.5M Tokens/min free).

## 2. AWS Activate (Founders Tier)
**Link:** [AWS Activate](https://aws.amazon.com/activate/)
**What we need it for:** 
- Fallback infrastructure. If Cloud Run limits concurrency, we will deploy the Python engine to AWS ECS (Fargate) or EC2 spot instances.
**Offer:** Unfunded startups (Founders Tier) receive $1,000 in AWS Activate Credits and $350 in Developer Support.
**Action:** The Founder must apply using the pre-written copy.

## 3. Vercel for Startups
**Link:** [Vercel for Startups](https://vercel.com/startups)
**What we need it for:** Hosting the Next.js `frontend` application, Edge middleware, and Analytics.
**Offer:** 6 months of Vercel Pro for free (allows for custom domains, more team members, higher bandwidth).
**Action:** Apply immediately. 
*Interim Solution:* Deploy to the standard Vercel Hobby tier today for free.

## 4. Neon (Serverless Postgres)
**Link:** [Neon Startups](https://neon.tech/startups) or standard free tier.
**What we need it for:** Storing completed `SeanceReports`, `Friction Metrics`, and user accounts.
**Offer:** Neon offers a very generous free tier (0.5 GiB storage, 20 hrs active compute/month).
**Action:** The database is already configured in the `.env.example`. Create an account at `console.neon.tech` and paste the DB URL into the Vercel variables.

## 5. PostHog for Startups
**Link:** [PostHog Startups](https://posthog.com/startups)
**What we need it for:** Product analytics, funnel tracking, and session recording for the Phantom dashboard itself.
**Offer:** $50,000 in credit (lasts 12 months) + all Pro features. 
**Action:** Apply using the pre-written copy. 

## 6. Microsoft for Startups Founders Hub
**Link:** [Microsoft Founders Hub](https://startups.microsoft.com/)
**What we need it for:** OpenAI API Credits.
**Offer:** Up to $150,000 in Azure credits, which can be applied directly to **Azure OpenAI Services** to run GPT-4o-mini as a fallback logic engine if Gemini fails. Also includes free GitHub Enterprise and LinkedIn Premium.
**Action:** Apply using the pre-written copy. This is one of the highest ROI applications you can do today.

---

### CEO Execution Directive
**DO RIGHT NOW (5 Minutes):**
1. Get the Free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Create a free Vercel account and link the GitHub repo.
3. Create a free Neon DB and grab the URI.
*Total Cost: $0. Total Capable Scale: Thousands of synthetic simulation runs.*
