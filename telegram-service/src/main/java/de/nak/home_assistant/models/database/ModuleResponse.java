package de.nak.home_assistant.models.database;

import com.google.gson.Gson;
import de.nak.home_assistant.models.ISerializable;
import de.nak.home_assistant.models.service.ServiceRequest;

// Response from: /user/<userId>/modules/<moduleId>
public class ModuleResponse implements ISerializable {

    private String name;
    private int id;
    private ServiceRequest serviceRequest;

    public ModuleResponse(String name, int id, ServiceRequest serviceRequest) {
        this.name = name;
        this.id = id;
        this.serviceRequest = serviceRequest;
    }

    public ModuleResponse() {}

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public ModuleResponse setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }

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

    @Override
    public ModuleResponse fromJson(String json) {
        return new Gson().fromJson(json, ModuleResponse.class);
    }
}
