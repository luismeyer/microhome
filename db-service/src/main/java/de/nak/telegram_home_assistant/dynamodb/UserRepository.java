package de.nak.telegram_home_assistant.dynamodb;

import com.amazonaws.services.dynamodbv2.datamodeling.DynamoDBScanExpression;
import de.nak.telegram_home_assistant.model.Module;
import de.nak.telegram_home_assistant.model.User;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class UserRepository {

    private DynamoDBClient client;

    public UserRepository(DynamoDBClient client) {
        this.client = client;
    }

    public Optional<User> findUserByTelegramId(Long telegramId) {
        return client.mapper.scan(User.class, new DynamoDBScanExpression())
            .stream()
            .filter(u -> u.getTelegramId().equals(telegramId))
            .findFirst();
    }

    public Optional<Module> findUserModule(User user, int moduleId) {
        return user.getModules()
                .stream()
                .filter(m -> m.getId() == moduleId)
                .findFirst();
    }
}
