#!/bin/bash

output=$(ls -1p $1)
status=$?

output="$output\n$status"

echo -en "$output"