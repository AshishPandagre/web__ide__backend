#!/bin/bash

ftype=$1
name=$2

if [ -e $name ]; then
        echo -ne "A file/folder with same name exists\n125"
fi

if [ $ftype = "file" ]; then
        touch $name
elif [ $ftype = "folder" ]; then
        mkdir $name
fi

echo -ne $?