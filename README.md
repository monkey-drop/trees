# P5.js Organic Tree Generator

A generative art project that creates unique pen-style drawings of trees with prominent root structures using p5.js. Inspired by flowing, organic line art with hatching textures and varied color palettes.

## Features

- **Organic Flowing Lines**: All branches and roots use bezier curves for natural, flowing forms
- **Hatching Texture**: Cross-hatching effects add depth and pen-drawn aesthetic
- **Massive Root Systems**: Roots are as prominent or larger than the tree itself, creating dramatic underground networks
- **Color Variation**: Multi-color palette system (reds, blues, greens, oranges) for visual interest
- **Varied Traits**: Each tree has randomized characteristics including:
  - Branch angles and wide variation (20-45° base angles)
  - Organic curviness and flow direction
  - Length decay patterns with high variation
  - Delicate line weights (1-2.5px)
  - Dense root networks (2-6 splits per node)
  - Root depth and massive spread (1.2-2x tree size)
  - Hatching density and length

## Usage

1. Open `index.html` in a web browser
2. Click "Generate New Tree" to create a new random tree
3. Click "Save Image" to download the current tree as a PNG

## Trait System

Each generated tree has unique traits:

- **branchAngle**: Base angle between branches (20-45°)
- **angleVariation**: Random variation in branch angles (5-25°)
- **lengthDecay**: How much shorter each branch level becomes (0.55-0.70)
- **lengthVariation**: Random variation in branch lengths (0.1-0.3)
- **minBranchLength**: Minimum branch length before stopping (3-10 pixels)
- **splitProbability**: Chance of branching vs continuing (0.65-0.95)
- **initialThickness**: Starting trunk thickness (1-2.5 pixels for delicate lines)
- **thicknessDecay**: How much thinner branches become (0.7-0.85)
- **curviness**: How much curves flow and bend (0.15-0.4)
- **flowAngle**: Overall flow/wind direction (-15 to 15°)
- **rootDepth**: How deep roots grow (1.2-1.8 - bigger than tree!)
- **rootSpread**: How wide roots spread (1.3-2.0)
- **rootDensity**: How frequently roots split (0.85-1.0)
- **hatchDensity**: Probability of hatching texture (0.3-0.6)
- **hatchLength**: Length of hatch marks (3-8 pixels)

**Color Palette**: Each tree generates 4 colors from ranges:
- Reds/browns (H: 0-30, S: 40-80, B: 30-60)
- Blues (H: 200-220, S: 50-90, B: 40-70)
- Greens/teals (H: 140-180, S: 50-80, B: 40-70)
- Oranges/rust (H: 15-45, S: 60-90, B: 50-80)

## Technical Details

- Built with p5.js 1.7.0
- Canvas size: 800x900 pixels
- Drawing style: Organic bezier curves with hatching texture
- Line weights: Thin, delicate strokes (1-2.5px)
- Color system: Dynamic 4-color palette per tree
- Recursive depth: Up to 14 levels for branches, 12 for roots
- Root prominence: Positioned to take up 50% of canvas with high density splitting
- Branches per split: 2-4 for trees, 2-6 for roots

## File Structure

```
trees/
├── index.html    # Main HTML file with p5.js CDN and UI
├── sketch.js     # Core tree generation algorithm
└── README.md     # This file
```
