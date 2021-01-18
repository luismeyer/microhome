package de.nak.telegram_home_assistant;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import com.fasterxml.jackson.databind.JsonNode;
import com.github.fge.jackson.JsonLoader;
import com.github.fge.jsonschema.core.exceptions.ProcessingException;
import com.github.fge.jsonschema.core.report.ProcessingMessage;
import com.github.fge.jsonschema.core.report.ProcessingReport;
import com.github.fge.jsonschema.main.JsonSchema;
import com.github.fge.jsonschema.main.JsonSchemaFactory;
import com.github.reinert.jjschema.v1.JsonSchemaV4Factory;
import com.google.gson.Gson;
import de.nak.telegram_home_assistant.model.response.ErrorResponseBody;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Json {

    public static APIGatewayProxyResponseEvent validateRequest(Class<?> type, APIGatewayProxyRequestEvent request) {
        try {
            JsonSchema schema = Json.createSchema(type);
            ProcessingReport report = schema.validate(JsonLoader.fromString(request.getBody()));

            if (!report.isSuccess()) {
                return Json.invalidDataResponse(report);
            }
        } catch (Exception exception) {
            return Json.invalidDataResponse(exception.toString());
        }

        return null;
    }

    public static JsonSchema createSchema(Class<?> type) throws ProcessingException {
        JsonNode schema = new JsonSchemaV4Factory().createSchema(type);
        return JsonSchemaFactory.byDefault().getJsonSchema(schema);
    }

    public static APIGatewayProxyResponseEvent invalidDataResponse(List<String> messages) {
        APIGatewayProxyResponseEvent response = new APIGatewayProxyResponseEvent();
        response.setStatusCode(422);

        ErrorResponseBody body = new ErrorResponseBody().setMessages(messages);
        response.setBody(new Gson().toJson(body));

        return response;
    }

    public static APIGatewayProxyResponseEvent invalidDataResponse(ProcessingReport report) {
        return invalidDataResponse(getErrorMessage(report));
    }

    public static APIGatewayProxyResponseEvent invalidDataResponse(String error) {
        return invalidDataResponse(Collections.singletonList(error));
    }

    public static List<String> getErrorMessage(ProcessingReport report) {
        List<String> errors = new ArrayList<>();

        for (ProcessingMessage processingMessage : report) {
            errors.add(processingMessage.asJson().get("message").asText());
        }

        return errors;
    }
}
