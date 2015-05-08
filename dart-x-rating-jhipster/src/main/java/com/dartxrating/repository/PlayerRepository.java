package com.dartxrating.repository;

import com.dartxrating.domain.dart.Player;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by andreasb on 17.04.15.
 */
public interface PlayerRepository extends MongoRepository<Player, String> {
    List<Player> findByLeagueId(String leagueId);

    @Override
    <S extends Player> S save(S s);
}
