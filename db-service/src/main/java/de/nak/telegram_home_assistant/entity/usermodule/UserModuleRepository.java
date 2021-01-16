package de.nak.telegram_home_assistant.entity.usermodule;

import de.nak.telegram_home_assistant.entity.module.Module;
import de.nak.telegram_home_assistant.entity.user.User;

import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface UserModuleRepository extends CrudRepository<UserModule, Integer> {
    List<UserModule> findAllByUser(User user);
    Integer deleteAllByUserAndModule(User user, Module module);
    Integer deleteAllByUser(User user);
    Optional<UserModule> findByUserAndModule(User user, Module module);
    List<UserModule> findAllByToken(String token);
}
