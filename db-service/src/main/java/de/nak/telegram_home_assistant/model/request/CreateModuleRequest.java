package de.nak.telegram_home_assistant.model.request;

import java.util.Set;

public class CreateModuleRequest {

    private String name;
    private String serviceUrl;
    private Set<String> functions;
    private String baseAction;

    public String getName() {
        return name;
    }

    public CreateModuleRequest setName(String name) {
        this.name = name;
        return this;
    }

    public String getServiceUrl() {
        return serviceUrl;
    }

    public CreateModuleRequest setServiceUrl(String serviceURL) {
        this.serviceUrl = serviceURL;
        return this;
    }

    public Set<String> getFunctions() {
        return functions;
    }

    public CreateModuleRequest setFunctions(Set<String> functions) {
        this.functions = functions;
        return this;
    }

    public String getBaseAction() {
        return baseAction;
    }

    public CreateModuleRequest setBaseAction(String baseAction) {
        this.baseAction = baseAction;
        return this;
    }
}
