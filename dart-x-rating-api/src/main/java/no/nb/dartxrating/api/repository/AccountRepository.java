package no.nb.dartxrating.api.repository;

import no.nb.dartxrating.model.database.Account;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by andreasb on 22.04.15.
 */
public interface AccountRepository extends MongoRepository<Account, String> {
    List<Account> findByUsername(String username);
}
