#!/bin/bash

set -e

cd client/

yarn format

cd -

exit $?
