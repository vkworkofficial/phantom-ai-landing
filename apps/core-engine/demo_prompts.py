import asyncio
import json
from app.engine.personas.b2b_exec import B2BExecutivePersona
from app.engine.personas.gen_z_consumer import GenZConsumerPersona

async def run_demo():
    print("======================================================")
    print("PHANTOM AI - TARGET GROUP PROMPT ENGINE DEMO")
    print("======================================================\n")
    
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
    
    # 1. B2B Executive Persona
    print("------------------------------------------------------")
    print("PERSONA 1: B2B EXECUTIVE (VP of Engineering)")
    print("------------------------------------------------------")
    b2b_exec = B2BExecutivePersona()
    b2b_prompt = b2b_exec.generate_system_prompt(user_instructions, mock_dom_state, current_url)
    print(b2b_prompt)
    print("\n\n")
    
    # 2. Gen-Z Consumer Persona
    print("------------------------------------------------------")
    print("PERSONA 2: GEN-Z CONSUMER (19yo College Student)")
    print("------------------------------------------------------")
    gen_z = GenZConsumerPersona()
    gen_z_prompt = gen_z.generate_system_prompt(user_instructions, mock_dom_state, current_url)
    print(gen_z_prompt)
    print("\n======================================================")

if __name__ == "__main__":
    asyncio.run(run_demo())
