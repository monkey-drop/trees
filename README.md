# P5.js Tree Generator

A generative art project that creates unique pen-style drawings of trees with root structures using p5.js.

## Features

- **Recursive Branching Algorithm**: Creates natural-looking tree structures using recursive function calls
- **Root Systems**: Generates underground root networks that mirror tree branch complexity
- **Varied Traits**: Each tree has randomized characteristics including:
  - Branch angles and variation
  - Length decay patterns
  - Thickness progression
  - Asymmetry and curvature
  - Root depth and spread
  - Color variations in brown tones

## Usage

1. Open `index.html` in a web browser
2. Click "Generate New Tree" to create a new random tree
3. Click "Save Image" to download the current tree as a PNG

## Trait System

Each generated tree has unique traits:

- **branchAngle**: Base angle between branches (15-35°)
- **angleVariation**: Random variation in branch angles (0-15°)
- **lengthDecay**: How much shorter each branch level becomes (0.6-0.75)
- **lengthVariation**: Random variation in branch lengths (0-0.15)
- **minBranchLength**: Minimum branch length before stopping (2-8 pixels)
- **splitProbability**: Chance of branching vs continuing straight (0.7-1.0)
- **initialThickness**: Starting trunk thickness (12-20 pixels)
- **thicknessDecay**: How much thinner branches become (0.65-0.75)
- **asymmetry**: Left/right balance bias (-0.3 to 0.3)
- **curvature**: Branch curve amount (-0.05 to 0.05)
- **rootDepth**: How deep roots grow (0.5-0.8)
- **rootSpread**: How wide roots spread (0.8-1.2)

## Technical Details

- Built with p5.js 1.7.0
- Canvas size: 800x900 pixels
- Drawing style: Pen/stroke-based (no fills)
- Color palette: Natural brown tones with slight variation
- Recursive depth: Up to 12 levels for branches, 8 for roots

## File Structure

```
trees/
├── index.html    # Main HTML file with p5.js CDN and UI
├── sketch.js     # Core tree generation algorithm
└── README.md     # This file
```
