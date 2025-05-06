from ibm_watson import SpeechToTextV1
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator

# Your IBM Cloud credentials
API_KEY = '2PMrpEpkUD1Fy25cDRJz3EpC6adasa3JiKrAQ0dAbqdF'
SERVICE_URL = 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/d5c86f3a-8730-41d1-a253-45b5364eb80d'

# Set up authentication and service
authenticator = IAMAuthenticator(API_KEY)
speech_to_text = SpeechToTextV1(authenticator=authenticator)
speech_to_text.set_service_url(SERVICE_URL)

# Open the audio file (make sure it's WAV, MP3, or FLAC)
with open("C:\\Users\\tiasz\\Downloads\\audioduaspessoas.mp3", 'rb') as audio_file:
    result = speech_to_text.recognize(
        audio=audio_file,
        content_type='audio/mp3',
        model='pt-BR_BroadbandModel',
        smart_formatting=True
    ).get_result()

# Print the transcription
for transcript in result['results']:
    print(transcript['alternatives'][0]['transcript'])
