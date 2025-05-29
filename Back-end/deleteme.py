import datetime

now = datetime.datetime.now()

time = now.time()

time = time.strftime("%H:%M:%S:%f")
print(time)