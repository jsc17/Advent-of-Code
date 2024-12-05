def solvePart1(inputData):
    rules = [line.split("|") for line in inputData if "|" in line]
    updates = [line.split(",") for line in inputData if "," in line]

    result = 0
    for update in updates:
        correctOrder = True
        for rule in rules:
            if rule[0] not in update or rule[1] not in update or update.index(rule[0]) < update.index(rule[1]):
                continue
            else: 
                correctOrder = False
        if correctOrder:
            result += int(update[(len(update)//2)])
    return result

def solvePart2(inputData):
    rules = [line.split("|") for line in inputData if "|" in line]
    updates = [line.split(",") for line in inputData if "," in line]

    result = 0
    for update in updates:
        correctOrder = False
        fixed = False
        while not correctOrder:
            correctOrder = True
            for rule in rules:
                if rule[0] not in update or rule[1] not in update or update.index(rule[0]) < update.index(rule[1]):
                    continue
                else:
                    index1 = update.index(rule[1])
                    index2 = update.index(rule[0])
                    update[index1] = rule[0]
                    update[index2] = rule[1]
                    fixed = True
                    correctOrder = False
        if fixed:
            result += int(update[(len(update)//2)])

    return result

expectedSample1 = 143
expectedSample2 = 123
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