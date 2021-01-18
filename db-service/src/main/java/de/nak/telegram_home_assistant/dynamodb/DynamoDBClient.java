package de.nak.telegram_home_assistant.dynamodb;

import com.amazonaws.client.builder.AwsClientBuilder;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public class DynamoDBClient {

    public DynamoDBMapper mapper;

    public DynamoDBClient() {

        AmazonDynamoDBClientBuilder builder = AmazonDynamoDBClientBuilder
                .standard();

        boolean isLocal = System.getenv("AWS_SAM_LOCAL").equals("true");

        if (isLocal) {
            AwsClientBuilder.EndpointConfiguration endpointConfiguration = new AwsClientBuilder.EndpointConfiguration("http://host.docker.internal:8000", "eu-central-1");
            builder.withEndpointConfiguration(endpointConfiguration);
        } else {
            builder.withRegion(Regions.EU_CENTRAL_1);
        }

        this.mapper = new DynamoDBMapper(builder.build());
    }

}
