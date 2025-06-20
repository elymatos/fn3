<?php
// Read and parse the CSV file
function readCSVData($filename) {
    $data = [];
    if (($handle = fopen($filename, "r")) !== FALSE) {
        $headers = fgetcsv($handle, 1000, ",");
        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $data[] = [
                'idFrameScenario' => (int)$row[0],
                'idFrameChild' => (int)$row[1],
                'scenarioName' => $row[2],
                'childFrameName' => $row[3]
            ];
        }
        fclose($handle);
    }
    return $data;
}

// Configuration variables
$csvFile = 'scenario_frame_groupings.csv';

// Radial Dendrogram settings
$baseRadius = 300;  // Base radius for the inner levels
$lastLevelExtension = 150;  // Additional length for the outermost level (adjust this value)
$totalRadius = $baseRadius + $lastLevelExtension;

// Tidy Tree settings
$treeVerticalSpacing = 18;  // Vertical spacing between nodes in tidy tree (adjust this value)

$csvData = readCSVData($csvFile);

// Calculate statistics
$scenarios = array_unique(array_column($csvData, 'scenarioName'));
$components = array_unique(array_column($csvData, 'childFrameName'));
$scenarioCount = count($scenarios);
$componentCount = count($components);
$connectionCount = count($csvData);
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FrameNet Radial Dendrogram</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
<style>
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

.container {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 10px;
    font-size: 2.2em;
    font-weight: 300;
}

.subtitle {
    text-align: center;
    color: #7f8c8d;
    margin-bottom: 30px;
    font-size: 1.1em;
}

.controls {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.control-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
}

select, button {
    padding: 8px 16px;
    border: 2px solid #3498db;
    border-radius: 8px;
    background: white;
    color: #2c3e50;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
}

select:hover, button:hover {
    background: #3498db;
    color: white;
    transform: translateY(-2px);
}

.stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 20px;
    flex-wrap: wrap;
}

.stat {
    text-align: center;
    padding: 10px 20px;
    background: linear-gradient(135deg, #74b9ff, #0984e3);
    color: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
}

.stat-number {
    font-size: 1.8em;
    font-weight: bold;
    display: block;
}

.stat-label {
    font-size: 0.9em;
    opacity: 0.9;
}

#dendrogram {
width: 100%;
height: 1000px;
background: white;
border-radius: 10px;
box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
cursor: grab;
}

#dendrogram:active {
cursor: grabbing;
}

.zoom-controls {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.zoom-btn {
    width: 40px;
    height: 40px;
    border: 2px solid #3498db;
    border-radius: 50%;
    background: white;
    color: #3498db;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
}

.zoom-btn:hover {
    background: #3498db;
    color: white;
    transform: scale(1.1);
}

.diagram-container {
    position: relative;
    background: white;
    border-radius: 10px;
    box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
}

.node circle {
    cursor: pointer;
    stroke: #fff;
    stroke-width: 2px;
}

.node text {
    font-size: 11px;
    font-weight: 500;
    text-anchor: start;
    dominant-baseline: middle;
}

.link {
    fill: none;
    stroke: #999;
    stroke-opacity: 0.6;
    stroke-width: 1.5px;
}

.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 10px;
    border-radius: 8px;
    font-size: 12px;
    pointer-events: none;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    opacity: 0;
}

.legend {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-top: 20px;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 50%;
}

.file-info {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #495057;
}
</style>
</head>
<body>
<div class="container">
<h1>FrameNet Radial Dendrogram</h1>
<p class="subtitle">Hierarchical radial visualization of scenario frames and their components</p>

<div class="file-info">
<strong>Data Source:</strong> <?php echo $csvFile; ?>
<?php if (file_exists($csvFile)): ?>
<span style="color: #28a745;">✓ File loaded successfully</span>
<?php else: ?>
<span style="color: #dc3545;">✗ File not found - Please ensure <?php echo $csvFile; ?> is in the same directory</span>
<?php endif; ?>
<br/>
<strong>Radial Settings:</strong> Base radius: <?php echo $baseRadius; ?>px, Last level extension: <?php echo $lastLevelExtension; ?>px
<br/>
<strong>Tidy Tree Settings:</strong> Vertical spacing: <?php echo $treeVerticalSpacing; ?>px
</div>

<div class="stats">
<div class="stat">
<span class="stat-number" id="scenarioCount"><?php echo $scenarioCount; ?></span>
<span class="stat-label">Scenario Frames</span>
</div>
<div class="stat">
<span class="stat-number" id="componentCount"><?php echo $componentCount; ?></span>
<span class="stat-label">Component Frames</span>
</div>
<div class="stat">
<span class="stat-number" id="connectionCount"><?php echo $connectionCount; ?></span>
<span class="stat-label">Total Connections</span>
</div>
</div>

<div class="controls">
<div class="control-group">
<label>Visualization Type:</label>
<select id="visualizationType">
<option value="radial">Radial Dendrogram</option>
<option value="tidy">Tidy Tree</option>
</select>
</div>
<div class="control-group">
<label>Filter by Scenario:</label>
<select id="scenarioFilter">
<option value="">All Scenarios</option>
</select>
</div>
<div class="control-group">
<label>Min Components:</label>
<select id="minConnections">
<option value="1">1+</option>
<option value="2">2+</option>
<option value="3">3+</option>
<option value="5">5+</option>
</select>
</div>
<button onclick="resetFilters()">Reset Filters</button>
</div>

<div class="diagram-container">
<svg id="dendrogram"></svg>
<div class="zoom-controls">
<button class="zoom-btn" onclick="zoomIn()">+</button>
<button class="zoom-btn" onclick="zoomOut()">−</button>
<button class="zoom-btn" onclick="resetZoom()" style="font-size: 12px;">⌂</button>
</div>
</div>

<div class="legend">
<div class="legend-item">
<div class="legend-color" style="background: #2c3e50;"></div>
<span>Root (FrameNet)</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background: #3498db;"></div>
<span>Top-level Scenarios</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background: #9b59b6;"></div>
<span>Nested Scenarios</span>
</div>
<div class="legend-item">
<div class="legend-color" style="background: #e74c3c;"></div>
<span>Component Frames</span>
</div>
</div>
</div>

<!-- Tooltip element -->
<div class="tooltip"></div>

<script>
// PHP data and configuration injected into JavaScript
const originalData = <?php echo json_encode($csvData); ?>;
const baseRadius = <?php echo $baseRadius; ?>;
const lastLevelExtension = <?php echo $lastLevelExtension; ?>;
const totalRadius = <?php echo $totalRadius; ?>;
const treeVerticalSpacing = <?php echo $treeVerticalSpacing; ?>;

let currentData = [];
let zoomBehavior;
let svg, g;

function populateFilters() {
    const scenarioSelect = document.getElementById('scenarioFilter');
    const scenarios = [...new Set(originalData.map(d => d.scenarioName))].sort();

    scenarios.forEach(scenario => {
        const option = document.createElement('option');
        option.value = scenario;
        option.textContent = scenario.replace(/_/g, ' ');
        scenarioSelect.appendChild(option);
    });
}

function filterData() {
    const scenarioFilter = document.getElementById('scenarioFilter').value;
    const minConnections = parseInt(document.getElementById('minConnections').value);

    let filteredData = originalData;

    if (scenarioFilter) {
        filteredData = filteredData.filter(d => d.scenarioName === scenarioFilter);
    }

    // Count connections per scenario
    const scenarioConnections = {};
    filteredData.forEach(d => {
        scenarioConnections[d.scenarioName] = (scenarioConnections[d.scenarioName] || 0) + 1;
    });

    // Filter by minimum connections
    filteredData = filteredData.filter(d => scenarioConnections[d.scenarioName] >= minConnections);

    return filteredData;
}

function updateVisualization() {
    currentData = filterData();

    // Update stats
    const scenarios = new Set(currentData.map(d => d.scenarioName));
    const components = new Set(currentData.map(d => d.childFrameName));

    document.getElementById('scenarioCount').textContent = scenarios.size;
    document.getElementById('componentCount').textContent = components.size;
    document.getElementById('connectionCount').textContent = currentData.length;

    const visualizationType = document.getElementById('visualizationType').value;
    if (visualizationType === 'radial') {
        drawRadialDendrogram();
    } else {
        drawTidyTree();
    }
}

function createHierarchicalData() {
    // Step 1: Identify all scenarios and components
    const allScenarios = new Set(currentData.map(d => d.scenarioName));
    const allComponents = new Set(currentData.map(d => d.childFrameName));

    // Step 2: Identify which "components" are actually scenarios (nested scenarios)
    const nestedScenarios = new Set();
    allComponents.forEach(component => {
        if (allScenarios.has(component)) {
            nestedScenarios.add(component);
        }
    });

    // Step 3: Identify true leaf components (not scenarios themselves)
    const trueComponents = new Set();
    allComponents.forEach(component => {
        if (!allScenarios.has(component)) {
            trueComponents.add(component);
        }
    });

    // Step 4: Build parent-child relationships
    const parentChildMap = new Map();
    const childParentMap = new Map();

    currentData.forEach(d => {
        const parent = d.scenarioName;
        const child = d.childFrameName;

        if (!parentChildMap.has(parent)) {
            parentChildMap.set(parent, []);
        }
        parentChildMap.get(parent).push(child);
        childParentMap.set(child, parent);
    });

    // Step 5: Find root scenarios (scenarios that are not children of other scenarios)
    const rootScenarios = new Set();
    allScenarios.forEach(scenario => {
        if (!childParentMap.has(scenario)) {
            rootScenarios.add(scenario);
        }
    });

    console.log('Hierarchy Analysis:');
    console.log('Total scenarios:', allScenarios.size);
    console.log('Nested scenarios:', nestedScenarios.size);
    console.log('True components:', trueComponents.size);
    console.log('Root scenarios:', rootScenarios.size);
    console.log('Root scenarios list:', Array.from(rootScenarios));

    // Step 6: Recursively build hierarchy
    function buildNodeRecursive(nodeName, visited = new Set()) {
        // Prevent infinite loops
        if (visited.has(nodeName)) {
            console.warn('Circular reference detected for:', nodeName);
            return null;
        }
        visited.add(nodeName);

        const children = parentChildMap.get(nodeName) || [];
        const childNodes = [];

        children.forEach(childName => {
            if (allScenarios.has(childName)) {
                // This child is a scenario - recurse
                const childNode = buildNodeRecursive(childName, new Set(visited));
                if (childNode) {
                    childNodes.push(childNode);
                }
            } else {
                // This child is a true component - leaf node
                childNodes.push({
                    name: childName.replace(/_/g, ' '),
                                originalName: childName,
                                type: 'component'
                });
            }
        });

        // Determine node type
        let nodeType;
        if (nodeName === "FrameNet") {
            nodeType = 'root';
        } else if (allScenarios.has(nodeName)) {
            nodeType = 'scenario';
        } else {
            nodeType = 'component';
        }

        return {
            name: nodeName.replace(/_/g, ' '),
            originalName: nodeName,
            type: nodeType,
            children: childNodes.length > 0 ? childNodes : undefined
        };
    }

    // Step 7: Create the root node and build the tree
    const root = {
        name: "FrameNet",
        originalName: "FrameNet",
        type: 'root',
        children: []
    };

    // Add all root scenarios to the tree
    Array.from(rootScenarios).sort().forEach(scenarioName => {
        const scenarioNode = buildNodeRecursive(scenarioName);
        if (scenarioNode) {
            root.children.push(scenarioNode);
        }
    });

    console.log('Final hierarchy:', root);
    return root;
}

function drawRadialDendrogram() {
    svg = d3.select("#dendrogram");
    svg.selectAll("*").remove();

    if (currentData.length === 0) {
        svg.append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "18px")
        .style("fill", "#666")
        .text("No data matches the current filters");
        return;
    }

    const width = 1200;
    const height = 1000;
    const radius = Math.min(width, height) / 2 - 200; // Space for labels

    // Set up zoom behavior
    zoomBehavior = d3.zoom()
    .scaleExtent([0.3, 3])
    .on("zoom", function(event) {
        g.attr("transform", event.transform);
    });

    svg.call(zoomBehavior);

    g = svg.append("g")
    .attr("transform", `translate(${width/2},${height/2})`);

    // Create hierarchical data
    const hierarchyData = createHierarchicalData();

    // Create tree layout with custom radius function
    const tree = d3.cluster()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    const root = d3.hierarchy(hierarchyData);
    tree(root);

    // Find the maximum depth to identify the last level
    const maxDepth = d3.max(root.descendants(), d => d.depth);

    // Adjust radius for nodes - extend the last level
    root.descendants().forEach(d => {
        if (d.depth === maxDepth && d.depth > 0) {
            // This is a leaf node - extend it further out
            d.y = baseRadius + lastLevelExtension;
        } else if (d.depth > 0) {
            // Scale intermediate levels proportionally
            d.y = (baseRadius / maxDepth) * d.depth;
        }
        // Root node stays at center (y = 0)
    });

    console.log(`Layout: Base radius: ${baseRadius}, Last level extension: ${lastLevelExtension}, Max depth: ${maxDepth}`);

    // Color scale - now with more levels for nested scenarios
    const colorScale = d3.scaleOrdinal()
    .domain(['root', 'scenario', 'nested_scenario', 'component'])
    .range(['#2c3e50', '#3498db', '#9b59b6', '#e74c3c']);

    // Update node colors based on depth and type
    const getNodeColor = (d) => {
        if (d.depth === 0) return colorScale('root');
        if (d.data.type === 'component') return colorScale('component');
        if (d.depth === 1) return colorScale('scenario');
        return colorScale('nested_scenario'); // For nested scenarios at depth > 1
    };

    // Tooltip
    const tooltip = d3.select(".tooltip");

    // Draw links
    g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkRadial()
    .angle(d => d.x)
    .radius(d => d.y))
    .style("stroke", "#999")
    .style("stroke-opacity", 0.6)
    .style("stroke-width", 1.5)
    .style("fill", "none");

    // Draw nodes
    const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `
    rotate(${d.x * 180 / Math.PI - 90})
    translate(${d.y},0)
    `)
    .on("mouseover", function(event, d) {
        tooltip.transition()
        .duration(200)
        .style("opacity", .9);

        let content = `<strong>${d.data.name}</strong><br/>`;

        // Add parent information for all non-root nodes
        if (d.parent) {
            content += `<em>Parent: ${d.parent.data.name}</em><br/>`;
        }

        if (d.depth === 0) {
            content += `Root node<br/>Contains ${d.children ? d.children.length : 0} top-level scenarios`;
        } else if (d.data.type === 'scenario') {
            const childCount = d.children ? d.children.length : 0;
            const level = d.depth === 1 ? 'Top-level' : 'Nested';
    content += `${level} Scenario Frame (Level ${d.depth})<br/>Contains ${childCount} children`;

    // Show full hierarchy path for nested scenarios
    if (d.depth > 1) {
        let parent = d.parent;
        const hierarchy = [];
        while (parent && parent.depth > 0) {
            hierarchy.unshift(parent.data.name);
            parent = parent.parent;
        }
        if (hierarchy.length > 0) {
            content += `<br/><small>Path: ${hierarchy.join(' → ')}</small>`;
        }
    }
        } else {
            content += `Component Frame (Level ${d.depth})<br/>`;

            // Show full hierarchy path for components
            let parent = d.parent;
            const hierarchy = [];
            while (parent && parent.depth > 0) {
                hierarchy.unshift(parent.data.name);
                parent = parent.parent;
            }
            if (hierarchy.length > 0) {
                content += `<small>Full path: ${hierarchy.join(' → ')} → <strong>${d.data.name}</strong></small>`;
            }
        }

        tooltip.html(content)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    // Add circles
    node.append("circle")
    .attr("r", d => {
        if (d.depth === 0) return 8;
        if (d.depth === 1) return 6;
        if (d.depth === 2) return 5;
        return 4;
    })
    .style("fill", d => getNodeColor(d))
    .style("stroke", "#fff")
    .style("stroke-width", 2);

    // Add labels - ALL positioned on the exterior
    node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => {
        // Always position text on the exterior - distance from center
        if (d.depth === 0) return 12; // Root node
        if (d.depth === 1) return 10; // Scenario nodes
        return 8; // Component nodes
    })
    .attr("text-anchor", "start") // Always start from the exterior
    .attr("transform", d => {
        // For nodes on the left half of the circle (angles > π),
        // rotate and flip text for readability
        if (d.x > Math.PI) {
            const offset = d.depth === 0 ? -12 : (d.depth === 1 ? -10 : -8);
            return `rotate(180) translate(${offset}, 0)`;
        }
        return null;
    })
    .text(d => d.data.name) // Show FULL name, no truncation
    .style("font-size", d => {
        if (d.depth === 0) return "14px";
        if (d.depth === 1) return "11px";
        return "10px";
    })
    .style("font-weight", d => d.depth === 0 ? "bold" : "normal")
    .style("fill", "#2c3e50")
    .style("text-anchor", d => {
        // For left half (> π), use "end" anchor after rotation
        // For right half (≤ π), use "start" anchor
        return d.x > Math.PI ? "end" : "start";
    });
}

function drawTidyTree() {
    svg = d3.select("#dendrogram");
    svg.selectAll("*").remove();

    if (currentData.length === 0) {
        svg.append("text")
        .attr("x", "50%")
        .attr("y", "50%")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .style("font-size", "18px")
        .style("fill", "#666")
        .text("No data matches the current filters");
        return;
    }

    const width = 1200;
    const height = 1000;
    const margin = {top: 20, right: 200, bottom: 20, left: 200};

    // Set up zoom behavior
    zoomBehavior = d3.zoom()
    .scaleExtent([0.3, 3])
    .on("zoom", function(event) {
        g.attr("transform", event.transform);
    });

    svg.call(zoomBehavior);

    g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create hierarchical data
    const hierarchyData = createHierarchicalData();

    // Create tidy tree layout - first get basic layout
    const treeLayout = d3.tree()
    .size([height - margin.top - margin.bottom, width - margin.left - margin.right]);

    const root = d3.hierarchy(hierarchyData);
    treeLayout(root);

    // Now manually adjust vertical spacing
    const leaves = root.leaves();
    const totalLeaves = leaves.length;
    const availableHeight = height - margin.top - margin.bottom;

    // Calculate new spacing
    const spacingPerNode = Math.max(treeVerticalSpacing, availableHeight / totalLeaves);

    // Reassign y coordinates for all nodes based on our custom spacing
    leaves.forEach((leaf, i) => {
        leaf.x = i * spacingPerNode;
    });

    // Propagate the spacing changes up the tree
    function updateInternalNodePositions(node) {
        if (node.children) {
            // Position internal nodes at the average of their children
            const childPositions = node.children.map(child => {
                updateInternalNodePositions(child);
                return child.x;
            });
            node.x = d3.mean(childPositions);
        }
    }

    updateInternalNodePositions(root);

    console.log(`Tidy Tree: Vertical spacing: ${treeVerticalSpacing}px, Calculated spacing: ${spacingPerNode}px, Total leaves: ${totalLeaves}`);

    // Color scale
    const colorScale = d3.scaleOrdinal()
    .domain(['root', 'scenario', 'nested_scenario', 'component'])
    .range(['#2c3e50', '#3498db', '#9b59b6', '#e74c3c']);

    // Update node colors based on depth and type
    const getNodeColor = (d) => {
        if (d.depth === 0) return colorScale('root');
        if (d.data.type === 'component') return colorScale('component');
        if (d.depth === 1) return colorScale('scenario');
        return colorScale('nested_scenario');
    };

    // Tooltip
    const tooltip = d3.select(".tooltip");

    // Draw links
    g.selectAll(".link")
    .data(root.links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
    .x(d => d.y)
    .y(d => d.x))
    .style("stroke", "#999")
    .style("stroke-opacity", 0.6)
    .style("stroke-width", 1.5)
    .style("fill", "none");

    // Draw nodes
    const node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", d => `translate(${d.y},${d.x})`)
    .on("mouseover", function(event, d) {
        tooltip.transition()
        .duration(200)
        .style("opacity", .9);

        let content = `<strong>${d.data.name}</strong><br/>`;

        // Add parent information for all non-root nodes
        if (d.parent) {
            content += `<em>Parent: ${d.parent.data.name}</em><br/>`;
        }

        if (d.depth === 0) {
            content += `Root node<br/>Contains ${d.children ? d.children.length : 0} top-level scenarios`;
        } else if (d.data.type === 'scenario') {
            const childCount = d.children ? d.children.length : 0;
            const level = d.depth === 1 ? 'Top-level' : 'Nested';
    content += `${level} Scenario Frame (Level ${d.depth})<br/>Contains ${childCount} children`;

    if (d.depth > 1) {
        let parent = d.parent;
        const hierarchy = [];
        while (parent && parent.depth > 0) {
            hierarchy.unshift(parent.data.name);
            parent = parent.parent;
        }
        if (hierarchy.length > 0) {
            content += `<br/><small>Path: ${hierarchy.join(' → ')}</small>`;
        }
    }
        } else {
            content += `Component Frame (Level ${d.depth})<br/>`;

            let parent = d.parent;
            const hierarchy = [];
            while (parent && parent.depth > 0) {
                hierarchy.unshift(parent.data.name);
                parent = parent.parent;
            }
            if (hierarchy.length > 0) {
                content += `<small>Full path: ${hierarchy.join(' → ')} → <strong>${d.data.name}</strong></small>`;
            }
        }

        tooltip.html(content)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 28) + "px");
    })
    .on("mouseout", function(d) {
        tooltip.transition()
        .duration(500)
        .style("opacity", 0);
    });

    // Add circles
    node.append("circle")
    .attr("r", d => {
        if (d.depth === 0) return 8;
        if (d.depth === 1) return 6;
        if (d.depth === 2) return 5;
        return 4;
    })
    .style("fill", d => getNodeColor(d))
    .style("stroke", "#fff")
    .style("stroke-width", 2);

    // Add labels
    node.append("text")
    .attr("dy", "0.31em")
    .attr("x", d => d.children ? -13 : 13)
    .attr("text-anchor", d => d.children ? "end" : "start")
    .text(d => d.data.name)
    .style("font-size", d => {
        if (d.depth === 0) return "14px";
        if (d.depth === 1) return "11px";
        return "10px";
    })
    .style("font-weight", d => d.depth === 0 ? "bold" : "normal")
    .style("fill", "#2c3e50");
}

// Zoom control functions
function zoomIn() {
    svg.transition().call(
        zoomBehavior.scaleBy, 1.5
    );
}

function zoomOut() {
    svg.transition().call(
        zoomBehavior.scaleBy, 1 / 1.5
    );
}

function resetZoom() {
    svg.transition().call(
        zoomBehavior.transform,
        d3.zoomIdentity
    );
}

function resetFilters() {
    document.getElementById('scenarioFilter').value = '';
    document.getElementById('minConnections').value = '1';
    updateVisualization();
}

// Event listeners
document.getElementById('visualizationType').addEventListener('change', updateVisualization);
document.getElementById('scenarioFilter').addEventListener('change', updateVisualization);
document.getElementById('minConnections').addEventListener('change', updateVisualization);

// Initialize
<?php if (!empty($csvData)): ?>
populateFilters();
updateVisualization();
<?php else: ?>
console.error('No CSV data loaded. Please check the file path.');
<?php endif; ?>
</script>
</body>
</html>
