package de.nak.telegram_home_assistant.entity.usermodule;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserModulePK implements Serializable {
    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getModule() {
        return module;
    }

    public void setModule(int module) {
        this.module = module;
    }

    private int user;
    private int module;
}
