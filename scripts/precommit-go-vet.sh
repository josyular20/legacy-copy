#!/bin/bash

set -e

cd server/

go vet ./...

cd -

exit $?
