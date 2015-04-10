package no.nb.dartxrating.model.database;

/**
 * Created by andreasb on 10.04.15.
 */
public class Placement {
    private Player player;
    private int placement;

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int getPlacement() {
        return placement;
    }

    public void setPlacement(int placement) {
        this.placement = placement;
    }
}
