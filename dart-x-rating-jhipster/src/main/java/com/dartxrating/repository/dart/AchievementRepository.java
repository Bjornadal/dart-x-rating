package com.dartxrating.repository.dart;


import com.dartxrating.domain.dart.Achievement;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by andreasb on 17.04.15.
 */
public interface AchievementRepository extends MongoRepository<Achievement, String> {
    List<Achievement> findByLeagueId(String leagueId);
}
