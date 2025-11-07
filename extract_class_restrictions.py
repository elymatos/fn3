#!/usr/bin/env python3
import re
import csv
from collections import defaultdict

def camel_to_snake(name):
    """Convert camelCase to snake_case"""
    # Insert underscore before uppercase letters
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    # Insert underscore before uppercase letters that are followed by lowercase
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

# Read the OWL file
with open('/home/ematos/devel/fn3/content/dul/DUL_3_34.owl', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all Class definitions
class_pattern = r'<owl:Class rdf:about="[^#]+#([^"]+)">(.*?)</owl:Class>'
classes = re.findall(class_pattern, content, re.DOTALL)

# Store class hierarchy and restrictions
class_parents = defaultdict(list)  # class -> list of parent classes
class_restrictions = defaultdict(list)  # class -> list of restrictions

for class_name, class_content in classes:
    # Skip owl:Thing
    if class_name == 'Thing':
        continue

    # Find direct parent classes (rdfs:subClassOf with rdf:resource)
    parent_pattern = r'<rdfs:subClassOf rdf:resource="[^#]+#([^"]+)"/>'
    parents = re.findall(parent_pattern, class_content)
    for parent in parents:
        if parent != 'Thing':  # Skip owl:Thing
            class_parents[class_name].append(parent)

    # Find all Restriction blocks within this class
    restriction_pattern = r'<owl:Restriction>(.*?)</owl:Restriction>'
    restriction_blocks = re.findall(restriction_pattern, class_content, re.DOTALL)

    for block in restriction_blocks:
        # Extract property
        prop_match = re.search(r'<owl:onProperty rdf:resource="[^#]+#([^"]+)"/>', block)
        if not prop_match:
            continue
        property_name = prop_match.group(1)
        property_snake = camel_to_snake(property_name)

        # Check for someValuesFrom
        some_match = re.search(r'<owl:someValuesFrom rdf:resource="[^#]+#([^"]+)"/>', block)
        if some_match:
            related_class = some_match.group(1)
            class_restrictions[class_name].append({
                'property': property_snake,
                'quantifier': 'some',
                'cardinality': '',
                'related_class': related_class
            })
            continue

        # Check for allValuesFrom
        all_match = re.search(r'<owl:allValuesFrom rdf:resource="[^#]+#([^"]+)"/>', block)
        if all_match:
            related_class = all_match.group(1)
            class_restrictions[class_name].append({
                'property': property_snake,
                'quantifier': 'only',
                'cardinality': '',
                'related_class': related_class
            })
            continue

        # Check for minCardinality
        min_match = re.search(r'<owl:minCardinality[^>]*>(\d+)</owl:minCardinality>', block)
        if min_match:
            cardinality = min_match.group(1)
            class_restrictions[class_name].append({
                'property': property_snake,
                'quantifier': 'min',
                'cardinality': cardinality,
                'related_class': ''
            })
            continue

# Function to collect all restrictions for a class (including inherited)
def get_all_restrictions(class_name, visited=None):
    if visited is None:
        visited = set()

    if class_name in visited:
        return []

    visited.add(class_name)

    # Start with direct restrictions
    restrictions = list(class_restrictions.get(class_name, []))

    # Add restrictions from parent classes
    for parent in class_parents.get(class_name, []):
        restrictions.extend(get_all_restrictions(parent, visited))

    return restrictions

# Collect all restrictions for each class
all_class_restrictions = []

for class_name in sorted(class_restrictions.keys()):
    all_restrictions = get_all_restrictions(class_name)

    # Remove duplicates while preserving order
    seen = set()
    unique_restrictions = []
    for r in all_restrictions:
        key = (r['property'], r['quantifier'], r['cardinality'], r['related_class'])
        if key not in seen:
            seen.add(key)
            unique_restrictions.append(r)

    for r in unique_restrictions:
        all_class_restrictions.append({
            'class': class_name,
            'property': r['property'],
            'quantifier': r['quantifier'],
            'cardinality': r['cardinality'],
            'related_class': r['related_class']
        })

# Also include classes that only have inherited restrictions
all_classes = set()
for class_name in class_parents.keys():
    all_classes.add(class_name)
for class_name in class_restrictions.keys():
    all_classes.add(class_name)

for class_name in sorted(all_classes):
    if class_name not in class_restrictions or len(class_restrictions[class_name]) == 0:
        # This class has no direct restrictions, but might have inherited ones
        all_restrictions = get_all_restrictions(class_name)

        if all_restrictions:
            # Remove duplicates
            seen = set()
            unique_restrictions = []
            for r in all_restrictions:
                key = (r['property'], r['quantifier'], r['cardinality'], r['related_class'])
                if key not in seen:
                    seen.add(key)
                    unique_restrictions.append(r)

            for r in unique_restrictions:
                all_class_restrictions.append({
                    'class': class_name,
                    'property': r['property'],
                    'quantifier': r['quantifier'],
                    'cardinality': r['cardinality'],
                    'related_class': r['related_class']
                })

# Sort by class name, then property name
all_class_restrictions.sort(key=lambda x: (x['class'], x['property'], x['quantifier']))

# Write to CSV
with open('/home/ematos/devel/fn3/dul_class_restrictions.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['class_name', 'property_name', 'quantifier', 'cardinality', 'related_class'])

    for r in all_class_restrictions:
        writer.writerow([r['class'], r['property'], r['quantifier'], r['cardinality'], r['related_class']])

print(f"Extracted {len(all_class_restrictions)} class restrictions (including inherited) to dul_class_restrictions.csv")
