direction_arrows = "^>V<"

direction_from_arrows = {
    "^": "North",
    ">": "East",
    "V": "South",
    "<": "West"
}

# (row, col) change
steps_from_direction = {
    **dict.fromkeys(["N", "North", "^"], (-1,0)),
    **dict.fromkeys(["E", "East", ">"], (0,1)),
    **dict.fromkeys(["S", "South", "V"], (1,0)),
    **dict.fromkeys(["W", "West", "<"], (0,-1))
}

grid_cardinal_steps = [(-1,0),(0,1),(1,0),(0,-1)]
def rotate_cardinal_step(current):
    return grid_cardinal_steps[(grid_cardinal_steps.index(current) + 1) % 4]

grid_steps = [(-1,-1),(-1,0),(-1,1),(0,1),(1,1),(1,0),(1,-1),(0,-1)]
def rotate_step(current):
    return grid_steps[(grid_steps.index(current) + 1) % 8]