package de.nak.home_assistant.models.service;

import com.google.gson.Gson;
import de.nak.home_assistant.models.ISerializable;

// Daten die benötigt werden um einen Service anzufragen
public class ServiceRequest implements ISerializable {

    private String serviceUrl;
    private ServiceRequestBody body;

    public ServiceRequest(String serviceUrl, ServiceRequestBody body) {
        this.serviceUrl = serviceUrl;
        this.body = body;
    }

    public ServiceRequest() {}

    public String getServiceUrl() {
        return serviceUrl;
    }

    public void setServiceUrl(String serviceUrl) {
        this.serviceUrl = serviceUrl;
    }

    public ServiceRequestBody getBody() {
        return body;
    }

    public void setBody(ServiceRequestBody body) {
        this.body = body;
    }

    @Override
    public ServiceRequest fromJson(String json) {
        return new Gson().fromJson(json, ServiceRequest.class);
    }
}
