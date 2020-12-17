package de.nak.web_cloud.homebot.entity.module;

import de.nak.web_cloud.homebot.entity.usermodule.UserModule;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Datenbanktabellenklasse
 *
 * @author D17A
 */
@SuppressWarnings("JavaDoc")
@Entity
public class Module implements Serializable {

    public Module() {
    }

    /**
     * Konstruktor zur Erstellung eines Datensatzes
     *
     * @param name Datenfeld
     */

    public Module(String name) {
        setName(name);
    }

    //Datembankvariablen
    @GeneratedValue(strategy = GenerationType.AUTO)
    //PK
    @Id
    private Integer id;
    @NotNull
    private String name;

    private String basisAction;

    public String getServiceURL() {
        return serviceURL;
    }

    public void setServiceURL(String serviceURL) {
        this.serviceURL = serviceURL;
    }

    private String serviceURL;

    public String getFunctions() {
        return functions;
    }

    public void setFunctions(String functions) {
        this.functions = functions;
    }

    private String functions;

    @OneToMany(mappedBy = "module")
    private Set<UserModule> moduleSet = new HashSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(final Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public Set<UserModule> getModuleSet() {
        return moduleSet;
    }

    public void setModulSet(Set<UserModule> moduleSet) {
        this.moduleSet = moduleSet;
    }

    public String getBasisAction() {
        return basisAction;
    }

    public void setBasisAction(String basisAction) {
        this.basisAction = basisAction;
    }
}
