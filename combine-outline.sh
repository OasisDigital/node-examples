#!/bin/bash

set -e

find . \
  -mindepth 2 \
  -maxdepth 2 \
  -name outline.md \
  | sort \
  | xargs cat \
  >full_outline.md

pandoc -t docx -o full_outline.docx full_outline.md

# Works only on certain dev machines
cp full_outline.md ~/projects/oasis-sites/content/topic/node-ts/outline.md
