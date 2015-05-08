package com.dartxrating.repository;

import com.dartxrating.domain.dart.League;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Created by andreasb on 10.04.15.
 */
public interface LeagueRepository  extends MongoRepository<League, String> {
}
