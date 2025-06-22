<?php
/**
 * Complete DUL Documentation Generator with All Features Restored
 * Fixed version with full functionality
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configuration
$config = [
    'max_nesting_level' => 5,
'show_empty_properties' => false,
'highlight_top_level' => true,
'show_uri_links' => true,
'default_language' => 'en',
'fallback_languages' => ['en', 'it', null],
'chunk_size' => 100,
'enable_lazy_loading' => true,
'cache_enabled' => false,
'file_format' => 'auto'
];

// Set constants for namespaces
define('OWL_NAMESPACE', 'http://www.w3.org/2002/07/owl#');
define('RDF_NAMESPACE', 'http://www.w3.org/1999/02/22-rdf-syntax-ns#');
define('RDFS_NAMESPACE', 'http://www.w3.org/2000/01/rdf-schema#');
define('DUL_NAMESPACE', 'http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#');

// Initialize data structures
$classes = [];
$properties = [];
$statistics = [
    'total_classes' => 0,
'total_properties' => 0,
'max_depth' => 0,
'processing_time' => 0
];

$startTime = microtime(true);

// Check if export format is requested
if (isset($_GET['format']) && $_GET['format'] === 'json') {
    handleJsonExport();
    exit;
}

/**
 * Handle JSON export request
 */
function handleJsonExport() {
    global $classes, $properties, $statistics;

    header('Content-Type: application/json');
    header('Content-Disposition: attachment; filename="dul_ontology_export.json"');

    echo json_encode([
        'ontology' => 'DUL',
        'version' => '3.34',
        'generated' => date('c'),
                     'statistics' => $statistics,
                     'classes' => $classes,
                     'properties' => $properties
    ], JSON_PRETTY_PRINT);
}

/**
 * Fixed function to extract multilingual text content
 */
function extractMultilingualText($data, $preferredLangs = ['en', 'it', null]) {
    if (empty($data)) {
        return '';
    }

    // If it's a simple string, return it
    if (is_string($data)) {
        return trim($data);
    }

    // If it's not an array, return empty
    if (!is_array($data)) {
        return '';
    }

    // If it's a single object with @value
    if (isset($data['@value'])) {
        return trim($data['@value']);
    }

    // If it's an array of objects
    $textByLang = [];
    $fallbackText = '';

    foreach ($data as $item) {
        if (is_string($item)) {
            if (empty($fallbackText)) {
                $fallbackText = trim($item);
            }
        } elseif (is_array($item) && isset($item['@value'])) {
            $text = trim($item['@value']);
            $lang = isset($item['@language']) ? $item['@language'] : null;

            if (empty($fallbackText)) {
                $fallbackText = $text;
            }

            $textByLang[$lang] = $text;
        }
    }

    // Try to find text in preferred language order
    foreach ($preferredLangs as $lang) {
        if (isset($textByLang[$lang]) && !empty($textByLang[$lang])) {
            return $textByLang[$lang];
        }
    }

    return $fallbackText;
}

/**
 * Extract name from URI
 */
function extractNameFromUri($uri) {
    if (empty($uri)) {
        return 'Unknown';
    }

    // Remove any trailing file extensions
    $name = preg_replace('/\.owl.*$/', '', $uri);

    // If it contains #, take everything after the last #
    if (strpos($name, '#') !== false) {
        $name = substr($name, strrpos($name, '#') + 1);
    }

    // If it still contains /, take everything after the last /
    if (strpos($name, '/') !== false) {
        $name = substr($name, strrpos($name, '/') + 1);
    }

    return trim($name);
}

/**
 * Check if a URI belongs to DUL namespace
 */
function isDulNamespace($uri) {
    return strpos($uri, DUL_NAMESPACE) === 0;
}

/**
 * Check if item is a class
 */
function isClass($item) {
    if (!isset($item['@type'])) {
        return false;
    }

    $types = is_array($item['@type']) ? $item['@type'] : [$item['@type']];

    foreach ($types as $type) {
        if ($type === 'http://www.w3.org/2002/07/owl#Class' ||
            $type === 'owl:Class' ||
            $type === OWL_NAMESPACE . 'Class') {
            return true;
            }
    }

    return false;
}

/**
 * Check if item is a property and return its type
 */
function getPropertyType($item) {
    if (!isset($item['@type'])) {
        return false;
    }

    $types = is_array($item['@type']) ? $item['@type'] : [$item['@type']];

    foreach ($types as $type) {
        if ($type === 'http://www.w3.org/2002/07/owl#ObjectProperty' ||
            $type === 'owl:ObjectProperty' ||
            $type === OWL_NAMESPACE . 'ObjectProperty') {
            return 'ObjectProperty';
            }
            if ($type === 'http://www.w3.org/2002/07/owl#DatatypeProperty' ||
                $type === 'owl:DatatypeProperty' ||
                $type === OWL_NAMESPACE . 'DatatypeProperty') {
                return 'DatatypeProperty';
                }
    }

    return false;
}

/**
 * Extract array of URIs from a field
 */
function extractUriArray($item, $fieldNames) {
    $uris = [];

    foreach ($fieldNames as $field) {
        if (isset($item[$field])) {
            $values = is_array($item[$field]) ? $item[$field] : [$item[$field]];

            foreach ($values as $value) {
                if (is_string($value)) {
                    $uris[] = $value;
                } elseif (is_array($value) && isset($value['@id'])) {
                    $uris[] = $value['@id'];
                }
            }
            break;
        }
    }

    return array_unique($uris);
}

/**
 * Calculate hierarchy depth for a class
 */
function calculateClassDepth($classUri, $allClasses, $visited = []) {
    if (in_array($classUri, $visited) || !isset($allClasses[$classUri])) {
        return 0;
    }

    $visited[] = $classUri;
    $maxDepth = 0;

    foreach ($allClasses[$classUri]['subClasses'] as $subClassUri) {
        $depth = calculateClassDepth($subClassUri, $allClasses, $visited);
        $maxDepth = max($maxDepth, $depth);
    }

    return $maxDepth + 1;
}

/**
 * Generate breadcrumbs for a class
 */
function generateBreadcrumbs($classUri, $allClasses) {
    $breadcrumbs = [];
    $current = $classUri;
    $visited = [];

    while ($current && isset($allClasses[$current]) && !in_array($current, $visited)) {
        $visited[] = $current;
        $breadcrumbs[] = $allClasses[$current];
        // Take first parent to avoid infinite loops
        $current = !empty($allClasses[$current]['superClasses']) ? $allClasses[$current]['superClasses'][0] : null;
    }

    return array_reverse($breadcrumbs);
}

/**
 * Parse JSON-LD file with full functionality
 */
function parseJsonLdFile($filePath) {
    global $classes, $properties, $config;

    $content = file_get_contents($filePath);
    if ($content === false) {
        die("Error: Could not read JSON-LD file '{$filePath}'.");
    }

    $data = json_decode($content, true);
    if ($data === null) {
        die("Error: Invalid JSON in file '{$filePath}'. JSON Error: " . json_last_error_msg());
    }

    // Handle different JSON-LD structures
    $items = [];
    if (isset($data['@graph'])) {
        $items = $data['@graph'];
    } elseif (is_array($data) && isset($data[0])) {
        $items = $data;
    } else {
        $items = [$data];
    }

    echo "<div style='background: lightblue; padding: 10px; margin: 10px;'>Processing " . count($items) . " items from JSON-LD</div>";

    $classCount = 0;
    $propertyCount = 0;
    $definitionCount = 0;

    // First pass: Process all classes
    foreach ($items as $item) {
        if (!isset($item['@id'])) continue;

        $uri = $item['@id'];

        // Skip blank nodes and non-DUL URIs
        if (strpos($uri, '_:') === 0 || !isDulNamespace($uri)) continue;

        // Process classes
        if (isClass($item)) {
            $classCount++;

            // Extract name
            $name = '';
            if (isset($item['http://www.w3.org/2000/01/rdf-schema#label'])) {
                $name = extractMultilingualText($item['http://www.w3.org/2000/01/rdf-schema#label'], $config['fallback_languages']);
            }
            if (empty($name) && isset($item['rdfs:label'])) {
                $name = extractMultilingualText($item['rdfs:label'], $config['fallback_languages']);
            }
            if (empty($name)) {
                $name = extractNameFromUri($uri);
            }

            // Extract definition
            $definition = '';
            if (isset($item['http://www.w3.org/2000/01/rdf-schema#comment'])) {
                $definition = extractMultilingualText($item['http://www.w3.org/2000/01/rdf-schema#comment'], $config['fallback_languages']);
            }
            if (empty($definition) && isset($item['rdfs:comment'])) {
                $definition = extractMultilingualText($item['rdfs:comment'], $config['fallback_languages']);
            }

            if (!empty($definition)) {
                $definitionCount++;
            }

            $classes[$uri] = [
                'name' => $name,
                'uri' => $uri,
                'definition' => $definition,
                'subClasses' => [],
                'superClasses' => [],
                'properties' => [],
                'restrictions' => [],
                'level' => 0,
                'isTopLevel' => false,
                'metadata' => [
                    'deprecated' => false,
                    'hasRestrictions' => false
                ]
            ];
        }

        // Process properties
        $propType = getPropertyType($item);
        if ($propType) {
            $propertyCount++;

            // Extract name
            $name = '';
            if (isset($item['http://www.w3.org/2000/01/rdf-schema#label'])) {
                $name = extractMultilingualText($item['http://www.w3.org/2000/01/rdf-schema#label'], $config['fallback_languages']);
            }
            if (empty($name) && isset($item['rdfs:label'])) {
                $name = extractMultilingualText($item['rdfs:label'], $config['fallback_languages']);
            }
            if (empty($name)) {
                $name = extractNameFromUri($uri);
            }

            // Extract definition
            $definition = '';
            if (isset($item['http://www.w3.org/2000/01/rdf-schema#comment'])) {
                $definition = extractMultilingualText($item['http://www.w3.org/2000/01/rdf-schema#comment'], $config['fallback_languages']);
            }
            if (empty($definition) && isset($item['rdfs:comment'])) {
                $definition = extractMultilingualText($item['rdfs:comment'], $config['fallback_languages']);
            }

            // Extract domains
            $domains = extractUriArray($item, ['http://www.w3.org/2000/01/rdf-schema#domain', 'rdfs:domain']);

            // Extract ranges
            $ranges = extractUriArray($item, ['http://www.w3.org/2000/01/rdf-schema#range', 'rdfs:range']);

            // Check for functional properties
            $types = is_array($item['@type']) ? $item['@type'] : [$item['@type']];
            $isFunctional = in_array('http://www.w3.org/2002/07/owl#FunctionalProperty', $types) ||
            in_array('owl:FunctionalProperty', $types);
            $isInverseFunctional = in_array('http://www.w3.org/2002/07/owl#InverseFunctionalProperty', $types) ||
            in_array('owl:InverseFunctionalProperty', $types);

            $properties[$uri] = [
                'name' => $name,
                'uri' => $uri,
                'type' => $propType,
                'definition' => $definition,
                'domains' => $domains,
                'ranges' => $ranges,
                'isFunctional' => $isFunctional,
                'isInverseFunctional' => $isInverseFunctional
            ];
        }
    }

    // Second pass: Build hierarchy and assign properties
    foreach ($items as $item) {
        if (!isset($item['@id']) || !isset($classes[$item['@id']])) continue;

        $uri = $item['@id'];

        // Handle subClassOf relationships
        $superClasses = extractUriArray($item, ['http://www.w3.org/2000/01/rdf-schema#subClassOf', 'rdfs:subClassOf']);

        foreach ($superClasses as $parentUri) {
            if (isDulNamespace($parentUri) && isset($classes[$parentUri])) {
                if (!in_array($parentUri, $classes[$uri]['superClasses'])) {
                    $classes[$uri]['superClasses'][] = $parentUri;
                }
                if (!in_array($uri, $classes[$parentUri]['subClasses'])) {
                    $classes[$parentUri]['subClasses'][] = $uri;
                }
            }
        }
    }

    // Third pass: Assign properties to their domain classes
    foreach ($properties as $propUri => $property) {
        foreach ($property['domains'] as $domain) {
            if (isset($classes[$domain])) {
                if (!in_array($propUri, $classes[$domain]['properties'])) {
                    $classes[$domain]['properties'][] = $propUri;
                }
            }
        }
    }

    // Determine top-level classes and calculate depths
    foreach ($classes as $uri => &$classData) {
        $classData['isTopLevel'] = empty($classData['superClasses']);
    }

    echo "<div style='background: lightgreen; padding: 10px; margin: 10px;'>";
    echo "✓ JSON-LD parsing completed!<br>";
    echo "Classes found: {$classCount} (with definitions: {$definitionCount})<br>";
    echo "Properties found: {$propertyCount}<br>";
    echo "Top-level classes: " . count(array_filter($classes, function($c) { return $c['isTopLevel']; })) . "<br>";
    echo "</div>";
}

/**
 * Find files to parse
 */
function findDulFile() {
    $possibleFiles = [
        'DUL.jsonld.txt',
        'DUL.jsonld',
        'DUL.json',
        'DUL_3_34.owl.txt',
        'DUL.owl',
        'DUL.ttl',
        'dul.ttl'
    ];

    foreach ($possibleFiles as $file) {
        if (file_exists($file)) {
            echo "<div style='background: lightgreen; padding: 10px; margin: 5px;'>Found file: {$file}</div>";
            return $file;
        }
    }

    return null;
}

/**
 * Render breadcrumbs
 */
function renderBreadcrumbs($classUri, $allClasses) {
    $breadcrumbs = generateBreadcrumbs($classUri, $allClasses);
    if (count($breadcrumbs) <= 1) return '';

    $html = "<nav class='breadcrumbs mb-4' aria-label='Breadcrumb'>";
    $html .= "<ol class='flex items-center space-x-2 text-sm text-gray-500'>";

    foreach ($breadcrumbs as $index => $crumb) {
        if ($index > 0) {
            $html .= "<li><svg class='w-4 h-4' fill='currentColor' viewBox='0 0 20 20'><path fill-rule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clip-rule='evenodd'></path></svg></li>";
        }

        $linkId = 'class-' . strtolower(str_replace([' ', '#', '/', ':'], '-', extractNameFromUri($crumb['uri'])));
        if ($index === count($breadcrumbs) - 1) {
            $html .= "<li class='font-medium text-gray-900'>{$crumb['name']}</li>";
        } else {
            $html .= "<li><a href='#{$linkId}' class='hover:text-gray-700 breadcrumb-link'>{$crumb['name']}</a></li>";
        }
    }

    $html .= "</ol></nav>";
    return $html;
}

/**
 * Render properties section
 */
function renderProperties($class, $allProperties, $allClasses) {
    if (empty($class['properties'])) return '';

    $html = "<div class='properties-section mb-4'>";
    $html .= "<h4 class='text-lg font-semibold text-gray-800 mb-2'>Properties (Domain: {$class['name']}):</h4>";
    $html .= "<div class='space-y-2'>";

    foreach ($class['properties'] as $propUri) {
        if (isset($allProperties[$propUri])) {
            $prop = $allProperties[$propUri];
            $html .= "<div class='property-item p-3 bg-gray-50 rounded border-l-4 border-blue-500'>";
            $html .= "<div class='flex items-center justify-between mb-1'>";
            $html .= "<span class='font-medium text-gray-900'>" . htmlspecialchars($prop['name']) . "</span>";
            $html .= "<span class='text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded'>{$prop['type']}</span>";
            $html .= "</div>";

            // Range information
            if (!empty($prop['ranges'])) {
                $rangeNames = array_map(function($range) use ($allClasses) {
                    return isset($allClasses[$range]) ? $allClasses[$range]['name'] : extractNameFromUri($range);
                }, $prop['ranges']);
                $html .= "<p class='text-sm text-gray-600 mb-1'><strong>Range:</strong> " . implode(', ', $rangeNames) . "</p>";
            }

            // Property characteristics
            $characteristics = [];
            if ($prop['isFunctional']) $characteristics[] = 'Functional';
            if ($prop['isInverseFunctional']) $characteristics[] = 'Inverse Functional';
            if (!empty($characteristics)) {
                $html .= "<p class='text-sm text-gray-600 mb-1'><strong>Characteristics:</strong> " . implode(', ', $characteristics) . "</p>";
            }

            if (!empty($prop['definition'])) {
                $html .= "<p class='text-sm text-gray-700'>" . htmlspecialchars($prop['definition']) . "</p>";
            }
            $html .= "</div>";
        }
    }

    $html .= "</div></div>";
    return $html;
}

/**
 * Render class card with full functionality
 */
function renderClassCard($classUri, $allClasses, $allProperties, $level = 0) {
    if (!isset($allClasses[$classUri])) {
        return '';
    }

    $class = $allClasses[$classUri];
    $cardId = 'class-' . strtolower(str_replace([' ', '#', '/', ':'], '-', extractNameFromUri($class['uri'])));
    $marginClass = $level > 0 ? 'ml-' . min($level * 4, 16) : '';

    $html = "<div class='class-card bg-white rounded-lg shadow-md p-6 mb-4 {$marginClass} border border-gray-200' data-class-name='" . strtolower($class['name']) . "' data-class-uri='{$classUri}'>";

    // Breadcrumbs for non-top-level classes
    if (!$class['isTopLevel'] && $level === 0) {
        $html .= renderBreadcrumbs($classUri, $allClasses);
    }

    // Header
    $html .= "<div class='card-header mb-4'>";
    $html .= "<h" . min($level + 3, 6) . " id='{$cardId}' class='text-2xl font-bold text-gray-800 flex items-center justify-between'>";

    // Class name with parent info
    $classNameWithParent = htmlspecialchars($class['name']);
    if (!empty($class['superClasses'])) {
        $parentUri = $class['superClasses'][0];
        if (isset($allClasses[$parentUri])) {
            $parentName = $allClasses[$parentUri]['name'];
            $classNameWithParent .= " <span class='text-gray-600 font-normal text-lg'>[{$parentName}]</span>";
        }
    }

    $html .= "<span>{$classNameWithParent}</span>";

    // Badges
    if ($class['isTopLevel']) {
        $html .= "<span class='badge bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2'>Top Level</span>";
    }

    if (!empty($class['subClasses'])) {
        $html .= "<button class='toggle-subclasses-btn text-blue-500 hover:text-blue-700 focus:outline-none' data-target='#{$cardId}-subclasses' aria-expanded='false'>";
        $html .= "<svg class='w-5 h-5 inline-block transform transition-transform duration-200' fill='currentColor' viewBox='0 0 20 20'><path fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd'></path></svg>";
        $html .= "</button>";
    }

    $html .= "</h" . min($level + 3, 6) . ">";

    // URI link
    $html .= "<p class='text-sm text-gray-500 mt-1'><a href='{$class['uri']}' target='_blank' class='hover:underline'>{$class['uri']}</a></p>";
    $html .= "</div>";

    // Body
    $html .= "<div class='card-body text-gray-700'>";

    // Definition
    if (!empty($class['definition'])) {
        $html .= "<div class='definition mb-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded'>";
        $html .= htmlspecialchars($class['definition']);
        $html .= "</div>";
    } else {
        $html .= "<div class='definition mb-4 text-gray-500 italic'>No definition available.</div>";
    }

    // Superclasses
    if (!empty($class['superClasses'])) {
        $html .= "<div class='superclasses-section mb-3'>";
        $html .= "<h4 class='text-lg font-semibold text-gray-800 mb-2'>Subclass Of:</h4>";
        $html .= "<ul class='list-disc list-inside ml-4 space-y-1'>";
        foreach ($class['superClasses'] as $superClassUri) {
            $superClassName = isset($allClasses[$superClassUri]) ? $allClasses[$superClassUri]['name'] : extractNameFromUri($superClassUri);
            $linkId = 'class-' . strtolower(str_replace([' ', '#', '/', ':'], '-', extractNameFromUri($superClassUri)));
            $html .= "<li><a href='#{$linkId}' class='superclass-link text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-150'>{$superClassName}</a></li>";
        }
        $html .= "</ul></div>";
    }

    // Properties
    if (!empty($class['properties'])) {
        $html .= renderProperties($class, $allProperties, $allClasses);
    }

    // Subclasses
    if (!empty($class['subClasses'])) {
        $html .= "<div class='subclasses-section mt-4'>";
        $html .= "<h4 class='text-lg font-semibold text-gray-800 mb-2'>Subclasses of {$class['name']} (" . count($class['subClasses']) . "):</h4>";
        $html .= "<div id='{$cardId}-subclasses' class='subclass-container pl-4 pt-2 hidden'>";

        // Sort subclasses by name
        $sortedSubClasses = $class['subClasses'];
        usort($sortedSubClasses, function($a, $b) use ($allClasses) {
            return strcmp($allClasses[$a]['name'], $allClasses[$b]['name']);
        });

        foreach ($sortedSubClasses as $subClassUri) {
            $html .= renderClassCard($subClassUri, $allClasses, $allProperties, $level + 1);
        }

        $html .= "</div></div>";
    }

    $html .= "</div></div>";
    return $html;
}

// Main execution
$owlFile = findDulFile();
if (!$owlFile) {
    die("Error: No DUL ontology file found. Please check the files in the directory.");
}

echo "<div style='background: lightblue; padding: 10px; margin: 10px;'>Starting to parse: {$owlFile}</div>";

// Parse the file
parseJsonLdFile($owlFile);

// Calculate statistics
$statistics['total_classes'] = count($classes);
$statistics['total_properties'] = count($properties);

// Calculate max depth
foreach ($classes as $uri => $classData) {
    if ($classData['isTopLevel']) {
        $depth = calculateClassDepth($uri, $classes);
        $statistics['max_depth'] = max($statistics['max_depth'], $depth);
    }
}

$statistics['processing_time'] = microtime(true) - $startTime;

// Get top-level classes
$topLevelClasses = array_filter($classes, function($class) {
    return $class['isTopLevel'];
});

// Sort by name
uasort($topLevelClasses, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

echo "<div style='background: lightgreen; padding: 10px; margin: 10px;'>";
echo "Ready to render " . count($topLevelClasses) . " top-level classes<br>";
echo "Total processing time: " . number_format($statistics['processing_time'], 3) . "s";
echo "</div>";
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DOLCE UltraLite Ontology Documentation - Enhanced</title>
<meta name="description" content="Interactive documentation for the DOLCE UltraLite (DUL) ontology with hierarchical class browser">
<meta name="keywords" content="ontology, DUL, DOLCE, semantic web, OWL, RDF">

<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

<style>
body {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    color: #333;
    min-height: 100vh;
}

.container {
    max-width: 1400px;
}

.class-card {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.95);
}

.class-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.toggle-subclasses-btn svg {
    transition: transform 0.2s ease-in-out;
}

.toggle-subclasses-btn[aria-expanded="true"] svg {
    transform: rotate(180deg);
}

.search-container {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.stats-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
}

.highlight {
    background-color: #fef08a;
    padding: 1px 3px;
    border-radius: 2px;
}

.fade-in {
    animation: fadeIn 0.5s ease-in;
}

.highlight-target {
    animation: highlightPulse 2s ease-in-out;
}

@keyframes highlightPulse {
    0%, 100% {
        background-color: transparent;
        transform: scale(1);
    }
    50% {
        background-color: rgba(59, 130, 246, 0.1);
        transform: scale(1.02);
    }
}

.class-index-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
}

.class-index-link {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 8px;
    height: 8px;
}
::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 0.5);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    background: rgba(136, 136, 136, 0.7);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
    background: rgba(85, 85, 85, 0.8);
}

/* Responsive improvements */
@media (max-width: 768px) {
    .class-card {
        margin-left: 0 !important;
        padding: 1rem;
    }

    .ml-4, .ml-8, .ml-12, .ml-16 {
        margin-left: 0.5rem !important;
    }
}

/* Print styles */
@media print {
    .search-container, .stats-card, .toggle-subclasses-btn {
        display: none !important;
    }

    .class-card {
        box-shadow: none !important;
        border: 1px solid #ccc !important;
        background: white !important;
        break-inside: avoid;
    }

    .subclass-container {
        display: block !important;
    }
}
</style>
</head>
<body class="p-4 lg:p-6">
<div class="container mx-auto">
<!-- Header -->
<header class="text-center mb-8">
<h1 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
DOLCE UltraLite Ontology
<span class="block text-xl lg:text-2xl font-normal text-gray-600 mt-2">Enhanced Interactive Documentation</span>
</h1>

<!-- Statistics -->
<div class="stats-card rounded-lg p-4 mb-6 inline-block">
<div class="flex flex-wrap justify-center gap-6 text-sm text-gray-700">
<div class="text-center">
<div class="font-bold text-lg text-blue-600"><?php echo $statistics['total_classes']; ?></div>
<div>Classes</div>
</div>
<div class="text-center">
<div class="font-bold text-lg text-green-600"><?php echo $statistics['total_properties']; ?></div>
<div>Properties</div>
</div>
<div class="text-center">
<div class="font-bold text-lg text-purple-600"><?php echo $statistics['max_depth']; ?></div>
<div>Max Depth</div>
</div>
<div class="text-center">
<div class="font-bold text-lg text-orange-600"><?php echo number_format($statistics['processing_time'], 3); ?>s</div>
<div>Parse Time</div>
</div>
</div>
</div>

<!-- Class Index -->
<div class="class-index-card bg-white rounded-lg shadow-md p-6 mb-6">
<div class="flex items-center justify-between mb-4">
<h2 class="text-xl font-semibold text-gray-800">Class Index</h2>
<button id="toggle-index-btn" class="text-blue-600 hover:text-blue-800 text-sm font-medium">
<span id="toggle-index-text">Hide Index</span>
<svg id="toggle-index-icon" class="w-4 h-4 inline ml-1 transform transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
</svg>
</button>
</div>
<div id="class-index-content" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 text-sm">
<?php
// Create sorted list of all classes
$allClassesSorted = $classes;
uasort($allClassesSorted, function($a, $b) {
    return strcmp($a['name'], $b['name']);
});

foreach ($allClassesSorted as $classUri => $classData) {
    $linkId = 'class-' . strtolower(str_replace([' ', '#', '/', ':'], '-', extractNameFromUri($classData['uri'])));
    $parentInfo = '';
    if (!empty($classData['superClasses']) && isset($classes[$classData['superClasses'][0]])) {
        $parentName = $classes[$classData['superClasses'][0]]['name'];
        $parentInfo = " title=\"Subclass of {$parentName}\"";
    }

    echo "<a href=\"#{$linkId}\" class=\"class-index-link block px-2 py-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors duration-150\"{$parentInfo}>";
    echo htmlspecialchars($classData['name']);
    echo "</a>";
}
?>
</div>
</div>
</header>

<!-- Search and Controls -->
<div class="search-container rounded-lg p-4 mb-6 sticky top-4 z-10">
<div class="flex flex-col lg:flex-row gap-4 items-center">
<div class="flex-1 w-full">
<div class="relative">
<input type="text"
id="search-input"
placeholder="Search classes by name or definition..."
class="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
<svg class="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
</svg>
</div>
</div>

<div class="flex gap-2 flex-wrap">
<button id="expand-all-btn" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
Expand All
</button>
<button id="collapse-all-btn" class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
Collapse All
</button>
<a href="?format=json" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
Export JSON
</a>
</div>
</div>

<!-- Search Results Info -->
<div id="search-results" class="mt-3 text-sm text-gray-600 hidden">
<span id="search-count">0</span> classes found
<button id="clear-search" class="ml-2 text-blue-600 hover:text-blue-800">Clear</button>
</div>
</div>

<!-- Main Content -->
<main id="ontology-docs" class="space-y-6">
<?php if (empty($topLevelClasses)): ?>
<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
<strong>Warning:</strong> No top-level classes found to display.
</div>
<?php else: ?>
<?php foreach ($topLevelClasses as $classUri => $classData): ?>
<?php echo renderClassCard($classUri, $classes, $properties, 0); ?>
<?php endforeach; ?>
<?php endif; ?>
</main>

<!-- Footer -->
<footer class="mt-12 pt-8 border-t border-gray-200 text-center text-gray-600">
<p class="mb-2">Generated from DUL v3.34 | Processing time: <?php echo number_format($statistics['processing_time'], 3); ?>s</p>
<p class="text-sm">
<a href="http://www.ontologydesignpatterns.org/ont/dul/DUL.owl" target="_blank" class="text-blue-600 hover:underline">Original Ontology</a> |
<a href="#" onclick="window.print()" class="text-blue-600 hover:underline">Print</a> |
<a href="?format=json" class="text-blue-600 hover:underline">Download JSON</a>
</p>
</footer>
</div>

<script>
// Enhanced JavaScript functionality
class OntologyBrowser {
    constructor() {
        this.searchInput = document.getElementById('search-input');
        this.searchResults = document.getElementById('search-results');
        this.searchCount = document.getElementById('search-count');
        this.clearSearch = document.getElementById('clear-search');
        this.expandAllBtn = document.getElementById('expand-all-btn');
        this.collapseAllBtn = document.getElementById('collapse-all-btn');
        this.toggleIndexBtn = document.getElementById('toggle-index-btn');
        this.toggleIndexText = document.getElementById('toggle-index-text');
        this.toggleIndexIcon = document.getElementById('toggle-index-icon');
        this.classIndexContent = document.getElementById('class-index-content');

        this.allCards = document.querySelectorAll('.class-card');
        this.toggleButtons = document.querySelectorAll('.toggle-subclasses-btn');
        this.classIndexLinks = document.querySelectorAll('.class-index-link');

        this.searchTimeout = null;
        this.originalContent = new Map();
        this.indexVisible = true;

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupToggleButtons();
        this.setupKeyboardNavigation();
        this.setupClassIndex();

        // Store original content for search highlighting
        this.allCards.forEach(card => {
            const content = card.innerHTML;
            this.originalContent.set(card.dataset.classUri || card.id, content);
        });

        console.log(`Ontology Browser initialized with ${this.allCards.length} classes`);
    }

    setupEventListeners() {
        // Search functionality
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Clear search
        this.clearSearch.addEventListener('click', () => {
            this.clearSearchResults();
        });

        // Expand/Collapse all
        this.expandAllBtn.addEventListener('click', () => {
            this.toggleAllSubclasses(true);
        });

        this.collapseAllBtn.addEventListener('click', () => {
            this.toggleAllSubclasses(false);
        });

        // Toggle class index
        this.toggleIndexBtn.addEventListener('click', () => {
            this.toggleClassIndex();
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'f':
                        e.preventDefault();
                        this.searchInput.focus();
                        break;
                    case 'e':
                        e.preventDefault();
                        this.toggleAllSubclasses(true);
                        break;
                    case 'q':
                        e.preventDefault();
                        this.toggleAllSubclasses(false);
                        break;
                    case 'i':
                        e.preventDefault();
                        this.toggleClassIndex();
                        break;
                }
            }

            if (e.key === 'Escape') {
                this.clearSearchResults();
            }
        });
    }

    setupClassIndex() {
        // Add click handlers for class index links and superclass links
        const allNavigationLinks = document.querySelectorAll('.class-index-link, .superclass-link, .breadcrumb-link');

        allNavigationLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    // First expand all to ensure the target is visible
                    this.toggleAllSubclasses(true);

                    // Wait for expansion animation, then scroll
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });

                        // Add temporary highlight
                        targetElement.classList.add('highlight-target');
                        setTimeout(() => {
                            targetElement.classList.remove('highlight-target');
                        }, 2000);
                    }, 100);
                }
            });
        });
    }

    toggleClassIndex() {
        this.indexVisible = !this.indexVisible;

        if (this.indexVisible) {
            this.classIndexContent.classList.remove('hidden');
            this.toggleIndexText.textContent = 'Hide Index';
            this.toggleIndexIcon.style.transform = 'rotate(0deg)';
        } else {
            this.classIndexContent.classList.add('hidden');
            this.toggleIndexText.textContent = 'Show Index';
            this.toggleIndexIcon.style.transform = 'rotate(-90deg)';
        }
    }

    setupToggleButtons() {
        this.toggleButtons.forEach(button => {
            const targetId = button.dataset.target;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                button.setAttribute('aria-expanded', 'false');
                targetElement.classList.add('hidden');

                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSubclasses(button, targetElement);
                });
            }
        });
    }

    setupKeyboardNavigation() {
        // Tab navigation for cards
        this.allCards.forEach((card, index) => {
            card.setAttribute('tabindex', '0');

            card.addEventListener('keydown', (e) => {
                switch(e.key) {
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        const toggleBtn = card.querySelector('.toggle-subclasses-btn');
                        if (toggleBtn) {
                            toggleBtn.click();
                        }
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        this.focusNextCard(index);
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        this.focusPreviousCard(index);
                        break;
                }
            });
        });
    }

    performSearch(searchTerm) {
        if (!searchTerm || searchTerm.length < 2) {
            this.clearSearchResults();
            return;
        }

        const term = searchTerm.toLowerCase();
        let matchCount = 0;

        this.allCards.forEach(card => {
            const className = card.dataset.className || '';
        const cardText = card.textContent.toLowerCase();

        if (className.includes(term) || cardText.includes(term)) {
            card.style.display = 'block';
        card.classList.add('fade-in');
        this.highlightSearchTerms(card, searchTerm);
        matchCount++;

        // Show parent cards if this is a match
        this.showParentCards(card);
        } else {
            card.style.display = 'none';
        card.classList.remove('fade-in');
        }
        });

        this.showSearchResults(matchCount);
    }

    highlightSearchTerms(card, searchTerm) {
        const originalContent = this.originalContent.get(card.dataset.classUri || card.id);
        if (!originalContent) return;

        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const highlightedContent = originalContent.replace(regex, '<span class="highlight">$1</span>');
        card.innerHTML = highlightedContent;

        // Reinitialize event listeners for this card
        this.reinitializeCardEvents(card);
    }

    reinitializeCardEvents(card) {
        const toggleBtn = card.querySelector('.toggle-subclasses-btn');
        if (toggleBtn) {
            const targetId = toggleBtn.dataset.target;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                toggleBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleSubclasses(toggleBtn, targetElement);
                });
            }
        }
    }

    showParentCards(card) {
        let parent = card.parentElement;
        while (parent && !parent.classList.contains('ontology-docs')) {
            if (parent.classList.contains('class-card')) {
                parent.style.display = 'block';
            }
            if (parent.classList.contains('subclass-container')) {
                parent.classList.remove('hidden');
                // Update corresponding toggle button
                const toggleBtn = parent.parentElement.querySelector('.toggle-subclasses-btn');
                if (toggleBtn) {
                    toggleBtn.setAttribute('aria-expanded', 'true');
                }
            }
            parent = parent.parentElement;
        }
    }

    showSearchResults(count) {
        this.searchCount.textContent = count;
        this.searchResults.classList.remove('hidden');
    }

    clearSearchResults() {
        this.searchInput.value = '';
        this.searchResults.classList.add('hidden');

        // Restore original content and visibility
        this.allCards.forEach(card => {
            card.style.display = 'block';
        card.classList.remove('fade-in');

        const originalContent = this.originalContent.get(card.dataset.classUri || card.id);
        if (originalContent) {
            card.innerHTML = originalContent;
            this.reinitializeCardEvents(card);
        }
        });

        // Reset all subclass containers to hidden
        document.querySelectorAll('.subclass-container').forEach(container => {
            container.classList.add('hidden');
        });

        // Reset toggle buttons
        this.toggleButtons.forEach(button => {
            button.setAttribute('aria-expanded', 'false');
        });
    }

    toggleSubclasses(button, targetElement) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', !isExpanded);
        targetElement.classList.toggle('hidden');

        // Add animation class
        if (!targetElement.classList.contains('hidden')) {
            targetElement.classList.add('fade-in');
            setTimeout(() => {
                targetElement.classList.remove('fade-in');
            }, 500);
        }
    }

    toggleAllSubclasses(expand) {
        const action = expand ? 'remove' : 'add';
        const ariaValue = expand ? 'true' : 'false';

        document.querySelectorAll('.subclass-container').forEach(container => {
            container.classList[action]('hidden');
        });

        this.toggleButtons.forEach(button => {
            button.setAttribute('aria-expanded', ariaValue);
        });

        // Update button states
        this.expandAllBtn.disabled = expand;
        this.collapseAllBtn.disabled = !expand;

        setTimeout(() => {
            this.expandAllBtn.disabled = false;
            this.collapseAllBtn.disabled = false;
        }, 1000);
    }

    focusNextCard(currentIndex) {
        const visibleCards = Array.from(this.allCards).filter(card =>
        card.style.display !== 'none'
        );
        const nextIndex = (currentIndex + 1) % visibleCards.length;
        if (visibleCards[nextIndex]) {
            visibleCards[nextIndex].focus();
        }
    }

    focusPreviousCard(currentIndex) {
        const visibleCards = Array.from(this.allCards).filter(card =>
        card.style.display !== 'none'
        );
        const prevIndex = currentIndex === 0 ? visibleCards.length - 1 : currentIndex - 1;
        if (visibleCards[prevIndex]) {
            visibleCards[prevIndex].focus();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new OntologyBrowser();

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
                target.focus();
            }
        });
    });

    console.log('Enhanced DUL Ontology Browser loaded successfully');
});
</script>
</body>
</html>
