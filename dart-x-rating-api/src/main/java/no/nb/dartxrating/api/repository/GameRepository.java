package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.Achievement;
import no.nb.dartxrating.model.database.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by andreasb on 17.04.15.
 */
public interface GameRepository extends MongoRepository<Game, String> {
    List<Game> findByLeagueId(String leagueId);
}
