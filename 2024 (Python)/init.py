import os
import shutil
import requests
import datetime

# day = input("Please enter the current day: ")
date = datetime.datetime.now()
day = date.strftime("%d")
print(f"Creating folder for day {day}, 2024")
os.makedirs(f"Day{day}")

print("Copying files from template")
for file in os.listdir("Template"):
    shutil.copy(f"Template/{file}", f"Day{day}/{file}")

print("Getting input from AOC site")
with open("../session_id.txt") as session_file:
    session_id = session_file.read().strip()
    r = requests.get(f'https://adventofcode.com/2024/day/{day.lstrip("0")}/input', cookies={"session": session_id})

with open(f"Day{day}/input.txt", "w") as inputFile:
    inputFile.write(r.text)
print(f"Day {day} setup complete")

