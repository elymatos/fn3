<?php
/**
 * Scenario Frame Tree Generator
 * Reads CSV files and generates an interactive hierarchical tree visualization
 */

// Configuration
$csvFiles = [
    'scenario_frame_groupings' => 'scenario_frame_groupings.csv',
'scenarios_frames' => 'scenarios_frames.csv',
'frame_relations' => 'frame_relations.csv'
];

// Check if CSV files exist
foreach ($csvFiles as $key => $file) {
    if (!file_exists($file)) {
        die("Error: CSV file '$file' not found. Please ensure all CSV files are in the same directory as this script.\n");
    }
}

/**
 * Parse CSV file into associative array
 */
function parseCSV($filename) {
    $data = [];
    if (($handle = fopen($filename, "r")) !== FALSE) {
        $headers = fgetcsv($handle);
        while (($row = fgetcsv($handle)) !== FALSE) {
            $assocRow = [];
            foreach ($headers as $index => $header) {
                $value = isset($row[$index]) ? trim($row[$index]) : '';
                // Convert numeric values
                $assocRow[$header] = is_numeric($value) ? (int)$value : $value;
            }
            $data[] = $assocRow;
        }
        fclose($handle);
    }
    return $data;
}

// Load and parse CSV data
echo "Loading CSV files...\n";
$scenarioGroupings = parseCSV($csvFiles['scenario_frame_groupings']);
$scenariosFrames = parseCSV($csvFiles['scenarios_frames']);
$frameRelations = parseCSV($csvFiles['frame_relations']);

echo "Loaded:\n";
echo "- Scenario groupings: " . count($scenarioGroupings) . " records\n";
echo "- Scenario frames: " . count($scenariosFrames) . " records\n";
echo "- Frame relations: " . count($frameRelations) . " records\n\n";

// Build scenario frame mapping
$scenarioFrameMap = [];
foreach ($scenariosFrames as $frame) {
    $scenarioFrameMap[$frame['idFrame']] = $frame['name'];
}

$scenarioFrameIds = array_keys($scenarioFrameMap);

// Find scenario hierarchies
$scenarioHierarchies = array_filter($frameRelations, function($relation) use ($scenarioFrameIds) {
    return in_array($relation['parent'], $scenarioFrameIds) &&
    in_array($relation['child'], $scenarioFrameIds);
});

echo "Found " . count($scenarioHierarchies) . " scenario hierarchical relationships\n";

// Build tree structure
function buildNode($scenarioId, $scenarioHierarchies, $scenarioGroupings, $scenarioFrameMap, $depth = 0) {
    // Get children scenarios
    $children = [];
    foreach ($scenarioHierarchies as $relation) {
        if ($relation['parent'] == $scenarioId) {
            $child = buildNode($relation['child'], $scenarioHierarchies, $scenarioGroupings, $scenarioFrameMap, $depth + 1);
            $child['relation'] = $relation['relation'];
            $children[] = $child;
        }
    }

    // Get component frames
    $components = [];
    foreach ($scenarioGroupings as $grouping) {
        if ($grouping['idFrameScenario'] == $scenarioId) {
            $components[] = [
                'id' => $grouping['idFrameChild'],
                'name' => $grouping['childFrameName']
            ];
        }
    }

    return [
        'id' => $scenarioId,
        'name' => $scenarioFrameMap[$scenarioId],
        'depth' => $depth,
        'children' => $children,
        'components' => $components,
        'hasComponents' => count($components) > 0,
        'hasChildren' => count($children) > 0
    ];
}

// Find root and standalone scenarios
$childScenarios = array_unique(array_column($scenarioHierarchies, 'child'));
$parentScenarios = array_unique(array_column($scenarioHierarchies, 'parent'));
$rootScenarios = array_diff($parentScenarios, $childScenarios);

$scenariosWithComponents = array_unique(array_column($scenarioGroupings, 'idFrameScenario'));
$standaloneScenarios = array_diff($scenariosWithComponents, array_merge($childScenarios, $parentScenarios));

echo "Root scenarios: " . count($rootScenarios) . "\n";
echo "Standalone scenarios: " . count($standaloneScenarios) . "\n";

// Build all trees
$allTrees = [];

foreach ($rootScenarios as $rootId) {
    $allTrees[] = buildNode($rootId, $scenarioHierarchies, $scenarioGroupings, $scenarioFrameMap);
}

foreach ($standaloneScenarios as $standaloneId) {
    $allTrees[] = buildNode($standaloneId, $scenarioHierarchies, $scenarioGroupings, $scenarioFrameMap);
}

// Sort trees by name
usort($allTrees, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

$stats = [
    'totalTrees' => count($allTrees),
    'withHierarchy' => count($rootScenarios),
    'standalone' => count($standaloneScenarios),
    'totalComponents' => count($scenarioGroupings)
];

echo "Generated " . $stats['totalTrees'] . " tree structures\n";
echo "Generating HTML...\n";

// Generate HTML
function renderNode($node, $depth = 0) {
    $indent = str_repeat('    ', $depth + 2);
    $marginLeft = $depth * 40;

    $nodeClass = $depth === 0 ? 'scenario-node' : 'child-scenario-node';
    $relationLabel = isset($node['relation']) ? "<div class=\"relation-label\">{$node['relation']}</div>" : '';

    $html = "{$indent}<div class=\"node\" style=\"margin-left: {$marginLeft}px;\">\n";
    $html .= "{$indent}    <div class=\"{$nodeClass}\">\n";
    $html .= "{$indent}        {$node['name']}\n";
    $html .= "{$indent}        {$relationLabel}\n";
    $html .= "{$indent}    </div>\n";

    if (count($node['components']) > 0) {
        $html .= "{$indent}    <div class=\"connector\"></div>\n";
        $html .= "{$indent}    <div class=\"components-container\">\n";
        foreach ($node['components'] as $component) {
            $html .= "{$indent}        <div class=\"component\" title=\"{$component['name']}\">{$component['name']}</div>\n";
        }
        $html .= "{$indent}    </div>\n";
    }

    $html .= "{$indent}</div>\n";

    // Render children
    foreach ($node['children'] as $child) {
        $html .= renderNode($child, $depth + 1);
    }

    return $html;
}

$htmlContent = '<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Scenario Frame Hierarchical Tree</title>
<style>
body {
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
margin: 0;
padding: 20px;
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
min-height: 100vh;
}

.container {
max-width: 100%;
margin: 0 auto;
background: white;
border-radius: 12px;
box-shadow: 0 10px 30px rgba(0,0,0,0.1);
overflow: hidden;
}

.header {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 25px;
text-align: center;
}

.header h1 {
margin: 0;
font-size: 28px;
font-weight: 300;
}

.header p {
margin: 10px 0 0 0;
opacity: 0.9;
font-size: 16px;
}

.controls {
padding: 20px;
background: #f8f9fa;
border-bottom: 1px solid #e9ecef;
display: flex;
gap: 15px;
align-items: center;
flex-wrap: wrap;
}

.control-group {
display: flex;
align-items: center;
gap: 8px;
}

.control-group label {
font-weight: 500;
color: #495057;
}

select, input[type="text"] {
padding: 8px 12px;
border: 1px solid #ced4da;
border-radius: 6px;
font-size: 14px;
background: white;
}

.tree-container {
padding: 30px;
overflow-x: auto;
overflow-y: auto;
max-height: 80vh;
}

.tree {
margin-bottom: 40px;
border: 1px solid #e9ecef;
border-radius: 8px;
background: #ffffff;
padding: 20px;
}

.tree-title {
font-size: 18px;
font-weight: 600;
color: #2c3e50;
margin-bottom: 20px;
padding-bottom: 10px;
border-bottom: 2px solid #667eea;
}

.node {
display: flex;
align-items: flex-start;
margin: 15px 0;
position: relative;
}

.scenario-node {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
color: white;
padding: 12px 18px;
border-radius: 8px;
font-weight: 600;
min-width: 200px;
text-align: center;
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
position: relative;
}

.child-scenario-node {
background: linear-gradient(135deg, #48cae4 0%, #0077b6 100%);
color: white;
padding: 10px 16px;
border-radius: 6px;
font-weight: 500;
min-width: 180px;
text-align: center;
box-shadow: 0 3px 10px rgba(72, 202, 228, 0.3);
}

.components-container {
margin-left: 30px;
display: flex;
flex-wrap: wrap;
gap: 8px;
align-items: center;
max-width: 600px;
}

.component {
background: #f8f9fa;
border: 1px solid #dee2e6;
padding: 6px 12px;
border-radius: 20px;
font-size: 13px;
color: #495057;
transition: all 0.2s;
cursor: pointer;
}

.component:hover {
background: #e9ecef;
transform: translateY(-1px);
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.connector {
display: flex;
align-items: center;
margin: 0 15px;
}

.connector::before {
content: "";
width: 20px;
height: 2px;
background: #667eea;
display: block;
}

.relation-label {
background: #fff3cd;
color: #856404;
padding: 2px 8px;
border-radius: 12px;
font-size: 11px;
font-weight: 500;
margin-top: 5px;
border: 1px solid #ffeaa7;
display: inline-block;
}

.stats {
background: #f8f9fa;
padding: 15px;
border-radius: 8px;
margin-bottom: 20px;
display: flex;
gap: 20px;
flex-wrap: wrap;
}

.stat-item {
display: flex;
align-items: center;
gap: 8px;
}

.stat-number {
background: #667eea;
color: white;
padding: 4px 8px;
border-radius: 4px;
font-weight: 600;
font-size: 14px;
}

.hidden {
display: none;
}

.search-highlight {
background: #fff3cd !important;
border-color: #ffc107 !important;
}
</style>
</head>
<body>
<div class="container">
<div class="header">
<h1>Scenario Frame Hierarchical Structure</h1>
<p>Interactive visualization of scenario frames and their component relationships</p>
</div>

<div class="controls">
<div class="control-group">
<label>Filter:</label>
<select id="filterType" onchange="filterTrees()">
<option value="all">All Trees</option>
<option value="hierarchical">Hierarchical Only</option>
<option value="standalone">Standalone Only</option>
<option value="with-components">With Components</option>
</select>
</div>

<div class="control-group">
<label>Search:</label>
<input type="text" id="searchInput" placeholder="Search scenarios or components..." oninput="searchTrees()">
</div>
</div>

<div class="tree-container">
<div class="stats">
<div class="stat-item">
<span>Total Trees:</span>
<span class="stat-number">' . $stats['totalTrees'] . '</span>
</div>
<div class="stat-item">
<span>Hierarchical:</span>
<span class="stat-number">' . $stats['withHierarchy'] . '</span>
</div>
<div class="stat-item">
<span>Standalone:</span>
<span class="stat-number">' . $stats['standalone'] . '</span>
</div>
<div class="stat-item">
<span>Total Components:</span>
<span class="stat-number">' . $stats['totalComponents'] . '</span>
</div>
</div>

<div id="trees-container">';

// Generate trees
foreach ($allTrees as $tree) {
    $childrenCount = count($tree['children']);
    $componentsCount = count($tree['components']);
    $hasHierarchy = $tree['hasChildren'] ? 'hierarchical' : 'standalone';
    $hasComponents = $tree['hasComponents'] ? 'with-components' : 'no-components';

    $htmlContent .= "
    <div class=\"tree\" data-type=\"{$hasHierarchy}\" data-components=\"{$hasComponents}\">
    <div class=\"tree-title\">
    {$tree['name']}
    <span style=\"font-weight: normal; color: #6c757d; font-size: 14px;\">
    ({$childrenCount} children, {$componentsCount} components)
    </span>
    </div>
    " . renderNode($tree) . "
    </div>";
}

$htmlContent .= '
</div>
</div>
</div>

<script>
function filterTrees() {
const filterType = document.getElementById("filterType").value;
const trees = document.querySelectorAll(".tree");

trees.forEach(tree => {
const treeType = tree.getAttribute("data-type");
const hasComponents = tree.getAttribute("data-components");

let show = true;

switch(filterType) {
    case "hierarchical":
        show = treeType === "hierarchical";
        break;
    case "standalone":
        show = treeType === "standalone";
        break;
    case "with-components":
        show = hasComponents === "with-components";
        break;
    case "all":
    default:
        show = true;
        break;
        }

        tree.style.display = show ? "block" : "none";
        });
        }

        function searchTrees() {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase();
        const trees = document.querySelectorAll(".tree");

        trees.forEach(tree => {
        const text = tree.textContent.toLowerCase();
        const matches = text.includes(searchTerm);
        tree.style.display = matches ? "block" : "none";

        // Highlight matching components
        const components = tree.querySelectorAll(".component");
        components.forEach(component => {
        if (component.textContent.toLowerCase().includes(searchTerm)) {
            component.classList.add("search-highlight");
            } else {
                component.classList.remove("search-highlight");
                }
                });

                // Highlight matching scenario names
                const scenarios = tree.querySelectorAll(".scenario-node, .child-scenario-node");
                scenarios.forEach(scenario => {
                if (scenario.textContent.toLowerCase().includes(searchTerm)) {
                    scenario.classList.add("search-highlight");
                    } else {
                        scenario.classList.remove("search-highlight");
                        }
                        });
                        });
                        }
                        </script>
                        </body>
                        </html>';

// Write HTML file
$outputFile = 'scenario_frame_tree.html';
file_put_contents($outputFile, $htmlContent);

echo "HTML file generated successfully: {$outputFile}\n";
echo "Open the file in your web browser to view the interactive tree visualization.\n";

// Display some sample data for verification
echo "\nSample tree structures:\n";
foreach (array_slice($allTrees, 0, 3) as $i => $tree) {
    echo ($i + 1) . ". {$tree['name']}\n";
    echo "   Children: " . count($tree['children']) . "\n";
    echo "   Components: " . count($tree['components']) . "\n";
    if (count($tree['components']) > 0) {
        echo "   Sample components: " . implode(', ', array_slice(array_column($tree['components'], 'name'), 0, 3)) . "\n";
    }
    echo "\n";
}
?>
