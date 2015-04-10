package no.nb.dartxrating.model.database;

import org.joda.time.DateTime;

import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
public class Match {
    private int id;
    private DateTime dateTime;
    private List<Placement> placements;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public DateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(DateTime dateTime) {
        this.dateTime = dateTime;
    }

    public List<Placement> getPlacements() {
        return placements;
    }

    public void setPlacements(List<Placement> placements) {
        this.placements = placements;
    }
}
