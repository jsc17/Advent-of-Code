def solvePart1(inputData):
    return "Part 1 not done"

def solvePart2(inputData):
    return "Part 2 not done"

expectedSample1 = 143
expectedSample2 = 0
def main():
    sampleInput = []
    inputData = []
    with open("sample.txt") as file:
        sampleInput = file.read().splitlines()
    with open("input.txt") as file:
        inputData = file.read().splitlines()

    sampleResult = solvePart1(sampleInput)
    print(sampleResult)
    if sampleResult == expectedSample1:
        result1 = solvePart1(inputData)
        print(result1)

    sampleResult = solvePart2(sampleInput)
    print(sampleResult)
    if sampleResult == expectedSample2:
        result1 = solvePart2(inputData)
        print(result1)
main()