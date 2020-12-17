package de.nak.home_assistant.models;

public abstract class AServiceResponse implements ISerializable {

    private boolean success;
    private String version;
    private String error;

    public AServiceResponse(boolean success, String version, String error) {
        this.success = success;
        this.version = version;
        this.error = error;
    }

    public AServiceResponse() { }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
}
