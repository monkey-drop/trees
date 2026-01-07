// Organic Tree Generator with Flowing Lines and Hatching
// Creates pen-drawn style trees with prominent root systems

let treeTraits = {};
let colorPalette = [];

function setup() {
    createCanvas(800, 900);
    generateTreeTraits();
    drawTree();
}

function draw() {
    // Static drawing - no animation loop needed
}

function generateTreeTraits() {
    // Generate random traits for this tree
    treeTraits = {
        // Branch angle variation (degrees) - wider for more organic spread
        branchAngle: random(20, 45),
        angleVariation: random(5, 25),

        // Branch length properties - more variation
        lengthDecay: random(0.55, 0.70),
        lengthVariation: random(0.1, 0.3),

        // Branching properties
        minBranchLength: random(3, 10),
        splitProbability: random(0.65, 0.95),

        // Visual properties - thinner for more delicate pen effect
        initialThickness: random(1, 2.5),
        thicknessDecay: random(0.7, 0.85),

        // Organic flow properties
        curviness: random(0.15, 0.4), // How much curves bend
        flowAngle: random(-15, 15), // Overall flow direction

        // Root properties - MUCH bigger
        rootDepth: random(1.2, 1.8), // Bigger than 1.0 means larger than tree
        rootSpread: random(1.3, 2.0),
        rootDensity: random(0.85, 1.0), // How often roots split

        // Hatching properties
        hatchDensity: random(0.3, 0.6),
        hatchLength: random(3, 8)
    };

    // Generate color palette with varied hues like the reference
    colorPalette = [
        color(random(0, 30), random(40, 80), random(30, 60)), // Reds/browns
        color(random(200, 220), random(50, 90), random(40, 70)), // Blues
        color(random(140, 180), random(50, 80), random(40, 70)), // Greens/teals
        color(random(15, 45), random(60, 90), random(50, 80)) // Orange/rust
    ];
}

function drawTree() {
    background(250, 248, 245);
    noFill();

    // Position tree higher to make more room for roots
    let startX = width / 2;
    let startY = height * 0.5; // Higher position for bigger root system

    // Draw massive root system first (below ground)
    push();
    translate(startX, startY);
    drawRoots(0, 0, -90, treeTraits.initialThickness * 1.2,
              height * 0.35 * treeTraits.rootDepth, 0, 0);
    pop();

    // Draw ground line with subtle variation
    strokeWeight(1);
    stroke(120, 100, 80, 150);
    for (let i = 0; i < 3; i++) {
        let offset = i * 2;
        line(0, startY + offset, width, startY + offset);
    }

    // Draw tree trunk and branches (above ground)
    push();
    translate(startX, startY);
    drawBranch(0, 0, 90, treeTraits.initialThickness, height * 0.25, 0, 0);
    pop();
}

function drawBranch(x, y, angle, thickness, length, depth, colorIndex) {
    // Stop condition
    if (length < treeTraits.minBranchLength || depth > 14) {
        return;
    }

    // Choose color from palette
    let branchColor = colorPalette[colorIndex % colorPalette.length];
    stroke(branchColor);
    strokeWeight(thickness);

    // Add organic curvature - branches flow and bend
    let curveStrength = treeTraits.curviness * length;
    let midAngle = angle + treeTraits.flowAngle + random(-10, 10);

    // Create flowing bezier curve for organic look
    let midX = x + cos(radians(midAngle)) * length * 0.5;
    let midY = y - sin(radians(midAngle)) * length * 0.5;
    midX += random(-curveStrength, curveStrength);
    midY += random(-curveStrength * 0.5, curveStrength * 0.5);

    let endAngle = angle + random(-15, 15) + treeTraits.flowAngle;
    let endX = x + cos(radians(endAngle)) * length;
    let endY = y - sin(radians(endAngle)) * length;

    // Draw main branch with organic curve
    bezier(x, y, midX, midY, midX, midY, endX, endY);

    // Add hatching texture along the branch
    if (thickness > 0.5 && random(1) < treeTraits.hatchDensity) {
        drawHatching(x, y, endX, endY, midX, midY, thickness, branchColor);
    }

    // Decide whether to split
    if (random(1) < treeTraits.splitProbability) {
        // Calculate new branch parameters with more variation
        let newLength = length * treeTraits.lengthDecay * random(1 - treeTraits.lengthVariation, 1 + treeTraits.lengthVariation);
        let newThickness = thickness * treeTraits.thicknessDecay;

        // Number of branches (2-4 for organic spread)
        let numBranches = floor(random(2, 4));

        for (let i = 0; i < numBranches; i++) {
            let spreadAngle = map(i, 0, numBranches - 1, -treeTraits.branchAngle, treeTraits.branchAngle);
            spreadAngle += random(-treeTraits.angleVariation, treeTraits.angleVariation);
            let branchAngle = endAngle + spreadAngle;

            let branchLength = newLength * random(0.7, 1.1);
            let branchThickness = newThickness * random(0.8, 1.0);

            // Use different colors for variety
            let nextColor = (colorIndex + floor(random(0, 2))) % colorPalette.length;
            drawBranch(endX, endY, branchAngle, branchThickness, branchLength, depth + 1, nextColor);
        }
    } else {
        // Continue with flowing curve
        let continueAngle = endAngle + random(-20, 20);
        let continueLength = length * random(0.75, 0.95);
        let continueThickness = thickness * 0.88;
        drawBranch(endX, endY, continueAngle, continueThickness, continueLength, depth + 1, colorIndex);
    }
}

function drawRoots(x, y, angle, thickness, length, depth, colorIndex) {
    // Stop condition - roots go DEEP
    if (length < treeTraits.minBranchLength * 1.2 || depth > 12) {
        return;
    }

    // Choose color from palette (roots use all colors for visual interest)
    let rootColor = colorPalette[colorIndex % colorPalette.length];
    stroke(rootColor);
    strokeWeight(thickness);

    // Roots are more chaotic and organic than branches
    let curveStrength = treeTraits.curviness * length * 1.5;

    // Create wild flowing curves for roots
    let midAngle = angle + random(-30, 30);
    let midX = x + cos(radians(midAngle)) * length * 0.6 * treeTraits.rootSpread;
    let midY = y - sin(radians(midAngle)) * length * 0.6;
    midX += random(-curveStrength, curveStrength);
    midY += random(-curveStrength * 0.5, curveStrength * 0.5);

    let endAngle = angle + random(-35, 35);
    let endX = x + cos(radians(endAngle)) * length * treeTraits.rootSpread;
    let endY = y - sin(radians(endAngle)) * length;

    // Draw organic curved root
    bezier(x, y, midX, midY, midX, midY, endX, endY);

    // Add hatching to roots
    if (thickness > 0.5 && random(1) < treeTraits.hatchDensity * 0.8) {
        drawHatching(x, y, endX, endY, midX, midY, thickness, rootColor);
    }

    // Roots split very frequently - creating dense network
    if (random(1) < treeTraits.rootDensity) {
        let newLength = length * random(0.5, 0.8);
        let newThickness = thickness * random(0.65, 0.85);

        // Create 2-5 root branches for dense network
        let numRoots = floor(random(2, 6));

        for (let i = 0; i < numRoots; i++) {
            // Wide spread angles for roots
            let spreadAngle = map(i, 0, numRoots - 1, -70, 70);
            spreadAngle += random(-25, 25);
            let rootAngle = endAngle + spreadAngle;

            let rootLength = newLength * random(0.6, 1.2);
            let rootThickness = newThickness * random(0.7, 1.0);

            // Cycle through colors
            let nextColor = (colorIndex + floor(random(0, 3))) % colorPalette.length;
            drawRoots(endX, endY, rootAngle, rootThickness, rootLength, depth + 1, nextColor);
        }
    } else {
        // Continue root with wild variation
        let continueAngle = endAngle + random(-40, 40);
        let continueLength = length * random(0.65, 0.9);
        let continueThickness = thickness * 0.82;
        let nextColor = (colorIndex + floor(random(0, 2))) % colorPalette.length;
        drawRoots(endX, endY, continueAngle, continueThickness, continueLength, depth + 1, nextColor);
    }
}

// Helper function to draw hatching texture along curves
function drawHatching(x1, y1, x2, y2, midX, midY, thickness, col) {
    push();
    stroke(col);
    strokeWeight(thickness * 0.3);

    // Calculate direction perpendicular to the branch
    let dx = x2 - x1;
    let dy = y2 - y1;
    let branchAngle = atan2(dy, dx);
    let perpAngle = branchAngle + HALF_PI;

    // Draw several hatch marks along the curve
    let numHatches = floor(random(2, 5));
    for (let i = 0; i < numHatches; i++) {
        let t = random(0.2, 0.8);

        // Approximate point on bezier curve
        let px = lerp(lerp(x1, midX, t), lerp(midX, x2, t), t);
        let py = lerp(lerp(y1, midY, t), lerp(midY, y2, t), t);

        let hatchLen = treeTraits.hatchLength * random(0.8, 1.2);
        let hx1 = px + cos(perpAngle + random(-0.3, 0.3)) * hatchLen * 0.5;
        let hy1 = py + sin(perpAngle + random(-0.3, 0.3)) * hatchLen * 0.5;
        let hx2 = px - cos(perpAngle + random(-0.3, 0.3)) * hatchLen * 0.5;
        let hy2 = py - sin(perpAngle + random(-0.3, 0.3)) * hatchLen * 0.5;

        line(hx1, hy1, hx2, hy2);
    }
    pop();
}

function generateNewTree() {
    generateTreeTraits();
    drawTree();
}

function saveTree() {
    saveCanvas('tree-drawing', 'png');
}
