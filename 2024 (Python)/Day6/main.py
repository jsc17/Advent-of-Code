import time
from utilities import *

def follow_path(start, grid):
    row_count = len(grid)
    col_count = len(grid[0])
    visited = set()
    curr_row, curr_col = start
    next_row, next_col = steps_from_direction.get("^")

    while True:
        visited.add((curr_row, curr_col))
        if curr_row + next_row < 0 or curr_row + next_row >= row_count or curr_col + next_col < 0 or curr_col + next_col >= col_count:
            break
        if grid[curr_row + next_row][curr_col + next_col] in "O#":
            next_row, next_col = rotate_cardinal_step((next_row,next_col))
        else:
            curr_row += next_row
            curr_col += next_col 
            
    return visited

def solve_part_one(input_data):
    grid = [list(row) for row in input_data]

    start = None
    for rowId, row in enumerate(grid):
        if "^" in row:
            colId = row.index("^")
            start = (rowId, colId)

    visited = follow_path(start, grid)
    return len(visited)

def find_looped_path(start, grid):
    row_count = len(grid)
    col_count = len(grid[0])
    visited = set()
    curr_row, curr_col = start
    next_row, next_col = steps_from_direction.get("^")

    looped = False
    while True:
        if (curr_row, curr_col, next_row, next_col) in visited:
            looped = True
            break
        visited.add((curr_row, curr_col, next_row, next_col))
        if curr_row + next_row < 0 or curr_row + next_row >= row_count or curr_col + next_col < 0 or curr_col + next_col >= col_count:
            break
        if grid[curr_row + next_row][curr_col + next_col] in "O#":
            next_row, next_col = rotate_cardinal_step((next_row,next_col))
        else:
            curr_row += next_row
            curr_col += next_col 
            
    return looped

def solve_part_two(input_data):
    grid = [list(row) for row in input_data]

    start = None
    for rowId, row in enumerate(grid):
        if "^" in row:
            colId = row.index("^")
            start = (rowId, colId)

    visited = follow_path(start, grid)

    looped = 0
    for rowId, row in enumerate(grid):
        for colId, col in enumerate(row):
            if (rowId, colId) in visited and grid[rowId][colId] == ".":
                grid[rowId][colId] = "O"
                if find_looped_path(start, grid):
                    looped += 1             
                grid[rowId][colId] = "."

    return looped

expected_sample1 = 41
expected_sample2 = 6

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
    if sample_result == expected_sample1:
        result = solve_part_one(input_data)
        print(f"Part 1 Result = {result} - {time.perf_counter() - start_time:.3f}s")
        sample_result = solve_part_two(sample_input)
        print(f"Part 2 Sample = {sample_result} - {time.perf_counter() - start_time:.3f}s")
        if sample_result == expected_sample2:
            result = solve_part_two(input_data)
            print(f"Part 2 Result = {result} - {time.perf_counter() - start_time:.3f}s")
        else:
            print("Part 2 Sample Incorrect")
    else:
        print("Part 1 Sample Incorrect")
main()