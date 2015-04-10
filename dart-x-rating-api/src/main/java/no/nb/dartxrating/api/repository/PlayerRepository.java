package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.Player;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by andreasb on 10.04.15.
 */
public interface PlayerRepository extends MongoRepository<Player, String> {
}
