package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonValue;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.hateoas.ResourceSupport;

import java.util.List;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Leagues")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class League extends ResourceSupport {
    @Id
    private String leagueId;
    private String name;
    private List<Player> players;
    private List<Game> games;

    public League() {

    }

    public String getLeagueId() {
        return leagueId;
    }

    public void setLeagueId(String leagueId) {
        this.leagueId = leagueId;
    }

    public String getExpand() {
        return "players,games";
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

    public List<Game> getGames() {
        return games;
    }

    public void setGames(List<Game> games) {
        this.games = games;
    }
}
