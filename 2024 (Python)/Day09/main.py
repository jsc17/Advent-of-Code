import time
import re

def solve_part_one(inputData):
    file_map = []
    index = 0
    for line in inputData:
        for x in range(len(line)):
            if x % 2 == 0:
                file_map.extend([index]*int(line[x]))
                index += 1
            else:
                file_map.extend(["."]*int(line[x]))
    empty_index = 0
    last_file_index = len(file_map) - 1
    while True:
        while file_map[empty_index] != ".":
            empty_index += 1
        while file_map[last_file_index] == ".":
            last_file_index -= 1
        if empty_index >= last_file_index:
            break
        file_map[empty_index] = file_map[last_file_index]
        file_map[last_file_index] = "."

    checksum = 0
    for x in range(len(file_map)):
        if file_map[x] == ".":
            continue
        checksum += x * file_map[x]   
    return checksum

def solve_part_two(inputData):
    file_map = []
    file_blocks = []
    empty_blocks = []
    index = 0
    for line in inputData:
        for x in range(len(line)):
            if x % 2 == 0:
                file_blocks.append((len(file_map), int(line[x])))
                file_map.extend([index]*int(line[x]))
                index += 1
            else:
                if line[x] != "0":
                    empty_blocks.append((len(file_map), int(line[x])))
                    file_map.extend(["."]*int(line[x]))
    for current_file in reversed(range(len(file_blocks))):
        for current_empty_block in range(len(empty_blocks)):
            if empty_blocks[current_empty_block][0] >= file_blocks[current_file][0]:
                break
            if file_blocks[current_file][1] <= empty_blocks[current_empty_block][1]:
                file_id = file_map[file_blocks[current_file][0]]
                for x in range(file_blocks[current_file][1]):
                    file_map[empty_blocks[current_empty_block][0] + x] = file_id
                    file_map[file_blocks[current_file][0] + x] = "."
                empty_blocks[current_empty_block] = (empty_blocks[current_empty_block][0] + file_blocks[current_file][1], empty_blocks[current_empty_block][1] - file_blocks[current_file][1])
                break
    
    checksum = 0
    for x in range(len(file_map)):
        if file_map[x] == ".":
            continue
        checksum += x * int(file_map[x])   
    return checksum

expected_sample_one = 1928
expected_sample_two = 2858
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