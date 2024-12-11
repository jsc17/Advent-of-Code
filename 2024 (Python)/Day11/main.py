import time

def solve_part_one(input_data):
    stones = {}
    for x in input_data[0].split():
        stones[int(x)] = stones.setdefault(int(x), 0) + 1
    for _ in range(25):
        blink_stones = {}
        for x in stones:
            stone_string = str(x)
            stone_length = len(str(x))
            if x == 0:
                blink_stones[1] = blink_stones.setdefault(1, 0) + stones[x]
            elif stone_length % 2 == 0:
                blink_stones[int(stone_string[:int(stone_length/2)])] = blink_stones.setdefault(int(stone_string[:int(stone_length/2)]), 0) + stones[x]
                blink_stones[int(stone_string[int(stone_length/2):])] = blink_stones.setdefault(int(stone_string[int(stone_length/2):]), 0) + stones[x] 
            else: 
                blink_stones[x*2024] = blink_stones.setdefault(x*2024, 0) + stones[x]
        stones = blink_stones.copy()
        print(len(stones))

    return sum(stones.values())

def solve_part_two(input_data):
    stones = {}
    for x in input_data[0].split():
        stones[int(x)] = stones.get(int(x), 0) + 1
    for _ in range(75):
        blink_stones = {}
        for x in stones:
            stone_string = str(x)
            stone_length = len(str(x))
            if x == 0:
                blink_stones[1] = blink_stones.setdefault(1, 0) + stones[x]
            elif stone_length % 2 == 0:
                first_stone = int(stone_string[:stone_length//2])
                second_stone = int(stone_string[stone_length//2:])
                blink_stones[first_stone] = blink_stones.get(first_stone, 0) + stones[x]
                blink_stones[second_stone] = blink_stones.get(second_stone, 0) + stones[x] 
            else: 
                blink_stones[x*2024] = blink_stones.get(x*2024, 0) + stones[x]
        stones = blink_stones.copy()
        print(len(stones))
    return sum(stones.values())


expected_sample_one = 55312
expected_sample_two = 0
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
        sample_result = solve_part_two(input_data)
        print(f"Part 2 Sample = {sample_result} - {time.perf_counter() - start_time:.3f}s")
        if sample_result == expected_sample_two:
            result = solve_part_two(input_data)
            print(f"Part 2 Result = {result} - {time.perf_counter() - start_time:.3f}s")
        else:
            print("Part 2 Sample Incorrect")
    else:
        print("Part 1 Sample Incorrect")
main()