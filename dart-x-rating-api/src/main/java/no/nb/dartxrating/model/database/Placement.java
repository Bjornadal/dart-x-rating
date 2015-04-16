package no.nb.dartxrating.model.database;

/**
 * Created by andreasb on 10.04.15.
 */
public class Placement implements Cloneable {
    private int placement;
    private Player player;

    public Placement clone() throws CloneNotSupportedException {
        return (Placement)super.clone();
    }

    public int getPlacement() {
        return placement;
    }

    public void setPlacement(int placement) {
        this.placement = placement;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

}
