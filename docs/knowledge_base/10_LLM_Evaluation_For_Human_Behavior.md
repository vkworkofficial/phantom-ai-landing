# LLM Evaluation for Human Behavior

## The Paradigm Shift in QA
Traditional QA testing evaluates software deterministically (Does the button click?). Phantom evaluates software probabilistically (Will the user understand the button?).

## Evaluating the "Ghosts"
To prove Phantom works to enterprise buyers, we must adopt established ML evaluation metrics for human behavior:
1. **Explainability & Interpretability:** The system must provide a clear rationale for *why* an LLM flagged a UI element as confusing. Black-box "this is bad" output is rejected by developers.
2. **Factuality / Faithfulness:** The Ghost's critique must be grounded strictly in the provided DOM and screenshot, free from LLM hallucination.
3. **Consistency vs Persona:** An "Impatient Teenager" Ghost and a "Distracted Enterprise Buyer" Ghost must yield reliably different scores for the same UI.

## Actionable Phantom Takeaway
Phantom must implement an internal **"Evaluation Framework"** (inspired by tools like DeepEval or Ragas) that runs unit tests on our own LLM agents. We must be able to prove to customers: "Our 'Frustrated User' persona has a 94% alignment accuracy with real human frustration benchmarks."
