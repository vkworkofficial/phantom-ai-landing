import logging
import sys
import os
from logging.handlers import RotatingFileHandler

# Forensic Logging Substrate
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s"

def setup_substrate_logger():
    logger = logging.getLogger("phantom_substrate")
    logger.setLevel(logging.INFO)

    # Console Handler (High-Fidelity Output)
    c_handler = logging.StreamHandler(sys.stdout)
    c_handler.setFormatter(logging.Formatter(LOG_FORMAT))
    logger.addHandler(c_handler)

    # File Handler (Forensic Persistence)
    log_dir = "logs"
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)
        
    f_handler = RotatingFileHandler(
        os.path.join(log_dir, "phantom_substrate.log"), 
        maxBytes=10*1024*1024, 
        backupCount=5
    )
    f_handler.setFormatter(logging.Formatter(LOG_FORMAT))
    logger.addHandler(f_handler)
    
    return logger

substrate_logger = setup_substrate_logger()
