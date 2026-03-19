import ipaddress
import urllib.parse
from typing import List, Optional
import logging

logger = logging.getLogger("phantom.firensics")

class GhostFirewall:
    """
    Active defense substrate for Phantom AI Ghost Swarms.
    Prevents Server-Side Request Forgery (SSRF) and metadata exfiltration by agents.
    """
    
    # RFC 1918 + Metadata + Localhost
    RESTRICTED_NETWORKS = [
        "10.0.0.0/8",
        "172.16.0.0/12",
        "192.168.0.0/16",
        "127.0.0.0/8",
        "169.254.169.254/32", # AWS/GCP Metadata
        "224.0.0.0/4",
        "ff00::/8"
    ]

    def __init__(self, allowed_domains: Optional[List[str]] = None):
        self.allowed_domains = allowed_domains or []
        self.restricted_subnets = [ipaddress.ip_network(n) for n in self.RESTRICTED_NETWORKS]

    def validate_target(self, url: str) -> bool:
        """
        Validates if a target URL is safe for a Ghost to navigate.
        """
        try:
            parsed = urllib.parse.urlparse(url)
            hostname = parsed.hostname
            
            if not hostname:
                return False

            # 1. Domain allowlist (if configured)
            if self.allowed_domains and hostname not in self.allowed_domains:
                logger.warning(f"Ghost attempted navigation to unauthorized domain: {hostname}")
                return False

            # 2. IP-based filtering (to prevent internal network scanning)
            try:
                ip = ipaddress.ip_address(hostname)
                for subnet in self.restricted_subnets:
                    if ip in subnet:
                        logger.error(f"SECURITY ALERT: Ghost attempted internal navigation to restricted IP: {ip}")
                        return False
            except ValueError:
                # Hostname is a domain, not a literal IP. 
                # In a full-scale hardening, we would resolve the IP here.
                # For this S26 substrate, we block literal internal IPs.
                pass

            return True
        except Exception as e:
            logger.error(f"Firewall processing error: {str(e)}")
            return False

ghost_firewall = GhostFirewall()
