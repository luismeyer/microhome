package de.nak.home_assistant.services.database;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.nak.home_assistant.Env;
import de.nak.home_assistant.Http;
import de.nak.home_assistant.models.database.ModuleResponse;
import de.nak.home_assistant.models.service.ServiceRequest;
import org.apache.http.HttpResponse;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class UserService {

    private final long userId;

    public UserService(long userId) {
        this.userId = userId;
    }

    public boolean createUser() {
        String url = Env.getDBUrl() + "user/" + userId;
        return Http.hasPositiveHTTPStatusCode(Http.sendPost(url, "{}"));
    }

    public List<ModuleResponse> getModules() {
        String url = Env.getDBUrl() + "user/" + userId + "/module";
        HttpResponse httpResponse = Http.sendGet(url);

        if (Http.hasPositiveHTTPStatusCode(httpResponse)) {
            String json = Http.getResponseBody(httpResponse);
            Type moduleListType = new TypeToken<ArrayList<ModuleResponse>>() {}.getType();
            return new Gson().fromJson(json, moduleListType);
        }

        return null;
    }

    public ModuleResponse getUserModule(int moduleId) {
        String url = Env.getDBUrl() + "user/" + userId + "/module/" + moduleId;
        HttpResponse httpResponse = Http.sendGet(url);

        if (Http.hasPositiveHTTPStatusCode(httpResponse)) {
            return new ModuleResponse().fromJson(Http.getResponseBody(httpResponse));
        }

        return null;
    }

    public boolean hasModule(int moduleId) {
        return getUserModule(moduleId) != null;
    }

    public boolean deactivateModule(int moduleId) {
        String url = Env.getDBUrl() + "user/" + userId + "/module/" + moduleId;
        return Http.hasPositiveHTTPStatusCode(Http.sendDelete(url));
    }

    public ServiceRequest activateModule(int moduleId) {
        String url = Env.getDBUrl() + "user/" + userId + "/module/" + moduleId;
        HttpResponse httpResponse = Http.sendPut(url, "{}");

        if (Http.hasPositiveHTTPStatusCode(httpResponse)) {
            String json = Http.getResponseBody(httpResponse);
            return new ServiceRequest().fromJson(json);
        }

        return null;
    }

    public boolean setToken(int moduleId, String token) {
        String url = Env.getDBUrl() + "user/" + userId + "/module/" + moduleId + "/token?token=" + token;
        HttpResponse httpResponse = Http.sendPost(url, "{}");
        return Http.hasPositiveHTTPStatusCode(httpResponse);
    }

}
