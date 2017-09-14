#!/bin/bash

msg=$1

git pull && git add . && git commit -m "Kelly: update $msg" && git push
