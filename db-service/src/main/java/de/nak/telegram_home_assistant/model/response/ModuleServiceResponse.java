package de.nak.telegram_home_assistant.model.response;

import de.nak.telegram_home_assistant.controller.response.ServiceRequest;

public class ModuleServiceResponse {

    private String name;
    private int id;
    private ServiceRequest serviceRequest;

    public ModuleServiceResponse(String name, int id, ServiceRequest serviceRequest) {
        this.name = name;
        this.id = id;
        this.serviceRequest = serviceRequest;
    }

    public ModuleServiceResponse(int id) {
        this.id = id;
    }

    public ModuleServiceResponse() {
    }

    public String getName() {
        return name;
    }

    public ModuleServiceResponse setName(String name) {
        this.name = name;
        return this;
    }

    public int getId() {
        return id;
    }

    public ModuleServiceResponse setId(int id) {
        this.id = id;
        return this;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public ModuleServiceResponse setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }
}
