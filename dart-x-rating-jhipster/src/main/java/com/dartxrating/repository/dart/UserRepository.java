package com.dartxrating.repository.dart;

import com.dartxrating.domain.dart.DartUser;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by andreasb on 22.04.15.
 */
public interface UserRepository extends MongoRepository<DartUser, String> {

    DartUser findByUsername(String username);
}
