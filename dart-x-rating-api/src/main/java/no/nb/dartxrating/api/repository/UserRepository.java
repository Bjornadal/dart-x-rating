package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.DartUser;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by andreasb on 22.04.15.
 */
public interface UserRepository extends MongoRepository<DartUser, String> {

    DartUser findByUsername(String username);
}
