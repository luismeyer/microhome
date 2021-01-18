package de.nak.telegram_home_assistant.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import com.github.reinert.jjschema.Attributes;

import java.util.Set;

@DynamoDBTable(tableName="ModuleTable")
public class Module {

    public Module(int id, String name, String baseAction, String serviceUrl, Set<String> functions) {
        this.id = id;
        this.name = name;
        this.baseAction = baseAction;
        this.serviceUrl = serviceUrl;
        this.functions = functions;
    }

    public Module() {
    }

    @Attributes(required=true)
    private int id;

    @Attributes(required=true)
    private String name;

    @Attributes(required=true)
    private String baseAction;

    @Attributes(required=true)
    private String serviceUrl;

    @Attributes(required=true, uniqueItems=true)
    private Set<String> functions;

    private String token;

    @DynamoDBHashKey(attributeName="Id")
    public int getId() {
        return id;
    }
    public Module setId(int id) {
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
    public String getServiceUrl() {
        return serviceUrl;
    }
    public Module setServiceUrl(String serviceUrl) {
        this.serviceUrl = serviceUrl;
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

    @DynamoDBAttribute(attributeName="Token")
    public String getToken() {
        return token;
    }
    public Module setToken(String token) {
        this.token = token;
        return this;
    }

}
