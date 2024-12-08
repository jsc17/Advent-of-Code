def parseInput(filename):
    inputFile = open(filename)
    fileLines = inputFile.read().splitlines()
    inputFile.close()
    reports = []
    for line in fileLines:
        reports.append(line.split(" "))
    return reports

def solvePart1(inputData):
    safeReportCount = 0
    for report in inputData:
        reportSafe = True
        index = 0
        direction = "unknown"
        while index < len(report) - 1:
            level = int(report[index])
            nextLevel = int(report[index + 1])
            if abs(level - nextLevel) > 3 or abs(level - nextLevel) < 1:
                reportSafe = False
            if level - nextLevel < 0:
                if direction == "unknown":
                    direction = "decreasing"
                elif direction == "increasing":
                    reportSafe = False
            if level - nextLevel > 0:
                if direction == "unknown":
                    direction = "increasing"
                elif direction == "decreasing":
                    reportSafe = False       
            index += 1
        if reportSafe:
            safeReportCount += 1   
    return safeReportCount

def checkReport(report):
    reportSafe = True
    index = 0
    direction = "unknown"
    while index < len(report) - 1:
        level = int(report[index])
        nextLevel = int(report[index + 1])
        if abs(level - nextLevel) > 3 or abs(level - nextLevel) < 1:
            reportSafe = False
        if level - nextLevel < 0:
            if direction == "unknown":
                direction = "decreasing"
            elif direction == "increasing":
                reportSafe = False
        if level - nextLevel > 0:
            if direction == "unknown":
                direction = "increasing"
            elif direction == "decreasing":
                reportSafe = False       
        index += 1
    return reportSafe
                
def solvePart2(inputData):
    safeReportCount = 0
    for report in inputData:
        reportSafe = checkReport(report)
        if reportSafe:
            safeReportCount += 1 
        else: 
            for idLevel, level in enumerate(report):
                  dampedReport = report.copy()
                  dampedReport.pop(idLevel)
                  dampedReportSafe = checkReport(dampedReport)
                  if dampedReportSafe:
                      safeReportCount += 1
                      break
    return safeReportCount

def part1():
    sampleInput = parseInput("sample.txt")
    print(sampleInput)
    sampleResult = solvePart1(sampleInput)
    print(sampleResult)
    if sampleResult == 2:
        inputData = parseInput("input.txt")
        result1 = solvePart1(inputData)
        print(result1)

def part2():
    sampleInput = parseInput("sample.txt")
    sampleResult = solvePart2(sampleInput)
    print(sampleResult)
    if sampleResult == 4:
        inputData = parseInput("input.txt")
        result1 = solvePart2(inputData)
        print(result1)
    else: 
        print("Sample Result incorrect")

part1()
part2()