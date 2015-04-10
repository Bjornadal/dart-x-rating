package no.nb.dartxrating.model.database;

import org.joda.time.DateTime;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Games")
public class Game {
    private int id;
    private League league;
    private DateTime dateTime;
    private List<Placement> placements;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public League getLeague() {
        return league;
    }

    public void setLeague(League league) {
        this.league = league;
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
