#!/bin/bash

echo "Starting container..."
id=$(docker run -d -p 8000:8000 -v $(pwd)/local/dynamodb:/data/ amazon/dynamodb-local -jar DynamoDBLocal.jar -sharedDb -dbPath /data)

export AWS_PAGER=""

echo "Creating tables..."
aws dynamodb create-table \
  --table-name ModuleTable \
  --attribute-definitions AttributeName=Id,AttributeType=S \
  --key-schema AttributeName=Id,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \
  --endpoint-url http://localhost:8000

echo "Attaching to container.."
docker attach $id
