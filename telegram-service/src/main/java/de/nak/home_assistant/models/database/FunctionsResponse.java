package de.nak.home_assistant.models.database;

import com.google.gson.Gson;
import de.nak.home_assistant.models.ISerializable;
import de.nak.home_assistant.models.service.ServiceRequest;

import java.util.List;

// Response from: /user/<userId>/module/<moduleId>/light/<lightId>/functions
public class FunctionsResponse implements ISerializable {

    private List<String> functions;
    private ServiceRequest serviceRequest;

    public FunctionsResponse() {
    }

    public FunctionsResponse(List<String> functions, ServiceRequest serviceRequest) {
        this.functions = functions;
        this.serviceRequest = serviceRequest;
    }

    public List<String> getFunctions() {
        return functions;
    }

    public void setFunctions(List<String> functions) {
        this.functions = functions;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public void setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
    }

    @Override
    public FunctionsResponse fromJson(String json) {
        return new Gson().fromJson(json, FunctionsResponse.class);
    }
}
