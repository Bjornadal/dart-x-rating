package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.Game;
import no.nb.dartxrating.model.database.Player;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by andreasb on 17.04.15.
 */
public interface PlayerRepository extends MongoRepository<Player, String> {
    List<Player> findByLeagueId(String leagueId);
}
