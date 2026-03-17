import asyncio
import os
import json
from google import genai
from app.engine.personas.b2b_exec import B2BExecutivePersona
from app.engine.personas.gen_z_consumer import GenZConsumerPersona

async def run_live_demo():
    print("======================================================")
    print("PHANTOM AI - TARGET GROUP LLM LIVE DEMO")
    print("======================================================\n")
    
    if not os.environ.get("GEMINI_API_KEY"):
        print("WARNING: GEMINI_API_KEY environment variable not set.")
        print("Running in DEMO MODE with simulated LLM Cognitive Outputs.\n")
        
        print("------------------------------------------------------")
        print("PERSONA 1: B2B EXECUTIVE (VP of Engineering)")
        print("------------------------------------------------------")
        print("Generating Cognitive Response...\n")
        print("--- LLM RAW OUTPUT ---")
        print('''{
  "action": "CLICK",
  "target": "nav-pricing",
  "thought": "I need to know the Enterprise cost for 100 users. I don't have time to 'Book a Demo' just to get a basic number. I'm clicking the Pricing link. If the tier says 'Contact Sales', I am immediately bouncing from this site.",
  "friction_score": 0.2
}''')
        print("----------------------\n\n")
        
        print("------------------------------------------------------")
        print("PERSONA 2: GEN-Z CONSUMER (19yo College Student)")
        print("------------------------------------------------------")
        print("Generating Cognitive Response...\n")
        print("--- LLM RAW OUTPUT ---")
        print('''{
  "action": "RAGE-QUIT",
  "target": "hidden-enterprise-tier",
  "thought": "Bro what even is this. Why is the enterprise price hidden? I have to talk to a human? Nah, I'm out. The UI is boring anyway.",
  "friction_score": 0.9
}''')
        print("----------------------\n\n")
        return
        
    client = genai.Client()
    
    # Mock data that would normally come from the user and the live scraper
    user_instructions = "Go to the pricing page and try to figure out how much the Enterprise plan costs for 100 users."
    mock_dom_state = {
        "interactive_elements": [
            {"id": "nav-pricing", "type": "link", "text": "Pricing", "visible": True},
            {"id": "btn-demo", "type": "button", "text": "Book a Demo", "visible": True},
            {"id": "hidden-enterprise-tier", "type": "div", "text": "Contact Sales for Enterprise", "visible": False}
        ]
    }
    current_url = "https://tryphantom.dev/home"
    
    print("Initializing Ghost LLM Brains (Gemini 2.5 Flash)...\n")
    
    # 1. B2B Executive Persona
    print("------------------------------------------------------")
    print("PERSONA 1: B2B EXECUTIVE (VP of Engineering)")
    print("------------------------------------------------------")
    b2b_exec = B2BExecutivePersona()
    b2b_system_prompt = b2b_exec.generate_system_prompt(user_instructions, mock_dom_state, current_url)
    
    print("Generating Cognitive Response...")
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents='Begin evaluation.',
            config={
                "system_instruction": b2b_system_prompt,
                "temperature": 0.4 # Slightly deterministic to follow rules
            }
        )
        print("\n\n--- LLM RAW OUTPUT ---")
        print(response.text)
        print("----------------------\n\n")
    except Exception as e:
        print(f"FAILED TO CONTACT GEMINI: {e}")
        
    
    # 2. Gen-Z Consumer Persona
    print("------------------------------------------------------")
    print("PERSONA 2: GEN-Z CONSUMER (19yo College Student)")
    print("------------------------------------------------------")
    gen_z = GenZConsumerPersona()
    gen_z_system_prompt = gen_z.generate_system_prompt(user_instructions, mock_dom_state, current_url)
    
    print("Generating Cognitive Response...")
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents='Begin evaluation.',
            config={
                "system_instruction": gen_z_system_prompt,
                "temperature": 0.9 # More chaotic for Gen-Z
            }
        )
        print("\n\n--- LLM RAW OUTPUT ---")
        print(response.text)
        print("----------------------\n\n")
    except Exception as e:
        print(f"FAILED TO CONTACT GEMINI: {e}")

if __name__ == "__main__":
    asyncio.run(run_live_demo())
