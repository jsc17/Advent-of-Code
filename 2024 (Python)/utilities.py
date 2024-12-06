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