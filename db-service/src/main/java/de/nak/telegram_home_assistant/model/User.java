package de.nak.telegram_home_assistant.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;

import java.util.List;

@DynamoDBTable(tableName="UserTable")
public class User {

    public User(String id, Long telegramId, List<Module> modules) {
        this.id = id;
        this.telegramId = telegramId;
        this.modules = modules;
    }

    public User() {
    }

    private String id;
    private Long telegramId;
    private List<Module> modules;

    @DynamoDBHashKey(attributeName="Id")
    public String getId() {
        return id;
    }
    public User setId(String id) {
        this.id = id;
        return this;
    }

    @DynamoDBAttribute(attributeName="TelegramId")
    public Long getTelegramId() {
        return telegramId;
    }
    public User setTelegramId(Long telegramId) {
        this.telegramId = telegramId;
        return this;
    }

    @DynamoDBAttribute(attributeName="Modules")
    public List<Module> getModules() {
        return modules;
    }
    public User setModules(List<Module> modules) {
        this.modules = modules;
        return this;
    }
}
