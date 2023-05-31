#!/bin/bash

location=$1

if [ ! -e $location ]; then
        echo -ne "File/Folder does not exist"
        exit
fi

rm -rf $location

echo $?