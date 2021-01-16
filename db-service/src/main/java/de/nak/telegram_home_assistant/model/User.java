package de.nak.telegram_home_assistant.model;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBAttribute;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBHashKey;
import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBTable;
import de.nak.telegram_home_assistant.entity.usermodule.UserModule;

import java.util.Set;

@DynamoDBTable(tableName="ModuleTable")
public class User {

    public User(Integer id, Long telegramId, Set<UserModule> modules) {
        this.id = id;
        this.telegramId = telegramId;
        this.modules = modules;
    }

    private Integer id;
    private Long telegramId;
    private Set<UserModule> modules;

    @DynamoDBHashKey(attributeName="Id")
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }

    @DynamoDBAttribute(attributeName="TelegramId")
    public Long getTelegramId() {
        return telegramId;
    }
    public void setTelegramId(Long telegramId) {
        this.telegramId = telegramId;
    }

    @DynamoDBAttribute(attributeName="Modules")
    public Set<UserModule> getModules() {
        return modules;
    }
    public void setModules(Set<UserModule> modules) {
        this.modules = modules;
    }
}
