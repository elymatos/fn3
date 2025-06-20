<?php
// radial_force.php

// 1) Read CSV (skip header!) and collect parent–child pairs & unique node IDs
$rows = [];
$nodes = [];
if (($h = fopen("data.csv","r")) !== false) {
    // Skip the header row ("parent","child")
    fgetcsv($h, 1000, ",");
    while (($r = fgetcsv($h, 1000, ",")) !== false) {
        $p = trim($r[0]);
        $c = trim($r[1]);
        if ($p === "" || $c === "") continue;
        $rows[] = ['parent' => $p, 'child' => $c];
        $nodes[$p] = true;
        $nodes[$c] = true;
    }
    fclose($h);
}

// 2) Build childrenMap and detect roots
$childrenMap = [];
$hasParent   = [];
foreach ($rows as $rc) {
    $childrenMap[$rc['parent']][] = $rc['child'];
    $hasParent[$rc['child']] = true;
}

// Find root(s) = nodes with no parent
$roots = [];
foreach (array_keys($nodes) as $id) {
    if (!isset($hasParent[$id])) {
        $roots[] = $id;
    }
}

// If more than one root, inject a super-root
if (count($roots) > 1) {
    $super = "__ROOT__";
    foreach ($roots as $r) {
        $childrenMap[$super][] = $r;
    }
    $nodes[$super] = true;
    $roots = [$super];
}

// 3) Prepare JSON for links & nodes
$links = [];
foreach ($rows as $rc) {
    $links[] = ['source' => $rc['parent'], 'target' => $rc['child']];
}
$nodesList = array_map(function($id) {
    return ['id' => $id];
}, array_keys($nodes));
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Radial Force-Directed DAG</title>
<style>
body { margin:0; overflow:hidden; }
svg { display:block; }
.link {
    stroke: #999;
    stroke-opacity: 0.6;
    stroke-width: 1.5px;
}
.node circle {
    fill: #69b3a2;
    stroke: #333;
    stroke-width: 1px;
}
text {
    font: 10px sans-serif;
    pointer-events: none;
}
</style>
</head>
<body>
<svg id="chart"></svg>
<script src="https://d3js.org/d3.v7.min.js"></script>
<script>
(function() {
    const width   = window.innerWidth;
    const height  = window.innerHeight;
    const center  = { x: width/2, y: height/2 };
    const levelGap = 80;  // change this freely!

    // 4) Load PHP-generated data
    const nodes = <?php echo json_encode($nodesList, JSON_UNESCAPED_UNICODE); ?>;
    const links = <?php echo json_encode($links, JSON_UNESCAPED_UNICODE); ?>;

    // 5) Build a childrenMap in JS (from the same PHP data)
    const childrenMap = {};
    links.forEach(l => {
        (childrenMap[l.source] ??= []).push(l.target);
    });

    // 6) BFS to compute depth from root(s)
    const depth = {};
    const queue = [];
    <?php foreach($roots as $r): ?>
    depth["<?php echo $r ?>"] = 0;
    queue.push("<?php echo $r ?>");
    <?php endforeach; ?>

    while (queue.length) {
        const u = queue.shift();
        const d = depth[u] + 1;
        (childrenMap[u] || []).forEach(child => {
            if (depth[child] === undefined || d < depth[child]) {
                depth[child] = d;
                queue.push(child);
            }
        });
    }

    console.log("Depth map:", depth);  // should show non-zero depths!

    // 7) Attach targetRadius & initial position
    nodes.forEach(n => {
        n.depth = depth[n.id] ?? 0;
        n.targetRadius = n.depth * levelGap;
        const angle = Math.random() * 2 * Math.PI;
        n.x = center.x + Math.cos(angle) * n.targetRadius;
        n.y = center.y + Math.sin(angle) * n.targetRadius;
    });

    // 8) Create SVG & draw links/nodes
    const svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

    const link = svg.append("g")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("class","link");

    const node = svg.append("g")
    .selectAll("g")
    .data(nodes)
    .join("g");

    node.append("circle")
    .attr("class","node")
    .attr("r", 4);

    node.append("text")
    .attr("dy", "-0.3em")
    .attr("text-anchor", "middle")
    .text(d => d.id);

    // 9) Force simulation
    d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links)
    .id(d => d.id)
    .distance(30)
    .strength(1)
    )
    .force("radial", d3.forceRadial(d => d.targetRadius, center.x, center.y)
    .strength(1)
    )
    .force("charge", d3.forceManyBody().strength(-50))
    .on("tick", () => {
        link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
        node
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });
})();
</script>
</body>
</html>
