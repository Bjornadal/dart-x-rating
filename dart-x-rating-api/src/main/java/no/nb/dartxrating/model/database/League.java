package no.nb.dartxrating.model.database;

import org.joda.time.DateTime;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Leagues")
public class League {
    private String id;
    private String name;
    private List<Player> players;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Player> getPlayers() {
        if (players == null) {
            players = new ArrayList<>();
        }
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
