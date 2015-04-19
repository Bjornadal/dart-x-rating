package no.nb.dartxrating.model.rest;

/**
 * Created by Andreas on 19.04.2015.
 */
public class AuthToken {
    private String token;

    public AuthToken(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
