package de.nak.home_assistant.services.database;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import de.nak.home_assistant.Env;
import de.nak.home_assistant.Http;
import de.nak.home_assistant.models.database.ModuleResponse;
import org.apache.http.HttpResponse;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class ModuleService {

    public List<ModuleResponse> getModules() {
        String url = Env.getDBUrl() + "module";
        HttpResponse httpResponse = Http.sendGet(url);

        if(Http.hasPositiveHTTPStatusCode(httpResponse)){
            String json = Http.getResponseBody(httpResponse);
            Type moduleListType = new TypeToken<ArrayList<ModuleResponse>>(){}.getType();
            return new Gson().fromJson(json, moduleListType);
        }

        return null;
    }

    public Optional<ModuleResponse> findModuleByName(String name) {
        List<ModuleResponse> moduleResponseList = getModules();

         return moduleResponseList
                .stream()
                .filter(moduleResponse -> moduleResponse
                        .getName()
                        .toLowerCase()
                        .equals(name.toLowerCase()))
                .findFirst();
    }
}
