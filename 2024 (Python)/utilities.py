direction_arrows = "^>V<"

direction_from_arrows = {
    "^": "North",
    ">": "East",
    "V": "South",
    "<": "West"
}

NORTH     = (-1, 0)
EAST      = (0, 1)
SOUTH     = (1, 0)
WEST      = (0, -1)
NORTHEAST = (-1, 1)
SOUTHEAST = (1, 1)
SOUTHWEST = (1, -1)
NORTHWEST = (-1, -1)

# (row, col) change
steps_from_direction = {
    **dict.fromkeys(["N", "North", "^"], (-1,0)),
    **dict.fromkeys(["NE", "Northeast"], (-1,0)),
    **dict.fromkeys(["E", "East", ">"], (0,1)),
    **dict.fromkeys(["SE", "Southeast"], (-1,0)),
    **dict.fromkeys(["S", "South", "V"], (1,0)),
    **dict.fromkeys(["SW", "Southwest"], (-1,0)),
    **dict.fromkeys(["W", "West", "<"], (0,-1)),
    **dict.fromkeys(["NW", "Northwest"], (-1,0)),
}

grid_cardinal_steps = [(-1,0),(0,1),(1,0),(0,-1)]
def rotate_cardinal_step(current):
    return grid_cardinal_steps[(grid_cardinal_steps.index(current) + 1) % 4]

grid_steps = [(-1,-1),(-1,0),(-1,1),(0,1),(1,1),(1,0),(1,-1),(0,-1)]
def rotate_step(current):
    return grid_steps[(grid_steps.index(current) + 1) % 8]