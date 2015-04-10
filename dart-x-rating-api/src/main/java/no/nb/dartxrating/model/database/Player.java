package no.nb.dartxrating.model.database;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Players")
public class Player {
    private int id;
    private String name;
    private String alias;
    private String email;
    private double rating;
    private List<Achievement> achievements;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
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

    public List<Achievement> getAchievements() {
        return achievements;
    }

    public void setAchievements(List<Achievement> achievements) {
        this.achievements = achievements;
    }
}
