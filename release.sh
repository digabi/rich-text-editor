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

npm version ${VERSION} -m "Release %s"
NEW_VERSION=$(node <<EOF
var packageJson = require(process.cwd() + '/package.json')
console.log(packageJson.version)
EOF
           )
node <<EOF
var fs = require('fs')
var bowerJsonFileName = process.cwd() + '/bower.json'
var bowerJson = require(bowerJsonFileName)
bowerJson.version = "${NEW_VERSION}"
fs.writeFileSync(bowerJsonFileName, JSON.stringify(bowerJson, null, 2))
EOF
echo Building distributable files...
npm run bowerify
echo Done.
git add dist
git add bower.json
git commit --amend --no-edit
git tag -a -m "Release ${NEW_VERSION}" -f v${NEW_VERSION}
cat <<EOF

Updated package.json and bower.json with version ${NEW_VERSION} and created the version tag.

Check your version history, if all is fine, push with :

    git push --follow-tags
    npm publish

EOF


