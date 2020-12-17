package de.nak.home_assistant.models.service;

import com.google.gson.Gson;
import de.nak.home_assistant.models.AServiceResponse;
import de.nak.home_assistant.models.service.devices.Device;

import java.util.List;

public class DeviceListResponse extends AServiceResponse {

    private List<Device> result;

    public DeviceListResponse() { }

    public DeviceListResponse(boolean success, String version, String error, List<Device> result) {
        super(success, version, error);
        this.result = result;
    }

    public List<Device> getResult() {
        return result;
    }

    public void setResult(List<Device> result) {
        this.result = result;
    }

    @Override
    public DeviceListResponse fromJson(String json) {
        return new Gson().fromJson(json, DeviceListResponse.class);
    }
}
