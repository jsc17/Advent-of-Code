import time
import re
import numpy as np
import math

def solve_part_one(input_data):
    machines = []
    while input_data:
        a_button = re.sub("[^0-9,]", "", input_data.pop(0)).split(",")
        b_button = re.sub("[^0-9,]", "", input_data.pop(0)).split(",")
        prize = re.sub("[^0-9,]", "", input_data.pop(0)).split(",")
        if input_data:
            input_data.pop(0)
        machines.append(((int(a_button[0]), int(a_button[1])), (int(b_button[0]), int(b_button[1])), (int(prize[0]), int(prize[1])),))

    costs = []
    for machine in machines:
        prize_found = False
        a_presses = 0
        b_presses = 0
        for a_press in range(100):
            for b_press in range(100):
                if a_press * machine[0][0] + b_press * machine[1][0] == machine[2][0] and a_press * machine[0][1] + b_press * machine[1][1] == machine[2][1]:
                    prize_found = True
                    a_presses = a_press
                    b_presses = b_press
        if prize_found:
            costs.append((a_presses, b_presses))
    total_cost = 0
    for cost in costs:
        total_cost += cost[0] * 3 + cost[1]
    return total_cost

# cramers rule. 
def solve_part_two(input_data):
    total_cost = 0
    total = 0
    tolerance = 0.01
    while input_data:
        a_button = re.sub("[^0-9,]", "", input_data.pop(0)).split(",")
        b_button = re.sub("[^0-9,]", "", input_data.pop(0)).split(",")
        prize = re.sub("[^0-9,]", "", input_data.pop(0)).split(",")
        if input_data:
            input_data.pop(0)

        ax = int(a_button[0]) 
        ay = int(a_button[1])
        bx = int(b_button[0])
        by = int(b_button[1])
        px = int(prize[0]) + 10000000000000
        py = int(prize[1]) + 10000000000000

        a_presses = (px * by - bx * py) / (ax * by - bx * ay)
        b_presses = (ax*py - px*ay) / (ax * by - bx * ay)

        # if math.isclose(a_presses, round(a_presses), abs_tol=tolerance) and math.isclose(b_presses, round(b_presses), abs_tol=tolerance):
        if a_presses.is_integer() and b_presses.is_integer():
            total_cost += a_presses * 3 + b_presses

        A = (bx*py - by*px) / (bx*ay - by*ax)
        B = (px-ax*A) / bx
        if a_presses != A and b_presses != B:
            print(a_presses, A)
            print(b_presses, B)
        if abs(A - round(A)) < tolerance and abs(B - round(B)) < tolerance:
            total += 3*A + B
        
    print("Test 2 Result =", total)
    return total_cost

expected_sample_one = 480
expected_sample_two = 100
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
        # sample_result = solve_part_two(sample_input)

        with open("input.txt") as file:
            input_data = file.read().splitlines()
            result = solve_part_two(input_data)
            print(f"Part 2 Result = {result} - {time.perf_counter() - start_time:.3f}s")

    else:
        print("Part 1 Sample Incorrect")
main()