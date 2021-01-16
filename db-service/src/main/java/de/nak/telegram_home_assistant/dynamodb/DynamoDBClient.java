package de.nak.telegram_home_assistant.dynamodb;

import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClient;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBMapper;

public class DynamoDBClient {

    private final Regions REGION = Regions.EU_CENTRAL_1;
    public DynamoDBMapper mapper;

    public DynamoDBClient() {
        AmazonDynamoDBClient client = new AmazonDynamoDBClient();
        client.setRegion(Region.getRegion(REGION));

        boolean isLocal = System.getenv("AWS_SAM_LOCAL").equals("true");
        if (isLocal) {
            client.setEndpoint("http://host.docker.internal:8000");
        }

        this.mapper = new DynamoDBMapper(client);
    }

}
