package de.nak.telegram_home_assistant.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.Set;

@DynamoDBTable(tableName="ModuleTable")
public class Module {

    public Module(String id, String name, String baseAction, String serviceURL, Set<String> functions) {
        this.id = id;
        this.name = name;
        this.baseAction = baseAction;
        this.serviceURL = serviceURL;
        this.functions = functions;
    }

    public Module() {
    }

    private String id;
    private String name;
    private String baseAction;
    private String serviceURL;
    private Set<String> functions;

    @DynamoDBHashKey(attributeName="Id")
    public String getId() {
        return id;
    }
    public Module setId(String id) {
        this.id = id;
        return this;
    }

    @DynamoDBAttribute(attributeName="Name")
    public String getName() {
        return name;
    }
    public Module setName(String name) {
        this.name = name;
        return this;
    }

    @DynamoDBAttribute(attributeName="BaseAction")
    public String getBaseAction() {
        return baseAction;
    }
    public Module setBaseAction(String baseAction) {
        this.baseAction = baseAction;
        return this;
    }

    @DynamoDBAttribute(attributeName="ServiceUrl")
    public String getServiceURL() {
        return serviceURL;
    }
    public Module setServiceURL(String serviceURL) {
        this.serviceURL = serviceURL;
        return this;
    }

    @DynamoDBAttribute(attributeName="Functions")
    public Set<String> getFunctions() {
        return functions;
    }
    public Module setFunctions(Set<String> functions) {
        this.functions = functions;
        return this;
    }
}
