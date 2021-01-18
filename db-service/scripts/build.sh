#!/bin/bash

echo "Building project..."
sam build

echo "Starting api..."
sam local start-api -n .env.json
