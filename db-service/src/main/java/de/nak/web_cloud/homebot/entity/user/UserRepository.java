package de.nak.web_cloud.homebot.entity.user;

import org.springframework.data.repository.CrudRepository;
import java.util.Optional;

public interface UserRepository extends CrudRepository<User, Integer> {

    Optional<User> findByTelegramUserid(Long telegramUserid);
    boolean deleteByTelegramUserid(Long telegramUserid);
}
