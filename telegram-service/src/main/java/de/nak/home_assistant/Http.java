package de.nak.home_assistant;

import org.apache.http.Header;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.*;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicHeader;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.List;

public class Http {

    private static final List<Header> HEADERS = Arrays.asList(
            new BasicHeader("Content-type", "application/json"),
            new BasicHeader("Authorization", "Basic " + Env.getDBToken()));

    //HTTP POST request
    public static HttpResponse sendPost(String url, String json) {

        HttpClient httpClient = HttpClientBuilder.create().build();

        try {
            HttpPost request = new HttpPost(url);
            StringEntity params = new StringEntity(json);

            request.setEntity(params);
            HEADERS.forEach(request::addHeader);

            return httpClient.execute(request);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static HttpResponse sendPut(String url, String json) {

        HttpClient httpClient = HttpClientBuilder.create().build();

        try {
            HttpPut request = new HttpPut(url);
            StringEntity params = new StringEntity(json);

            HEADERS.forEach(request::addHeader);
            request.setEntity(params);

            return httpClient.execute(request);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static HttpResponse sendGet(String url) {

        HttpClient httpClient = HttpClientBuilder.create().build();

        try {
            HttpGet request = new HttpGet(url);

            HEADERS.forEach(request::addHeader);

            return httpClient.execute(request);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    public static HttpResponse sendDelete(String url) {

        HttpClient httpClient = HttpClientBuilder.create().build();

        try {
            HttpDelete request = new HttpDelete(url);

            HEADERS.forEach(request::addHeader);

            return httpClient.execute(request);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    // Utility function to retreive the response body
    public static String getResponseBody(HttpResponse res) {
        if (res == null || res.getEntity() == null) {
            return null;
        }

        StringBuilder sb = new StringBuilder();

        try {
            InputStreamReader is = new InputStreamReader(res.getEntity().getContent());
            BufferedReader reader = new BufferedReader(is);

            String line = null;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return sb.toString();
    }

    public static boolean hasPositiveHTTPStatusCode(HttpResponse response){
        if (response == null) {
            return false;
        }

        int statusCode = response.getStatusLine().getStatusCode();
        return 200<=statusCode&&statusCode<300;
    }
}
