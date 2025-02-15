#!/bin/bash

CONTAINER_NAME=$1

(docker stop $CONTAINER_NAME && echo "Stopping old container: $CONTAINER_NAME")  2> /dev/null
(docker rm $CONTAINER_NAME && echo "Removing old container: $CONTAINER_NAME") 2> /dev/null