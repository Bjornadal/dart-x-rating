package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.AchievementRepository;
import no.nb.dartxrating.api.security.SecurityService;
import no.nb.dartxrating.model.database.Achievement;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
public class AchievementController {

    @Autowired
    private SecurityService securityService;

    @Autowired
    private AchievementRepository achievementRepository;

    @RequestMapping(value = "/leagues/{leagueId}/achievements", method = RequestMethod.GET)
    public ResponseEntity<List<Achievement>> listAchievements(@PathVariable String leagueId) {
        return new ResponseEntity<>(achievementRepository.findByLeagueId(leagueId), HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}/achievements", method = RequestMethod.POST)
    public ResponseEntity<Achievement> createAchievement(@PathVariable String leagueId,
                                                         @Valid @RequestBody Achievement achievement,
                                                         @RequestHeader("authToken") String authToken) {
        if (!securityService.hasAccess(leagueId, authToken)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        achievement.setLeagueId(leagueId);
        achievement.setAchievementId(UUID.randomUUID().toString());
        achievement.setDateTime(DateTime.now().toDateTimeISO().toDate());
        achievementRepository.save(achievement);
        return new ResponseEntity<>(achievement, HttpStatus.OK);
    }
}
