import time
from itertools import product
from utilities import grid_cardinal_steps

def find_adjacent(row, col, grid, reachable):
    trails = 0
    if grid[row][col] == 9:
        reachable.add((row, col))
        return 1
    for direction in grid_cardinal_steps:
        next_coordinate = (row + direction[0], col + direction[1])
        if len(grid) > next_coordinate[0] >= 0 and len(grid[0]) > next_coordinate[1] >= 0 and grid[next_coordinate[0]][next_coordinate[1]] - grid[row][col] == 1:
            trails += find_adjacent(next_coordinate[0], next_coordinate[1], grid, reachable)
    return trails

def solve_part_one(input_data):
    grid = [list(int(x) for x in line) for line in input_data]

    total_score = 0
    for row, col in product(range(len(grid)), range(len(grid[0]))):
        if grid[row][col] == 0:
            reachable = set()
            find_adjacent(row, col, grid, reachable)
            total_score += len(reachable)
    return total_score

def solve_part_two(input_data):
    grid = [list(int(x) for x in line) for line in input_data]

    total_score = 0
    total_rating = 0
    for row, col in product(range(len(grid)), range(len(grid[0]))):
        if grid[row][col] == 0:
            reachable = set()
            total_rating += find_adjacent(row, col, grid, reachable)
            total_score += len(reachable)
    return total_rating

expected_sample_one = 36
expected_sample_two = 81
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