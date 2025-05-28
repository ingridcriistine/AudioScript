from reportlab.lib.pagesizes import letter
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
import assemblyai as aai
import logging


file = "/home/matiaszuniga/Downloads/audiotest.mp3"


def add_title(doc):
    doc.append(Spacer(1, 20))
    doc.append(Paragraph('Transcription', ParagraphStyle(
        name='Name',
        fontFamily='Helvetica',
        fontSize=26,
        alignment=TA_CENTER))
    )
    doc.append(Spacer(1, 50))
    return doc

def add_paragraphs(doc, transcriptions: list[aai.Transcript]):
    for transcription in transcriptions:
        for utterance in transcription.utterances:
            doc.append(Paragraph(f"-{utterance.speaker}: "))
            doc.append(Paragraph(utterance.text))
    return doc

def create_pdf(transcriptions,file_name: str):
    document = []
    document = add_title(document)
    SimpleDocTemplate(f'{file_name}.pdf', pagesize=letter,
                    rightMargin=12, leftMargin=12,
                    topMargin=12, bottomMargin=6).build(add_paragraphs(document, transcriptions))
    logging.info(f'Pdf file {file_name} created')
    return f'{file_name}.pdf'
