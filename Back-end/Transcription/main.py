import assemblyai as aai

aai.settings.api_key = "79252efbe20e4ee39b6a0eb578504b5b"

# audio_file = "./local_file.mp3"
audio_file = "C:\\Users\\tiasz\\OneDrive\\Imagens\\Álbum de cámara\\WIN_20250505_16_25_32_Pro.mp4"

config = aai.TranscriptionConfig(speech_model=aai.SpeechModel.best)

transcript = aai.Transcriber(config=config).transcribe(audio_file)

if transcript.status == "error":
  raise RuntimeError(f"Transcription failed: {transcript.error}")

print(transcript.text)
