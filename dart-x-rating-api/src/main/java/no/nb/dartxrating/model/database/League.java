package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.hateoas.ResourceSupport;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Leagues")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class League {
    @Id
    private String leagueId;
    private String name;
    private List<Player> players;

    public League() {

    }

    public String getLeagueId() {
        return leagueId;
    }

    public void setLeagueId(String leagueId) {
        this.leagueId = leagueId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }
}
