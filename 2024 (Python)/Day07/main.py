import time

def calculate(value, current, numbers):
    if not numbers:
        return value == current
    elif current > value:
        return False
    else:
        next_number = numbers.pop(0)
        return calculate(value, current + next_number, numbers.copy()) or calculate(value, current * next_number, numbers.copy())

def solve_part_one(inputData):
    total_results = 0
    for line in inputData:
        result, numbers = line.split(": ")
        result = int(result)
        numbers = [int(x) for x in numbers.split(" ")]
        initial = numbers.pop(0)
        if calculate(result, initial, numbers):
            total_results += result
    return total_results

def calculate_part_two(value, current, numbers):
    if not numbers:
        return value == current
    elif current > value:
        return False
    else:
        next_number = numbers.pop(0)
        concatated_number = int(str(current) + str(next_number))
        return calculate_part_two(value, current + next_number, numbers.copy()) or calculate_part_two(value, current * next_number, numbers.copy()) or calculate_part_two(value, concatated_number, numbers.copy())

def solve_part_two(inputData):
    total_results = 0
    for line in inputData:
        result, numbers = line.split(": ")
        result = int(result)
        numbers = [int(x) for x in numbers.split(" ")]
        initial = numbers.pop(0)
        if calculate_part_two(result, initial, numbers):
            total_results += result
    return total_results

expected_sample_one = 3749
expected_sample_two = 11387
def main():
    start_time = time.perf_counter()
    sample_input = []
    input_data = []
    with open("sample.txt") as file:
        sample_input = file.read().splitlines()
    with open("input.txt") as file:
        input_data = file.read().splitlines()

    sample_result = solve_part_one(sample_input)
    print(f"Part 1 Sample = {sample_result} - {time.perf_counter() - start_time:.3f}s")
    if sample_result == expected_sample_one:
        result = solve_part_one(input_data)
        print(f"Part 1 Result = {result} - {time.perf_counter() - start_time:.3f}s")
        sample_result = solve_part_two(sample_input)
        print(f"Part 2 Sample = {sample_result} - {time.perf_counter() - start_time:.3f}s")
        if sample_result == expected_sample_two:
            result = solve_part_two(input_data)
            print(f"Part 2 Result = {result} - {time.perf_counter() - start_time:.3f}s")
        else:
            print("Part 2 Sample Incorrect")
    else:
        print("Part 1 Sample Incorrect")
main()