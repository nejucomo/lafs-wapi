#!/bin/bash

set -e

[ -d './build' ] || mkdir -v ./build

for f in *.rst
do
    outpath="./build/$(echo "$f" | sed 's/\.rst$/.html/')"

    echo "=== Generating $outpath ==="
    rst2html5 --strict "$f" > "$outpath"
done
