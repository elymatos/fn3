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

# Find all ObjectProperty definitions
property_pattern = r'<owl:ObjectProperty rdf:about="[^#]+#([^"]+)">(.*?)</owl:ObjectProperty>'
properties = re.findall(property_pattern, content, re.DOTALL)

# Store property info
prop_data = {}

for prop_name, prop_content in properties:
    # Find inverse property
    inverse_match = re.search(r'<owl:inverseOf rdf:resource="[^#]+#([^"]+)"/>', prop_content)
    inverse = inverse_match.group(1) if inverse_match else None

    # Find parent property (subPropertyOf)
    parent_match = re.search(r'<rdfs:subPropertyOf rdf:resource="[^#]+#([^"]+)"/>', prop_content)
    parent = parent_match.group(1) if parent_match else None

    prop_data[prop_name] = {
        'inverse': inverse,
        'parent': parent
    }

# Determine which properties to include
included_props = {}

processed = set()

for prop_name, info in prop_data.items():
    if prop_name in processed:
        continue

    inverse = info['inverse']
    parent = info['parent']

    # If property has an inverse
    if inverse and inverse in prop_data:
        # Check if one starts with "is"
        prop_starts_is = prop_name.startswith('is')
        inverse_starts_is = inverse.startswith('is')

        if prop_starts_is and not inverse_starts_is:
            # Include the "is" property
            included_props[prop_name] = {
                'inverse': inverse,
                'parent': parent
            }
            processed.add(prop_name)
            processed.add(inverse)
        elif inverse_starts_is and not prop_starts_is:
            # Include the inverse (which starts with "is")
            inverse_parent = prop_data[inverse]['parent']
            included_props[inverse] = {
                'inverse': prop_name,
                'parent': inverse_parent
            }
            processed.add(prop_name)
            processed.add(inverse)
        elif not prop_starts_is and not inverse_starts_is:
            # Neither starts with "is", include only one (alphabetically first)
            if prop_name < inverse:
                included_props[prop_name] = {
                    'inverse': inverse,
                    'parent': parent
                }
            else:
                inverse_parent = prop_data[inverse]['parent']
                included_props[inverse] = {
                    'inverse': prop_name,
                    'parent': inverse_parent
                }
            processed.add(prop_name)
            processed.add(inverse)
        else:
            # Both start with "is", include the first one alphabetically
            if prop_name < inverse:
                included_props[prop_name] = {
                    'inverse': inverse,
                    'parent': parent
                }
                processed.add(prop_name)
                processed.add(inverse)
            # else skip, will be handled when we process the inverse
    else:
        # No inverse, include the property
        included_props[prop_name] = {
            'inverse': None,
            'parent': parent
        }
        processed.add(prop_name)

# Convert to lowercase and remove spaces, then write to CSV
with open('/home/ematos/devel/fn3/dul_properties.csv', 'w', newline='', encoding='utf-8') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['name', 'nameInverse', 'parent_property'])

    for prop_name in sorted(included_props.keys()):
        info = included_props[prop_name]

        # Convert camelCase to snake_case
        name = camel_to_snake(prop_name)
        inverse = camel_to_snake(info['inverse']) if info['inverse'] else ''
        parent = camel_to_snake(info['parent']) if info['parent'] else ''

        writer.writerow([name, inverse, parent])

print(f"Extracted {len(included_props)} properties to dul_properties.csv")