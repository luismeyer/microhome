package de.nak.web_cloud.homebot.entity.usermodule;

import de.nak.web_cloud.homebot.entity.module.Module;
import de.nak.web_cloud.homebot.entity.user.User;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user_module")
@IdClass(UserModulePK.class)
public class UserModule implements Serializable {

    @Id
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Id
    @ManyToOne
    @JoinColumn(name = "module_id", referencedColumnName = "id")
    private Module module;

    @JoinColumn(name = "token")
    private String token;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Module getModul() {
        return module;
    }

    public void setModul(Module module) {
        this.module = module;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}