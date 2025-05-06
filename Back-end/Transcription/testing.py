import speech_recognition as sr
recognizer = sr.Recognizer()
with sr.AudioFile("C:\\Users\\tiasz\\Downloads\\audioduaspessoaswav.wav") as source:
    audio = recognizer.record(source)
try:
    text = recognizer.recognize_google(audio, language='pt-BR')
    print(text)
except sr.UnknownValueError:
    print("Could not understand audio")
except sr.RequestError as e:
    print(f"Could not request results from service; {e}")