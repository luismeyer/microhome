package de.nak.home_assistant.models.service;

import com.google.gson.Gson;
import de.nak.home_assistant.models.AServiceResponse;
import de.nak.home_assistant.models.service.devices.Device;

public class DeviceResponse extends AServiceResponse {

    private Device result;

    public DeviceResponse() {
    }

    public DeviceResponse(boolean success, String version, String error, Device result) {
        super(success, version, error);
        this.result = result;
    }

    public Device getResult() {
        return result;
    }

    public void setResult(Device result) {
        this.result = result;
    }

    @Override
    public DeviceResponse fromJson(String json) {
        return new Gson().fromJson(json, DeviceResponse.class);
    }
}
