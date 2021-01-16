package de.nak.telegram_home_assistant.controller.response;

import java.util.List;

// Response from: /user/<userId>/module/<moduleId>/light/<lightId>/functions
public class FunctionsResponse  {

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

    public FunctionsResponse setFunctions(List<String> functions) {
        this.functions = functions;
        return this;
    }

    public ServiceRequest getServiceRequest() {
        return serviceRequest;
    }

    public FunctionsResponse setServiceRequest(ServiceRequest serviceRequest) {
        this.serviceRequest = serviceRequest;
        return this;
    }
}
