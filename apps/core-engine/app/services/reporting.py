from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image
from reportlab.lib.units import inch
from datetime import datetime
import io
import os
from typing import Optional
from app.models.simulation import SeanceReport

class ForensicReportGenerator:
    """
    Generates high-fidelity 'Diagnostic Certificates' (PDF) for Phantom AI simulations.
    Designed for YC S26 pitch-level aesthetics.
    """
    
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()

    def _setup_custom_styles(self):
        self.styles.add(ParagraphStyle(
            name='PhantomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor=colors.HexColor("#1A1A1A"),
            spaceAfter=20,
            alignment=1 # Center
        ))
        self.styles.add(ParagraphStyle(
            name='PhantomMetric',
            parent=self.styles['Normal'],
            fontSize=12,
            textColor=colors.HexColor("#4A4A4A"),
            spaceAfter=10
        ))
        self.styles.add(ParagraphStyle(
            name='ForensicLabel',
            parent=self.styles['Normal'],
            fontSize=10,
            textColor=colors.HexColor("#888888"),
            bold=True
        ))

    def generate(self, report: SeanceReport) -> io.BytesIO:
        buffer = io.BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
        
        elements = []

        # Header: Branding
        elements.append(Paragraph("PHANTOM AI: FORENSIC DIAGNOSTIC", self.styles['PhantomTitle']))
        elements.append(Paragraph(f"Certificate of Behavioral Friction | Generated {datetime.now().strftime('%Y-%m-%d %H:%M')}", self.styles['ForensicLabel']))
        elements.append(Spacer(1, 0.5 * inch))

        # Core Metrics Section
        data = [
            ["Target URL", str(report.target_url)],
            ["Simulation ID", report.id],
            ["Ghost Swarms Deployed", str(report.ghosts_deployed)],
            ["Confusion Score", f"{report.confusion_score:.2f}%"],
            ["PMF Velocity Score", f"{report.pmf_score:.2f}%"]
        ]
        
        t = Table(data, colWidths=[2*inch, 4*inch])
        t.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (0, -1), colors.whitesmoke),
            ('TEXTCOLOR', (0, 0), (0, -1), colors.black),
            ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
            ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.grey)
        ]))
        elements.append(t)
        elements.append(Spacer(1, 0.5 * inch))

        # Forensic Deep Dive
        elements.append(Paragraph("Forensic Narrative", self.styles['Heading2']))
        narrative = f"During the seance, Phantom ghosts detected significant intent-fracture on the target interface. " \
                    f"The confusion score of {report.confusion_score:.1f}% indicates a breakdown in semantic clarity."
        elements.append(Paragraph(narrative, self.styles['Normal']))
        elements.append(Spacer(1, 0.25 * inch))

        # Footer
        elements.append(Spacer(1, 2 * inch))
        elements.append(Paragraph("This document is a synthetic simulation output and is intended for product-market fit validation only.", self.styles['ForensicLabel']))
        elements.append(Paragraph("© 2026 Phantom Labs. S26 Launch Substrate.", self.styles['ForensicLabel']))

        doc.build(elements)
        buffer.seek(0)
        return buffer

forensic_reporter = ForensicReportGenerator()
