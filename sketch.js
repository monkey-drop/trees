// Tree Generator with Varied Traits
// Uses recursive branching to create unique tree and root structures

let treeTraits = {};

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
        // Branch angle variation (degrees)
        branchAngle: random(15, 35),
        angleVariation: random(0, 15),

        // Branch length properties
        lengthDecay: random(0.6, 0.75),
        lengthVariation: random(0, 0.15),

        // Branching properties
        minBranchLength: random(2, 8),
        splitProbability: random(0.7, 1.0),

        // Visual properties
        initialThickness: random(12, 20),
        thicknessDecay: random(0.65, 0.75),

        // Asymmetry and character
        asymmetry: random(-0.3, 0.3),
        curvature: random(-0.05, 0.05),

        // Root properties
        rootDepth: random(0.5, 0.8),
        rootSpread: random(0.8, 1.2),

        // Color variation
        strokeHue: random(0, 30), // Brown tones
        strokeSat: random(0, 30),
        strokeBright: random(0, 40)
    };
}

function drawTree() {
    background(250, 248, 245);

    // Draw from center bottom
    let startX = width / 2;
    let startY = height * 0.65; // Position for ground level

    // Draw roots first (below ground)
    push();
    translate(startX, startY);
    stroke(35 + treeTraits.strokeHue, 25 + treeTraits.strokeSat, 20 + treeTraits.strokeBright);
    strokeWeight(treeTraits.initialThickness * 0.8);
    drawRoots(0, 0, -90, treeTraits.initialThickness * 0.8,
              height * 0.25 * treeTraits.rootDepth, 0);
    pop();

    // Draw ground line
    stroke(100, 80, 60);
    strokeWeight(2);
    line(0, startY, width, startY);

    // Draw tree trunk and branches (above ground)
    push();
    translate(startX, startY);
    stroke(30 + treeTraits.strokeHue, 20 + treeTraits.strokeSat, 15 + treeTraits.strokeBright);
    strokeWeight(treeTraits.initialThickness);
    drawBranch(0, 0, 90, treeTraits.initialThickness, height * 0.2, 0);
    pop();
}

function drawBranch(x, y, angle, thickness, length, depth) {
    // Stop condition
    if (length < treeTraits.minBranchLength || depth > 12) {
        return;
    }

    // Calculate end point with curvature
    let curve = treeTraits.curvature * length;
    let endX = x + cos(radians(angle)) * length;
    let endY = y - sin(radians(angle)) * length;

    // Draw the branch
    strokeWeight(thickness);

    // Add slight curve to branches
    if (abs(curve) > 0.01) {
        noFill();
        let controlX = x + cos(radians(angle)) * length * 0.5 + curve * 10;
        let controlY = y - sin(radians(angle)) * length * 0.5;
        bezier(x, y, controlX, controlY, controlX, controlY, endX, endY);
    } else {
        line(x, y, endX, endY);
    }

    // Decide whether to split
    if (random(1) < treeTraits.splitProbability) {
        // Calculate new branch parameters
        let newLength = length * treeTraits.lengthDecay * random(1 - treeTraits.lengthVariation, 1 + treeTraits.lengthVariation);
        let newThickness = thickness * treeTraits.thicknessDecay;

        // Left branch
        let leftAngle = angle + treeTraits.branchAngle + random(-treeTraits.angleVariation, treeTraits.angleVariation);
        leftAngle += treeTraits.asymmetry * 10;
        drawBranch(endX, endY, leftAngle, newThickness, newLength, depth + 1);

        // Right branch
        let rightAngle = angle - treeTraits.branchAngle + random(-treeTraits.angleVariation, treeTraits.angleVariation);
        rightAngle -= treeTraits.asymmetry * 10;
        drawBranch(endX, endY, rightAngle, newThickness, newLength, depth + 1);

        // Sometimes add a middle branch for more complexity
        if (depth < 6 && random(1) < 0.3) {
            let middleAngle = angle + random(-10, 10);
            drawBranch(endX, endY, middleAngle, newThickness * 0.9, newLength * 0.8, depth + 1);
        }
    } else {
        // Continue straight with slight variation
        let continueAngle = angle + random(-5, 5);
        let continueLength = length * random(0.85, 0.95);
        let continueThickness = thickness * 0.9;
        drawBranch(endX, endY, continueAngle, continueThickness, continueLength, depth + 1);
    }
}

function drawRoots(x, y, angle, thickness, length, depth) {
    // Stop condition - roots are less deep than branches are tall
    if (length < treeTraits.minBranchLength * 1.5 || depth > 8) {
        return;
    }

    // Calculate end point
    let endX = x + cos(radians(angle)) * length * treeTraits.rootSpread;
    let endY = y - sin(radians(angle)) * length;

    // Draw the root
    strokeWeight(thickness);
    line(x, y, endX, endY);

    // Roots split more irregularly
    if (random(1) < 0.8) {
        let newLength = length * random(0.55, 0.75);
        let newThickness = thickness * random(0.6, 0.8);

        // Roots spread wider and more chaotically
        let leftAngle = angle + random(20, 50);
        drawRoots(endX, endY, leftAngle, newThickness, newLength, depth + 1);

        let rightAngle = angle - random(20, 50);
        drawRoots(endX, endY, rightAngle, newThickness, newLength, depth + 1);

        // Sometimes add additional root tendrils
        if (random(1) < 0.4) {
            let extraAngle = angle + random(-40, 40);
            drawRoots(endX, endY, extraAngle, newThickness * 0.7, newLength * 0.8, depth + 1);
        }
    } else {
        // Continue with variation
        let continueAngle = angle + random(-15, 15);
        let continueLength = length * random(0.7, 0.9);
        let continueThickness = thickness * 0.85;
        drawRoots(endX, endY, continueAngle, continueThickness, continueLength, depth + 1);
    }
}

function generateNewTree() {
    generateTreeTraits();
    drawTree();
}

function saveTree() {
    saveCanvas('tree-drawing', 'png');
}
