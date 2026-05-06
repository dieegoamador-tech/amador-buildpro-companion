#!/bin/bash
git remote set-url origin https://github.com/dieegoamador-tech/tennissss.git || git remote add origin https://github.com/dieegoamador-tech/tennissss.git
git add .
git commit -m "Initial commit"
git branch -M main
git push -u origin main
