def parseInput(filename):
    inputFile = open(filename)
    fileLines = inputFile.read().splitlines()
    inputFile.close()
    return "Parsing not done"

def solvePart1(inputData):
    return "Part 1 not done"

def solvePart2(inputData):
    return "Part 2 not done"

expectedSample1 = 0
expectedSample2 = 0
def main():
    sampleInput = parseInput("sample.txt")
    sampleResult = solvePart1(sampleInput)
    print(sampleResult)
    if sampleResult == expectedSample1:
        inputData = parseInput("input.txt")
        result1 = solvePart1(inputData)
        print(result1)

    sampleInput = parseInput("sample.txt")
    sampleResult = solvePart2(sampleInput)
    print(sampleResult)
    if sampleResult == expectedSample2:
        inputData = parseInput("input.txt")
        result1 = solvePart2(inputData)
        print(result1)
main()