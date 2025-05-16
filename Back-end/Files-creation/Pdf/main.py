from reportlab.lib.pagesizes import letter
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
from reportlab.pdfgen import canvas
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from dotenv import load_dotenv
import assemblyai as aai
from Transcription.main import transcript_audio


file = "/home/matiaszuniga/Downloads/audiotest.mp3"


def add_title(doc):
    doc.append(Spacer(1, 20))
    doc.append(Paragraph('Transcription', ParagraphStyle(name='Name',
                                                          fontFamily='Helvetica',
                                                          fontSize=26,
                                                          alignment=TA_CENTER)))
    doc.append(Spacer(1, 50))
    return doc


def add_paragraphs(doc, transcription: aai.Transcript):
    for utterance in transcription.utterances:
        doc.append(Paragraph(f"-{utterance.speaker}: "))
        doc.append(Paragraph(utterance.text))
    # with open('Files-creation/Pdf/text.txt') as txt:
    #     for line in txt.read().split('\n'):
    #         print(line)
    #         doc.append(Paragraph(line))
    #         doc.append(Spacer(1, 20))
    return doc

if __name__ == "__main__":
    document = []
    transcription = transcript_audio(file)

    document = add_title(document)

    SimpleDocTemplate('output3.pdf', pagesize=letter,
                      rightMargin=12, leftMargin=12,
                      topMargin=12, bottomMargin=6).build(add_paragraphs(document, transcription))
