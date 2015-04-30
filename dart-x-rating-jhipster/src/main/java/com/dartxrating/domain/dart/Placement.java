package com.dartxrating.domain.dart;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * Created by andreasb on 10.04.15.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Placement {
    private int placement;
    private PlayerPlacement player;

    public int getPlacement() {
        return placement;
    }

    public void setPlacement(int placement) {
        this.placement = placement;
    }

    public PlayerPlacement getPlayer() {
        return player;
    }

    public void setPlayer(PlayerPlacement player) {
        this.player = player;
    }

}
