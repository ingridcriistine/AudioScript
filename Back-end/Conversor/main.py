import os
import re
from time import timezone

import moviepy as mp


PATH=r"/home/matiaszuniga/Repositories/audioscript-env/AudioScript/Back-end/mp3-files/WhatsApp Video 2025-07-03 at 14.32.36.mp4"
OUTPUT_FOLDER = "mp3-files"


def get_filename_with_filepath(file_path):
    pattern = r'([^/\\]+)\.[^/\\]+$'
    match = re.search(pattern, file_path)
    filename_with_extension = match.group(1)
    file_name_without_extension = filename_with_extension.split('.')[0]    
    return file_name_without_extension

def get_path_without_extension(file_path: str):
    path_without_extension = file_path.split('.')
    return path_without_extension[0]

def get_filename_with_mp3_extension(file_path: str) -> str:
    entire_filename = file_path.split("/")[-1]
    file_without_extension = entire_filename.split(".")[0]
    return f"{file_without_extension}.mp3"

def transform_mp4_to_mp3(file_path: str):
    filename = get_filename_with_mp3_extension(file_path)
    current_path = os.getcwd()
    output_path = f"{current_path}/{OUTPUT_FOLDER}/{filename}"

    video = mp.VideoFileClip(file_path)
    video.audio.write_audiofile(output_path)
    video.close()

if __name__=="__main__":
    transform_mp4_to_mp3(PATH)