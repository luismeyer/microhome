package de.nak.telegram_home_assistant.controller.response;

// Response from: /user/<userId>/modules/<moduleId>
public class ModuleResponse  {

    private String name;
    private int id;
    private ServiceRequest serviceRequest;

    public ModuleResponse(String name, int id, ServiceRequest serviceRequest) {
        this.name = name;
        this.id = id;
        this.serviceRequest = serviceRequest;
    }

    public ModuleResponse() {}

    public String getName() {
        return name;
    }

    public ModuleResponse setName(String name) {
        this.name = name;
        return this;
    }

    public int getId() {
        return id;
    }

    public ModuleResponse setId(int id) {
        this.id = id;
        return this;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public ModuleResponse setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }
}
