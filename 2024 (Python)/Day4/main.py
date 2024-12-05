def solvePart1(inputData):
    result = 0
    for yIndex, y in enumerate(inputData):
        for xIndex, x in enumerate(y):
            if inputData[yIndex][xIndex] == "X":
                for direction in [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]:
                    xStep, yStep = direction
                    containsXmax = True
                    xmasString = "XMAS"
                    for step in range(1,4):
                        tempX = step * xStep + xIndex
                        tempY = step * yStep + yIndex
                        if tempX < 0 or tempX >= len(inputData[yIndex]) or tempY < 0 or tempY >= len(inputData):
                            containsXmax = False
                            break
                        elif inputData[tempY][tempX] != xmasString[step]:
                            containsXmax = False 
                    if containsXmax:
                        result += 1
    return result

def solvePart2(inputData):
    result = 0
    for yIndex, y in enumerate(inputData):
        for xIndex, x in enumerate(y):
            if inputData[yIndex][xIndex] == "A":
                masLines = 0
                for line in (((-1,-1), (1,1)), ((1,-1), (-1,1))):
                    hasS = False
                    hasM = False
                    for direction in line:
                        xStep, yStep = direction
                        tempX = xStep + xIndex
                        tempY = yStep + yIndex
                        if tempX >= 0 and tempX < len(inputData[yIndex]) and tempY >= 0 and tempY < len(inputData):
                            if inputData[tempY][tempX] == "M":
                                hasM = True
                            if inputData[tempY][tempX] == "S":
                                hasS = True
                    if hasM and hasS:
                        masLines += 1
                if masLines == 2:
                    result += 1
    return result

expectedSample1 = 18
expectedSample2 = 9
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