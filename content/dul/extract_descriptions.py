#!/usr/bin/env python3
"""
Extract all class and property descriptions from DUL OWL ontology.
"""

import xml.etree.ElementTree as ET
from collections import defaultdict

# Define namespaces
NS = {
    'owl': 'http://www.w3.org/2002/07/owl#',
    'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
    'rdfs': 'http://www.w3.org/2000/01/rdf-schema#',
    'dul': 'http://www.ontologydesignpatterns.org/ont/dul/DUL.owl#'
}

def get_local_name(uri):
    """Extract local name from URI."""
    if '#' in uri:
        return uri.split('#')[-1]
    elif '/' in uri:
        return uri.split('/')[-1]
    return uri

def extract_descriptions(owl_file):
    """Extract all classes and properties with their descriptions."""
    tree = ET.parse(owl_file)
    root = tree.getroot()

    classes = []
    object_properties = []
    datatype_properties = []

    # Extract Classes
    for cls in root.findall('.//owl:Class', NS):
        about = cls.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}about')
        if about and 'DUL.owl#' in about:
            name = get_local_name(about)

            # Get rdfs:comment
            comment_elem = cls.find('rdfs:comment', NS)
            comment = comment_elem.text if comment_elem is not None and comment_elem.text else ''

            # Get rdfs:label (English)
            label = None
            for label_elem in cls.findall('rdfs:label', NS):
                if label_elem.get('{http://www.w3.org/XML/1998/namespace}lang') == 'en':
                    label = label_elem.text
                    break
            if not label:  # Fallback to any label
                label_elem = cls.find('rdfs:label', NS)
                label = label_elem.text if label_elem is not None else name

            # Get superclasses
            superclasses = []
            for subclass in cls.findall('rdfs:subClassOf', NS):
                resource = subclass.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource')
                if resource and 'DUL.owl#' in resource:
                    superclasses.append(get_local_name(resource))

            classes.append({
                'name': name,
                'label': label,
                'comment': comment,
                'superclasses': superclasses
            })

    # Extract Object Properties
    for prop in root.findall('.//owl:ObjectProperty', NS):
        about = prop.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}about')
        if about and 'DUL.owl#' in about:
            name = get_local_name(about)

            comment_elem = prop.find('rdfs:comment', NS)
            comment = comment_elem.text if comment_elem is not None and comment_elem.text else ''

            label = None
            for label_elem in prop.findall('rdfs:label', NS):
                if label_elem.get('{http://www.w3.org/XML/1998/namespace}lang') == 'en':
                    label = label_elem.text
                    break
            if not label:
                label_elem = prop.find('rdfs:label', NS)
                label = label_elem.text if label_elem is not None else name

            # Get domain and range
            domain_elem = prop.find('rdfs:domain', NS)
            domain = get_local_name(domain_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource')) if domain_elem is not None and domain_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource') else ''

            range_elem = prop.find('rdfs:range', NS)
            range_val = get_local_name(range_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource')) if range_elem is not None and range_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource') else ''

            # Get inverse
            inverse_elem = prop.find('owl:inverseOf', NS)
            inverse = get_local_name(inverse_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource')) if inverse_elem is not None and inverse_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource') else ''

            object_properties.append({
                'name': name,
                'label': label,
                'comment': comment,
                'domain': domain,
                'range': range_val,
                'inverse': inverse
            })

    # Extract Datatype Properties
    for prop in root.findall('.//owl:DatatypeProperty', NS):
        about = prop.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}about')
        if about and 'DUL.owl#' in about:
            name = get_local_name(about)

            comment_elem = prop.find('rdfs:comment', NS)
            comment = comment_elem.text if comment_elem is not None and comment_elem.text else ''

            label = None
            for label_elem in prop.findall('rdfs:label', NS):
                if label_elem.get('{http://www.w3.org/XML/1998/namespace}lang') == 'en':
                    label = label_elem.text
                    break
            if not label:
                label_elem = prop.find('rdfs:label', NS)
                label = label_elem.text if label_elem is not None else name

            domain_elem = prop.find('rdfs:domain', NS)
            domain = get_local_name(domain_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource')) if domain_elem is not None and domain_elem.get('{http://www.w3.org/1999/02/22-rdf-syntax-ns#}resource') else ''

            datatype_properties.append({
                'name': name,
                'label': label,
                'comment': comment,
                'domain': domain
            })

    return classes, object_properties, datatype_properties

def build_hierarchy(classes):
    """Build a hierarchy dictionary showing class relationships."""
    hierarchy = defaultdict(list)
    all_classes = {c['name']: c for c in classes}

    for cls in classes:
        if not cls['superclasses']:
            hierarchy['ROOT'].append(cls['name'])
        else:
            for parent in cls['superclasses']:
                hierarchy[parent].append(cls['name'])

    return hierarchy

def write_output(classes, object_properties, datatype_properties, output_file):
    """Write formatted output to file."""
    hierarchy = build_hierarchy(classes)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("DUL ONTOLOGY - EXTRACTED DESCRIPTIONS\n")
        f.write("DOLCE+DnS Ultralite v3.34\n")
        f.write("=" * 80 + "\n\n")

        # Table of Contents
        f.write("TABLE OF CONTENTS\n")
        f.write("-" * 80 + "\n")
        f.write("1. ONTOLOGY STATISTICS\n")
        f.write("2. CLASS HIERARCHY\n")
        f.write("3. CLASS DESCRIPTIONS (Alphabetical)\n")
        f.write("4. OBJECT PROPERTY DESCRIPTIONS (Alphabetical)\n")
        f.write("5. DATATYPE PROPERTY DESCRIPTIONS (Alphabetical)\n")
        f.write("\n\n")

        # Statistics
        f.write("=" * 80 + "\n")
        f.write("1. ONTOLOGY STATISTICS\n")
        f.write("=" * 80 + "\n\n")
        f.write(f"Total Classes: {len(classes)}\n")
        f.write(f"Total Object Properties: {len(object_properties)}\n")
        f.write(f"Total Datatype Properties: {len(datatype_properties)}\n\n")

        # Hierarchy
        f.write("=" * 80 + "\n")
        f.write("2. CLASS HIERARCHY\n")
        f.write("=" * 80 + "\n\n")

        def print_hierarchy(node, indent=0, visited=None):
            if visited is None:
                visited = set()
            if node in visited:
                return
            visited.add(node)

            result = "  " * indent + "- " + node + "\n"
            for child in sorted(hierarchy.get(node, [])):
                result += print_hierarchy(child, indent + 1, visited)
            return result

        for root in sorted(hierarchy.get('ROOT', [])):
            f.write(print_hierarchy(root))

        f.write("\n\n")

        # Class Descriptions
        f.write("=" * 80 + "\n")
        f.write("3. CLASS DESCRIPTIONS (Alphabetical)\n")
        f.write("=" * 80 + "\n\n")

        for cls in sorted(classes, key=lambda x: x['name']):
            f.write(f"CLASS: {cls['name']}\n")
            f.write(f"Label: {cls['label']}\n")
            if cls['superclasses']:
                f.write(f"Superclasses: {', '.join(cls['superclasses'])}\n")
            f.write(f"\nDescription:\n{cls['comment']}\n")
            f.write("-" * 80 + "\n\n")

        # Object Properties
        f.write("\n" + "=" * 80 + "\n")
        f.write("4. OBJECT PROPERTY DESCRIPTIONS (Alphabetical)\n")
        f.write("=" * 80 + "\n\n")

        for prop in sorted(object_properties, key=lambda x: x['name']):
            f.write(f"PROPERTY: {prop['name']}\n")
            f.write(f"Label: {prop['label']}\n")
            if prop['domain']:
                f.write(f"Domain: {prop['domain']}\n")
            if prop['range']:
                f.write(f"Range: {prop['range']}\n")
            if prop['inverse']:
                f.write(f"Inverse: {prop['inverse']}\n")
            f.write(f"\nDescription:\n{prop['comment']}\n")
            f.write("-" * 80 + "\n\n")

        # Datatype Properties
        f.write("\n" + "=" * 80 + "\n")
        f.write("5. DATATYPE PROPERTY DESCRIPTIONS (Alphabetical)\n")
        f.write("=" * 80 + "\n\n")

        for prop in sorted(datatype_properties, key=lambda x: x['name']):
            f.write(f"PROPERTY: {prop['name']}\n")
            f.write(f"Label: {prop['label']}\n")
            if prop['domain']:
                f.write(f"Domain: {prop['domain']}\n")
            f.write(f"\nDescription:\n{prop['comment']}\n")
            f.write("-" * 80 + "\n\n")

if __name__ == '__main__':
    owl_file = '/home/ematos/devel/fn3/content/dul/DUL_3_34.owl'
    output_file = '/home/ematos/devel/fn3/content/dul/extracted_descriptions.txt'

    print("Extracting descriptions from DUL ontology...")
    classes, object_properties, datatype_properties = extract_descriptions(owl_file)

    print(f"Found {len(classes)} classes")
    print(f"Found {len(object_properties)} object properties")
    print(f"Found {len(datatype_properties)} datatype properties")

    print(f"\nWriting to {output_file}...")
    write_output(classes, object_properties, datatype_properties, output_file)

    print("Done!")
