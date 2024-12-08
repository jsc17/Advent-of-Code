def parseInput(filename):
    inputFile = open(filename)
    fileLines = inputFile.read().splitlines()
    inputFile.close()

    list1 = []
    list2 = []
    for line in fileLines:
        splitLine = line.split("   ")
        list1.append(int(splitLine[0]))
        list2.append(int(splitLine[1]))
    list1.sort()
    list2.sort()
    return list1, list2

def solvePart1(list1, list2):
    totalDifference = 0
    while len(list1) and len(list2):
        totalDifference += abs(list1[0] - list2[0])
        list1.pop(0)
        list2.pop(0)

    return totalDifference

def solvePart2(list1, list2):
    similarityScore = 0
    for x in list1:
        y = list2.count(x)
        similarityScore += x * y

    return similarityScore

def part1():
    sampleList1, sampleList2 = parseInput("sample.txt")
    sampleResult = solvePart1(sampleList1, sampleList2)
    print(sampleResult)
    if sampleResult == 11:
        list1, list2 = parseInput("input.txt")
        result = solvePart1(list1, list2)
        print(result)

def part2():
    sampleList1, sampleList2 = parseInput("sample.txt")
    sampleResult2 = solvePart2(sampleList1, sampleList2)
    print(sampleResult2)
    if sampleResult2 == 31:
        list1, list2 = parseInput("input.txt")
        result2 = solvePart2(list1, list2)
        print(result2)

part1()
part2()