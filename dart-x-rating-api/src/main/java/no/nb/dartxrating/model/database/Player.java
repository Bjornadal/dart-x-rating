package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Players")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Player {
    @Id
    private String playerId;
    private String userId;
    private String leagueId;
    private String name;
    private double rating;
    private double previousRating;
    private double ratingAdjustment;
    private int games;
    private int wins;
    private boolean playedLastGame;
    private List<Achievement> achievements = new ArrayList<>();

    public Player() {

    }

    public void merge(Player player) {
        this.name = (player.getName() != null) ? player.getName() : this.name;
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

    public String getLeagueId() {
        return leagueId;
    }

    public void setLeagueId(String leagueId) {
        this.leagueId = leagueId;
    }

    public boolean isPlayedLastGame() {
        return playedLastGame;
    }

    public void setPlayedLastGame(boolean playedLastGame) {
        this.playedLastGame = playedLastGame;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
