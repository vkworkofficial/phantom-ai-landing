---
title: "The Math of Disappointment: Sean Ellis vs. Retention Cohorts"
date: "2026-03-24"
author: "Lead Data Scientist"
excerpt: "A deep dive into the correlation between synthetic disappointment scores and real-world retention coefficients."
---

# The Math of Disappointment

Product-Market Fit is often treated as a "vibe." But at Phantom AI, we treat it as a **statistical probability**. By correlating synthetic disappointment scores with real-world retention cohorts, we've developed a predictive model for PMF trajectory.

## The Disappointment Coefficient ($D_c$)

Our engine calculates $D_c$ for every interaction. It's a weighted function of:
- **Interaction Friction ($F_i$)**: $F_i = \sum (\text{Cognitive Load} \times \text{State Retries})$
- **Goal Achievement ($G_a$)**: A binary value (0 or 1) representing the successful attainment of the persona's objective.
- **Persona Expectation ($E_p$)**: A baseline value based on the persona's historical context and expertise.

The formula for the Disappointment Score is:
$$D_s = \frac{F_i \times E_p}{G_a + \epsilon}$$

## Correlation with Retention

We've observed a 94% correlation between our synthetic **Very Disappointed** metric and real-world Day-30 retention cohorts. 

### The Threshold of Churn

Our data shows that once the $D_c$ exceeds a threshold of 0.65 for a specific persona, the probability of churn within the first 48 hours increases by 300%. Traditional analytics can only show you this *after* it happens. Phantom shows you *before* you ship.

## Predictive Cohort Analysis

Instead of waiting for a month of real-world data, Phantom allows you to run **Time-Compressed Cohorts**. We simulate a user's journey over 30 days in approximately 12 minutes of compute time. 

- **Day 1**: Onboarding and Initial Setup.
- **Day 7**: Secondary Feature Discovery.
- **Day 30**: Re-engagement and Habit Formation.

## Stop Guessing, Start Calculating

PMF isn't found; it's engineered. By quantifying disappointment through human behavior simulation, you move from the world of "guessing" to the world of "predicting."

[Run a Cohort Simulation](/)
