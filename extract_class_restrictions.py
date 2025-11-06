#!/usr/bin/env python3
import re
import csv

def camel_to_snake(name):
    """Convert camelCase to snake_case"""
    # Insert underscore before uppercase letters
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    # Insert underscore before uppercase letters that are followed by lowercase
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

# Read the OWL file
with open('/home/ematos/devel/fn3/content/dul/DUL_3_34.owl', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all Class definitions with their restrictions
class_pattern = r'<owl:Class rdf:about="[^#]+#([^"]+)">(.*?)</owl:Class>'
classes = re.findall(class_pattern, content, re.DOTALL)

restrictions = []

for class_name, class_content in classes:
    # Skip owl:Thing
    if class_name == 'Thing':
        continue

    # Find all Restriction blocks within this class
    restriction_pattern = r'<owl:Restriction>(.*?)</owl:Restriction>'
    restriction_blocks = re.findall(restriction_pattern, class_content, re.DOTALL)

    for block in restriction_blocks:
        # Extract property
        prop_match = re.search(r'<owl:onProperty rdf:resource="[^#]+#([^"]+)"/>', block)
        if not prop_match:
            continue
        property_name = prop_match.group(1)

        # Extract related class from someValuesFrom or allValuesFrom
        class_match = re.search(r'<owl:(someValuesFrom|allValuesFrom) rdf:resource="[^#]+#([^"]+)"/>', block)
        if class_match:
            related_class = class_match.group(2)

            # Convert property to snake_case
            property_snake = camel_to_snake(property_name)

            restrictions.append({
                'class': class_name,
                'property': property_snake,
                'related_class': related_class
            })

# Sort by class name, then property name
restrictions.sort(key=lambda x: (x['class'], x['property']))

# Write to CSV
with open('/home/ematos/devel/fn3/dul_class_restrictions.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['class_name', 'property_name', 'related_class'])

    for r in restrictions:
        writer.writerow([r['class'], r['property'], r['related_class']])

print(f"Extracted {len(restrictions)} class restrictions to dul_class_restrictions.csv")
