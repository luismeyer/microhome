package de.nak.home_assistant.services;

import de.nak.home_assistant.Http;
import de.nak.home_assistant.models.ISerializable;
import de.nak.home_assistant.models.service.ServiceRequest;
import de.nak.home_assistant.models.service.ServiceRequestBody;
import org.apache.http.HttpResponse;

public class ServiceService {

    private final ISerializable tClass;

    public <T extends ISerializable> ServiceService(T tClass) {
        this.tClass = tClass;
    }

    // Sends a post Request to the Service
    public <T extends ISerializable> T makeRequest(ServiceRequest serviceRequest) {
        String serviceUrl = serviceRequest.getServiceUrl();
        ServiceRequestBody body = serviceRequest.getBody();

        HttpResponse response = Http.sendPost(serviceUrl, body.toJson());
        String responseBody = Http.getResponseBody(response);
        return tClass.fromJson(responseBody);
    }

}
