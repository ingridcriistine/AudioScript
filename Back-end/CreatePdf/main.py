from reportlab.lib.pagesizes import letter
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from dotenv import load_dotenv
from assemblyai import Transcript


file = "/home/matiaszuniga/Downloads/audiotest.mp3"

styles = getSampleStyleSheet()
title_style = ParagraphStyle(
    name='TitleStyle',
    parent=styles['Title'],
    fontSize=26,
    alignment=TA_CENTER,
    spaceAfter=20
)

speaker_style = ParagraphStyle(
    name='SpeakerStyle',
    parent=styles['Normal'],
    fontSize=12,
    spaceAfter=6,
    spaceBefore=6,
    leftIndent=12
)

utterance_style = ParagraphStyle(
    name='UtteranceStyle',
    parent=styles['Normal'],
    fontSize=12,
    leftIndent=24,
    spaceAfter=10
)


def add_title(doc):
    doc.append(Spacer(1, 20))
    doc.append(Paragraph('Transcription', title_style))
    doc.append(Spacer(1, 30))
    return doc

def add_paragraphs(doc, transcriptions: list[Transcript]):
    for transcription in transcriptions:
        for utterance in transcription.utterances:
            speaker_paragraph = Paragraph(f"<b>{utterance.speaker}:</b>", speaker_style)
            text_paragraph = Paragraph(utterance.text, utterance_style)
            doc.extend([speaker_paragraph, text_paragraph])
    return doc


def create_pdf(transcriptions, file_name: str):
    document = []
    document = add_title(document)
    document = add_paragraphs(document, transcriptions)

    pdf = SimpleDocTemplate(
        f'{file_name}.pdf',
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=20
    )
    pdf.build(document)
    
    print(f'PDF file {file_name}.pdf created')
    return f'{file_name}.pdf'
