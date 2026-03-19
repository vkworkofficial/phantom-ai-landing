import asyncio
import aiohttp
import time
import json
import statistics

BASE_URL = "http://localhost:8000/api/v1"
MASTER_KEY = "phantom_master_forensic_key"

async def run_ensemble_request(session, sim_id):
    payload = {
        "target_url": f"https://example.com/test-{sim_id}",
        "num_ghosts": 10,
        "personas": ["standard"]
    }
    headers = {"X-Phantom-Key": MASTER_KEY}
    
    start = time.time()
    try:
        async with session.post(f"{BASE_URL}/simulations/ensemble", json=payload, headers=headers) as resp:
            status = resp.status
            data = await resp.json()
            duration = time.time() - start
            return {"status": status, "duration": duration, "sim_id": sim_id}
    except Exception as e:
        return {"status": "error", "error": str(e), "duration": time.time() - start, "sim_id": sim_id}

async def run_swarm_test(concurrency=10):
    print(f"Initiating Phantom Swarm Load Test (Concurrency: {concurrency})...")
    async with aiohttp.ClientSession() as session:
        tasks = [run_ensemble_request(session, i) for i in range(concurrency)]
        results = await asyncio.gather(*tasks)
        
    durations = [r["duration"] for r in results if r["status"] == 200]
    errors = [r for r in results if r["status"] != 200]
    
    print("\n--- Swarm Results ---")
    print(f"Total Requests: {len(results)}")
    print(f"Successful: {len(durations)}")
    print(f"Failed/Errors: {len(errors)}")
    
    if durations:
        print(f"Avg Latency: {statistics.mean(durations):.4f}s")
        print(f"Min Latency: {min(durations):.4f}s")
        print(f"Max Latency: {max(durations):.4f}s")
        print(f"P95 Latency: {statistics.quantiles(durations, n=20)[18]:.4f}s")

if __name__ == "__main__":
    # This script is designed for a running substrate.
    # In a local assistant environment, we verify the CODE logic.
    asyncio.run(run_swarm_test(concurrency=20))
