package com.dartxrating.web.rest.dart;

import com.dartxrating.domain.dart.Achievement;
import com.dartxrating.repository.dart.AchievementRepository;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
@RequestMapping("/api")
public class AchievementController {

    @Autowired
    private AchievementRepository achievementRepository;

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueUser')")
    @RequestMapping(value = "/leagues/{leagueId}/achievements", method = RequestMethod.GET)
    public ResponseEntity<List<Achievement>> listAchievements(@PathVariable String leagueId) {
        return new ResponseEntity<>(achievementRepository.findByLeagueId(leagueId), HttpStatus.OK);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueAdmin')")
    @RequestMapping(value = "/leagues/{leagueId}/achievements", method = RequestMethod.POST)
    public ResponseEntity<Achievement> createAchievement(@PathVariable String leagueId,
                                                         @Valid @RequestBody Achievement achievement) {
        achievement.setLeagueId(leagueId);
        achievement.setAchievementId(UUID.randomUUID().toString());
        achievement.setDateTime(DateTime.now().toDateTimeISO().toDate());
        achievementRepository.save(achievement);
        return new ResponseEntity<>(achievement, HttpStatus.OK);
    }
}
