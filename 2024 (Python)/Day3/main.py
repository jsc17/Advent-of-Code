import re

def parseInput(filename):
    inputFile = open(filename)
    fileLines = inputFile.read().splitlines()
    inputFile.close()
    return fileLines

def mul(instruction):
    values = instruction[4:-1].split(",")
    return int(values[0]) * int(values[1])

def solvePart1(inputData):
    result = 0
    instructions = []
    for line in inputData:
        for match in re.findall(r"mul\(\d+,\d+\)", line):
            instructions.append(match)
            
    for instruction in instructions:
        values = instruction[4:-1].split(",")
        result += int(values[0]) * int(values[1])
        
    return result

def solvePart2(inputData):
    result = 0
    blocks = []
    data = ""
    for line in inputData:
        data += line
    blocks = re.split(r"do\(\)", data)

    print(len(blocks))
    instructions = []
    for block in blocks:
        ending = re.search(r"don't\(\)", block)
        if ending == None:
            instructions.extend(re.findall(r"mul\(\d+,\d+\)", block))
        else:
            instructions.extend(re.findall(r"mul\(\d+,\d+\)", block[:ending.start()]))
    for instruction in instructions:
        values = instruction[4:-1].split(",")
        result += int(values[0]) * int(values[1])
        
    return result

expectedSample1 = 161
expectedSample2 = 48
def main():
    sampleInput = parseInput("sample.txt")
    sampleResult = solvePart1(sampleInput)
    print(sampleResult)
    if sampleResult == expectedSample1:
        inputData = parseInput("input.txt")
        result1 = solvePart1(inputData)
        print(result1)

    sampleInput = parseInput("sample2.txt")
    sampleResult = solvePart2(sampleInput)
    print(sampleResult)
    if sampleResult == expectedSample2:
        inputData = parseInput("input.txt")
        result1 = solvePart2(inputData)
        print(result1)
main()