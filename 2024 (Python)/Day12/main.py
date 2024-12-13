import time
from itertools import product
from utilities import grid_cardinal_steps

def generate_region(grid, row, col, region_cells, visited):
    visited.add((row, col))
    region_cells.append((row,col))
    height = len(grid)
    width = len(grid[0])
    fences = 0

    for direction in grid_cardinal_steps:
        next_step = (row + direction[0], col + direction[1])
        if 0 <= next_step[0] < height and 0 <= next_step[1] < width and grid[row][col] == grid[next_step[0]][next_step[1]]:
            if next_step not in visited:
                fences += generate_region(grid, next_step[0], next_step[1], region_cells, visited)
        else:
            fences += 1
    return fences

def solve_part_one(input_data):
    grid = [list(x for x in line) for line in input_data]
    visited = set()
    regions = []
    for row, col in product(range(len(grid)), range(len(grid[0]))):
        if (row, col) not in visited:
            new_region = []
            region_fences = generate_region(grid, row, col,new_region, visited)
            regions.append((new_region, region_fences))

    price = 0
    for region in regions:
        price += len(region[0]) * region[1] 
    return price

# def count_corners(grid, row, col):


def solve_part_two(input_data):
    grid = [list(x for x in line) for line in input_data]
    visited = set()
    regions = []
    for row, col in product(range(len(grid)), range(len(grid[0]))):
        if (row, col) not in visited:
            new_region = []
            generate_region(grid, row, col,new_region, visited)
            regions.append(new_region)

    return "part 2 not done"

expected_sample_one = 1930
expected_sample_two = 1206
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