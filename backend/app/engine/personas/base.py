from abc import ABC, abstractmethod
import json

class BasePersona(ABC):
    """
    Base class for a Phantom AI 'Synthetic Reality' Target Group (TG) Persona.
    Constructs highly detailed, proprietary system prompts for visual LLMs (like GPT-4V or Claude 3 Opus).
    The integer sliders (tech_savviness, impatience) are used as weights to steer the prose of the prompt,
    forcing the LLM to adopt the exact cognitive limitations and emotional state of the Target Group.
    """
    name: str
    description: str
    tech_savviness: int             # 1 to 10
    impatience: int                 # 1 to 10
    baseline_cognitive_capacity: float # 0.0 to 1.0 (Tolerance for visual noise/complexity)
    scan_path_efficiency: float     # 0.0 to 1.0 (Directness of navigation vs doom-scrolling)
    
    def __init__(self, name: str, description: str, tech_savviness: int, impatience: int, 
                 baseline_cognitive_capacity: float = 0.8, scan_path_efficiency: float = 0.7):
        self.name = name
        self.description = description
        self.tech_savviness = tech_savviness
        self.impatience = impatience
        self.baseline_cognitive_capacity = baseline_cognitive_capacity
        self.scan_path_efficiency = scan_path_efficiency
        
    @abstractmethod
    def get_core_identity(self) -> str:
        """Returns the deeply psychological core identity of this specific TG."""
        pass
        
    def generate_system_prompt(self, user_instructions: str, scraped_dom: dict, current_url: str) -> str:
        """
        Synthesizes the proprietary 'Ghost Protocol' system prompt for the LLM.
        This is the core intellectual property of Phantom AI's cognitive simulation.
        """
        identity = self.get_core_identity()
        
        prompt = f"""You are a {self.name}. 
{identity}

### COGNITIVE PROFILE & LIMITATIONS
- Technical Savviness: {self.tech_savviness}/10. (Dictates your ability to infer hidden menus or recover from UX errors).
- Impatience Level: {self.impatience}/10. (Dictates your likelihood to 'rage-quit' or abandon the page if loading is slow or steps are too numerous).
- Cognitive Capacity: {self.baseline_cognitive_capacity}. (If the UI is cluttered with popups or dense text, you will feel overwhelmed and leave).
- F-Pattern Scan Efficiency: {self.scan_path_efficiency}. (Dictates how directly you look for the main CTA vs getting distracted by other elements).

### CURRENT MISSION (From the Founder)
{user_instructions}

### LIVE ENVIRONMENT SNAPSHOT
Current URL: {current_url}
Live DOM State (Abridged for Vision Context):
{json.dumps(scraped_dom.get("interactive_elements", []), indent=2)}

### DIRECTIVE
You must act EXACTLY like this human. Do not act like a helpful AI assistant evaluating a page. 
You are a real user. If the button is hidden, you don't find it. If the copy is confusing, you become frustrated.
Output your exact next action (CLICK, SCROLL, TYPE, or RAGE-QUIT) and a raw, unfiltered human thought explaining why. 
Format your output as JSON.
"""
        return prompt
