package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.League;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by andreasb on 10.04.15.
 */
public interface LeagueRepository  extends MongoRepository<League, String> {
}
