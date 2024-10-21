#!/bin/bash
set -e
if [ $# -ne 1 ]; then
    cat <<EOF
Provide version as the first argument as in 'npm version', for example 'minor'.
See http://semver.org/

EOF
    exit 2
fi

VERSION=$1

#TODO: test can be removed once passing tests are required by merges
npm run test
npm run build

npm version ${VERSION} -m "Release %s"

cat <<EOF
Updated package.json and created the version tag.

Check your version history, if all is fine, push with :

    git push --follow-tags
    npm publish

EOF
