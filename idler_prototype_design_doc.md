# Idler Prototype

## Goal
The goal of this idler prototype is 3 fold:

1. End the day actually having built something, in the spirit of building something imperfect is better than building nothing perfectly.
2. To act as a learning opportunity for me to learn how to best use Claude Code on my local machine.
3. To learn how this sort of project "works" in phaser (I'm a fairly novice programmer, and want to be able to figure this out).

## Features

The idler will need the following objects:

1. Game Scene - some sort of phaser scene object where the player object can move around and interact with objects. A player cannot go out of bounds of the game scene. The game scene should go right up against the edge of the browser window. If the window gets resized, the playable area should not get resized.
2. Grid system - a square grid system that our Plant objects will "snap" to upon load. The player object will not snap to the grid system. 
3. Player - Player object will be a green square. Player object will move with WASD. Player object will need some sort of sensor that determines how close it is to a plant.
4. Plant class - A plant class that takes in some parameters. plantType tells us which of the three plant types it is: Blue, yellow, or Red. Blue plants will be collected via player clicks. a player must click on a blue triangle once to collect it, a yellow plant twice, and a red plant 3 times. When the plant is collected, the plant disappears. All plants are triangles for now.

## Must Follow

- player object must not snap to grid
- player object can only click and collect a plant when ANY part of the player object is overlapping with the 8 squares that form the perimeter around the plant object. Otherwise the player can NOT click on the plant and cannot collect the plant.
- The number of plants that spawn must be random between 5 and 10, inclusive.
- The type of plants that spawn must be random, evenly distributed between the 3 plant types.
- the player object must move by WASD
- the player object only interacts with plants (clicks and collects) via left mouse click.
- The player can move diagonally if the correct keys are held down at the same time.
- The plants and player need collision surfaces, so the player can't "walk over" or "walk through" a plant.

## Open to ideas
- color pallette, though I'd prefer they be easy on the eyes (no neon colors for now)
- Actual game scene size
- Actual grid size, though it should be "grokable" by the player
- Including a start game scene, end game scene
- Tracking plan clicks and collection system/inventory of plants
- Very, very, VERY simple particle effects or anything that adds some "zhush"
- Make the plants become a more dim version of the color as they get clicked.
- The window size should be fixed, perhaps to 1024 x 768
