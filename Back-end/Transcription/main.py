import assemblyai as aai

aai.settings.api_key = "79252efbe20e4ee39b6a0eb578504b5b"

# audio_file = "./local_file.mp3"
file = "C:\\Users\\tiasz\\Downloads\\audioduaspessoas.mp3"

config = aai.TranscriptionConfig(speaker_labels=True, language_code="pt", speech_model=aai.SpeechModel.nano)

transcript = aai.Transcriber().transcribe(file, config=config)

for utterance in transcript.utterances:
  print(f"Speaker {utterance.speaker}: {utterance.text}")

