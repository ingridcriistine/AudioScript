from dotenv import load_dotenv
import assemblyai as aai
import os

load_dotenv()

APIKEY = os.getenv("ASSEMBLYAPIKEY")
aai.settings.api_key = APIKEY

def transcribe_audio(audio_path: str) -> aai.Transcript:
  config = aai.TranscriptionConfig(speaker_labels=True, language_code="pt", speech_model=aai.SpeechModel.nano)
  transcript = aai.Transcriber().transcribe(audio_path, config=config)
  return transcript

# transcript = transcript_audio(file)

# for utterance in transcript.utterances:
#   print(f"Speaker {utterance.speaker}: {utterance.text}")

