package de.nak.web_cloud.homebot.entity.user;
import de.nak.web_cloud.homebot.entity.usermodule.UserModule;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;


@SuppressWarnings("JavaDoc")
@Entity
@Table(name = "users")
public class User {
    /**
     * Von Spring Boot benötigter Konstruktor
     */
    public User(){}

    /**
     * Konstruktor zur Erstellung eines Datensatzes
     * @param telegramUserid Userbezeichner
     */
    public User(Long telegramUserid) {
        setTelegramUserid(telegramUserid);
    }

    //Datembankvariablen
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private Integer id;

    private Long telegramUserid;

    @OneToMany(mappedBy = "user")
    private Set<UserModule> modulSet = new HashSet<>();


    public Integer getId () {
        return id;
    }

    public void setId (final Integer id) {
        this.id = id;
    }

    public Long getTelegramUser_id() {
        return telegramUserid;
    }

    public void setTelegramUserid(Long telegramUserid) {
        this.telegramUserid = telegramUserid;
    }

    public Set<UserModule> getModulSet() {
        return modulSet;
    }

    public void setModulSet(Set<UserModule> modulSet) {
        this.modulSet = modulSet;
    }
}
