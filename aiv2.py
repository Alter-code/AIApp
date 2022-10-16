# !pip install transformers==4.11.2 datasets soundfile sentencepiece torchaudio pyaudio

from cgitb import text
from transformers import *
import torch
import soundfile as sf
import torchaudio
import pyaudio
import wave
import keyboard
from tkinter import *


# model_name = "facebook/wav2vec2-base-960h" # 360MB
model_name = "facebook/wav2vec2-large-960h-lv60-self" # 1.18GB
# model_name = "jonatasgrosman/wav2vec2-xls-r-1b-polish"
audio_url = "recorded.wav"
processor = Wav2Vec2Processor.from_pretrained(model_name)
model = Wav2Vec2ForCTC.from_pretrained(model_name)


def transcript():
  speech, sr = torchaudio.load(audio_url)
  speech = speech.squeeze()
  sr, speech.shape
  resampler = torchaudio.transforms.Resample(sr, 16000)
  speech = resampler(speech)
  speech.shape
  input_values = processor(speech, return_tensors="pt", sampling_rate=16000)["input_values"]
  print(input_values.shape)
  logits = model(input_values)["logits"]
  logits.shape
  predicted_ids = torch.argmax(logits, dim=-1)
  predicted_ids.shape
  transcription = processor.decode(predicted_ids[0])
  return transcription.lower()
  
def record():

  filename = "recorded.wav"
  chunk = 1024
  FORMAT = pyaudio.paInt16
  channels = 1
  sample_rate = 16000
  #record_seconds = 10
  p = pyaudio.PyAudio()
  stream = p.open(format=FORMAT,channels=channels,rate=sample_rate,input=True,output=True,frames_per_buffer=chunk)
  frames = []
  print("Recording...")


  while(True):
    data = stream.read(chunk)
    frames.append(data)
    if keyboard.is_pressed('q'):  
      break  
      

  print("Finished recording.")
  stream.stop_stream()
  stream.close()
  p.terminate()
  wf = wave.open(filename, "wb")
  wf.setnchannels(channels)
  wf.setsampwidth(p.get_sample_size(FORMAT))
  wf.setframerate(sample_rate)
  wf.writeframes(b"".join(frames))
  wf.close()

# mian




