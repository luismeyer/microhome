#!/bin/bash

echo "Building project..."
mvn package

echo "Starting api..."
sam local start-api -n .env.json
