# Water Walls Part 1

## Inputs & Outputs
    const checklist = [
      { input: [5, 3, 7, 2, 6, 4, 5, 9, 1, 2], output: [3, 8, 11] },
      { input: [], output: null },
      { input: [5], output: null },
      { input: [5, 10], output: null },
      { input: [1, 2, 3], output: null },
      { input: [3, 2, 1], output: null },
      { input: [2, 3, 2], output: null },
      { input: [2, 1, 3], output: [1, 3, 1] },
      { input: [2, 0, 3], output: [1, 3, 2] },
      { input: [2, 1, 3], output: [1, 3, 1] },
      { input: [2, 3, 4, 3, 1, 2], output: [4, 6, 1] },
      { input: [2, 3, 4, 3, 1, 2, 1, 1, 1], output: [4, 6, 1] },
      { input: [2, 1, 3, 1, 2], output: [1, 3, 1] },
      { input: [2, 1, 3, 0, 2], output: [3, 5, 2] },
    ];

## Constraints
* The bottom of the container is solid; water doesn't leak out when a wall is 0.
* The container has no left/right wall; water DOES leak out the sides.
* Return null in all cases where no trough can be specified.
* When multiple troughs are tied for the largest, choose the leftmost tied trough.

## Strategy
Starting from the left, find a trough, measure its capacity & store the location & capacity.
Then find the next trough, and if it's larger, toss out the old to store the new.
Keep going like this till we run out of walls.

## Big-O Complexity
Expected O(n) is linear - we should only need to pass over the whole array once, tho we hit trough areas twice.

## Transformations
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
    ^
    largest: null
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
    L^
    largest: null
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
     L  ^
    largest: null
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
     L     ^
    largest: null
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
     L     R^
    largest: [1, 3, 2]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
           L^
    largest: [1, 3, 2]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
           L  ^
    largest: [1, 3, 2]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
           L     ?^
    largest: [1, 3, 4]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
           L     ?  ^
    largest: [1, 3, 4]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
           L     ?     ^
    largest: [1, 3, 4]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
           L     x        R^
    largest: [3, 8, 11]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
                          L^
    largest: [3, 8, 11]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
                          L  ^
    largest: [3, 8, 11]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
                          L     R^
    largest: [3, 8, 11]
    [5, 3, 7, 2, 6, 4, 5, 9, 1, 2]
                                  ^
    output: [3, 8, 11]

## Main Function
    const waterWalls = function findLargestWaterWallsTrough (walls) {
      // Starting at the left edge, repeat until out of walls:
        // Proceed right until the left wall of a trough is found. Record position, (i + 1)
        // Proceed right until the right wall of a trough is found. Record position (j + 1), then measure the trough:
          // Of the 2 walls, the shortest sets the waterLevel. 
          // Iterate thru walls between them (non-inclusive), summing the differences: waterLevel - wall
        // Compare sum with greatest capacity found so far, and if greater, replace with latest trough data.
        // Begin search for next trough left wall with current right wall
      // Return trough data
    };

