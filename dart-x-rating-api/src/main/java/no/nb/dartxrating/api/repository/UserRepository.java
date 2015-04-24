package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by andreasb on 22.04.15.
 */
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);
}
