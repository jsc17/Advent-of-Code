import time
from itertools import combinations, product

def solve_part_one(inputData):
    grid = [list(x) for x in inputData]
    height = len(grid)
    width = len(grid[0])
    antenna_list = {}
    antinodes = set()

    for row, col in product(range(height), range(width)):
        if grid[row][col] not in ".":
            antenna_list.setdefault(grid[row][col], []).append((row, col)) 

    for frequency in antenna_list:
        for a, b in combinations(antenna_list[frequency], 2):
            step = (b[0] - a[0], b[1] - a[1])
            if 0 <= a[0] - step[0] < height and 0 <= a[1] - step[1] < width:
                antinodes.add((a[0] - step[0], a[1] - step[1]))
            if 0 <= b[0] + step[0] < height and 0 <= b[1] + step[1] < width:
                antinodes.add((b[0] + step[0], b[1] + step[1]))
    return len(antinodes)

def solve_part_two(inputData):

    grid = [list(x) for x in inputData]
    height = len(grid)
    width = len(grid[0])
    antenna_list = {}
    antinodes = set()

    for row, col in product(range(height), range(width)):
        if grid[row][col] not in ".":
            antenna_list.setdefault(grid[row][col], []).append((row, col)) 

    for frequency in antenna_list:
        for a, b in combinations(antenna_list[frequency], 2):
            step = (b[0] - a[0], b[1] - a[1])
            antinodes.add(a)
            antinodes.add(b)
            while 0 <= a[0] - step[0] < height and 0 <= a[1] - step[1] < width:
                a = (a[0] - step[0], a[1] - step[1])
                antinodes.add(a)
            while 0 <= b[0] + step[0] < height and 0 <= b[1] + step[1] < width:
                b = (b[0] + step[0], b[1] + step[1])
                antinodes.add(b)

    return len(antinodes)

expected_sample_one = 14
expected_sample_two = 34
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