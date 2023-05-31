#!/bin/bash

old_name=$1
new_name=$2

if [ -e $new_name ]; then
        echo -ne "A file/folder with same name exists\n125"
        exit
fi

mv $old_name $new_name

echo -ne $?