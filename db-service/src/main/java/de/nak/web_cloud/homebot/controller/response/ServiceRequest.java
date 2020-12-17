package de.nak.web_cloud.homebot.controller.response;

// Daten die benötigt werden um einen Service anzufragen
public class ServiceRequest {

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

    public ServiceRequest setServiceUrl(String serviceUrl) {
        this.serviceUrl = serviceUrl;
        return this;
    }

    public ServiceRequestBody getBody() {
        return body;
    }

    public ServiceRequest setBody(ServiceRequestBody body) {
        this.body = body;
        return this;
    }
}
