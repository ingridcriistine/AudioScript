import moviepy as mp
import re
from time import timezone


PATH=r"/home/matiaszuniga/Downloads/videoone.mp4"

def get_filename_with_filepath(file_path):
    pattern = r'([^/\\]+)\.[^/\\]+$'
    match = re.search(pattern, file_path)
    filename_with_extension = match.group(1)
    file_name_without_extension = filename_with_extension.split('.')[0]    
    return file_name_without_extension

def get_path_without_extension(file_path: str):
    path_without_extension = file_path.split('.')
    return path_without_extension[0]

def transcribe_mp4_to_mp3(file_path):
    clip = mp.VideoFileClip(file_path)
    file_path_without_extension = get_path_without_extension(str(file_path))
    file_path_with_extension = file_path_without_extension + ".mp3"
    clip.audio.write_audiofile(rf"{file_path_with_extension}")


# returned = transcribe_mp4_to_mp3(PATH)
