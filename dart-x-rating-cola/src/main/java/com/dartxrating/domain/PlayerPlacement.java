package com.dartxrating.domain;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by Andreas on 18.04.2015.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlayerPlacement {
    private String playerId;
    private String name;
    private double rating;
    private double ratingAdjustment;

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

    public double getRatingAdjustment() {
        return ratingAdjustment;
    }

    public void setRatingAdjustment(double ratingAdjustment) {
        this.ratingAdjustment = ratingAdjustment;
    }
}
