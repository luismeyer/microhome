package de.nak.home_assistant.services.database;

import de.nak.home_assistant.Env;
import de.nak.home_assistant.Http;
import de.nak.home_assistant.models.database.FunctionsResponse;
import de.nak.home_assistant.models.service.ServiceRequest;
import org.apache.http.HttpResponse;

public class DeviceService {

    public FunctionsResponse getFunctions(long userId, int moduleId, String deviceId) {
        String url = Env.getDBUrl() + "user/" + userId + "/module/" + moduleId + "/devices/" + deviceId + "/functions";
        HttpResponse httpResponse = Http.sendGet(url);

        if (Http.hasPositiveHTTPStatusCode(httpResponse)) {
            String json = Http.getResponseBody(httpResponse);
            return new FunctionsResponse().fromJson(json);
        }

        return null;
    }

    public ServiceRequest getFunction(long userId, int moduleId, String deviceId, String function) {
        String url = Env.getDBUrl() + "user/" + userId + "/module/" + moduleId + "/devices/" + deviceId + "/functions/" + function;
        HttpResponse httpResponse = Http.sendGet(url);

        if (Http.hasPositiveHTTPStatusCode(httpResponse)) {
            String json = Http.getResponseBody(httpResponse);
            return new ServiceRequest().fromJson(json);
        }

        return null;
    }
}
