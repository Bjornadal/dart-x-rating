package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Player {
    private String playerId;
    private String name;
    private String email;
    private double rating;
    private double previousRating;
    private double ratingAdjustment;
    private List<Achievement> achievements;

    public Player() {

    }

    public String getPlayerId() {
        return playerId;
    }

    public void setPlayerId(String playerId) {
        this.playerId = playerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public double getPreviousRating() {
        return previousRating;
    }

    public void setPreviousRating(double previousRating) {
        this.previousRating = previousRating;
    }

    public double getRatingAdjustment() {
        return ratingAdjustment;
    }

    public void setRatingAdjustment(double ratingAdjustment) {
        this.ratingAdjustment = ratingAdjustment;
    }

    public List<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }
}
