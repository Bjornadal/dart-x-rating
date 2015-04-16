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
    private int games;
    private int wins;
    private List<Achievement> achievements;

    public Player() {

    }

    public void merge(Player player) {
        this.name = (player.getName() != null) ? player.getName() : this.name;
        this.email = (player.getEmail() != null) ? player.getEmail() : this.email;
        this.rating = (player.getRating() != 0) ? player.getRating() : this.rating;
        this.previousRating = (player.getPreviousRating() != 0) ? player.getPreviousRating() : this.previousRating;
        this.ratingAdjustment = (player.getRatingAdjustment() != 0) ? player.getRatingAdjustment() : this.ratingAdjustment;
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

    public int getGames() {
        return games;
    }

    public void setGames(int games) {
        this.games = games;
    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }
}
