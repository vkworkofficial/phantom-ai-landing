import asyncio
import aiohttp
import json
import time
from datetime import datetime

# Phantom Forensic Benchmark Engine
# Targets: YC S26 Competitor Dataset

COMPETITORS = [
    {"name": "PostHog", "url": "https://posthog.com"},
    {"name": "Hotjar", "url": "https://hotjar.com"},
    {"name": "LogRocket", "url": "https://logrocket.com"},
    {"name": "FullStory", "url": "https://fullstory.com"},
    {"name": "Microsoft Clarity", "url": "https://clarity.microsoft.com"}
]

ENGINE_URL = "http://localhost:8000/api/v1"
MASTER_KEY = "phantom_master_forensic_key"

async def benchmark_url(session, target):
    print(f"Initiating Forensic Séance for {target['name']} ({target['url']})...")
    payload = {
        "target_url": target['url'],
        "num_ghosts": 50,
        "personas": ["standard_user", "power_user"]
    }
    headers = {"X-Phantom-Key": MASTER_KEY}
    
    try:
        async with session.post(f"{ENGINE_URL}/simulations/ensemble", json=payload, headers=headers) as resp:
            if resp.status == 200:
                data = await resp.json()
                print(f"SUCCESS: {target['name']} HFS: {data.get('confusion_score', 'N/A')}")
                return {**target, "hfs": data.get("confusion_score", 0), "status": "analyzed"}
            else:
                print(f"FAILED: {target['name']} Status: {resp.status}")
                return {**target, "status": "failed"}
    except Exception as e:
        print(f"ERROR: {target['name']} - {str(e)}")
        return {**target, "status": "error"}

async def run_benchmark():
    async with aiohttp.ClientSession() as session:
        tasks = [benchmark_url(session, comp) for comp in COMPETITORS]
        results = await asyncio.gather(*tasks)
    
    # Save results to a forensic JSON for the leaderboard
    with open("competitor_benchmarks.json", "w") as f:
        json.dump(results, f, indent=2)
    print("\nBenchmark Protocol Complete. Results saved to competitor_benchmarks.json")

if __name__ == "__main__":
    asyncio.run(run_benchmark())
