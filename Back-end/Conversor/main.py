from moviepy.editor import VideoFileClip

video = "C:\\Users\\ingri\\Videos\\redes.mp4"
audio = "C:\\Users\\ingri\\Videos\\redes.mp3"

def MP4ToMP3(mp4, mp3):
    FILETOCONVERT = AudioFileClip(mp4)
    FILETOCONVERT.write_audiofile(mp3)
    FILETOCONVERT.close()

MP4ToMP3(video, audio)