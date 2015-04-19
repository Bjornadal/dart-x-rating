package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.AchievementRepository;
import no.nb.dartxrating.model.database.Achievement;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
public class AchievementController {

    @Autowired
    private AchievementRepository achievementRepository;

    @RequestMapping(value = "/achievements", method = RequestMethod.GET)
    public ResponseEntity<List<Achievement>> listAchievements() {
        return new ResponseEntity<>(achievementRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/achievements", method = RequestMethod.POST)
    public ResponseEntity<Achievement> createAchievement(@Valid @RequestBody Achievement achievement) {
        achievement.setAchievementId(UUID.randomUUID().toString());
        achievement.setDateTime(DateTime.now().toDateTimeISO().toDate());
        achievementRepository.save(achievement);
        return new ResponseEntity<>(achievement, HttpStatus.OK);
    }
}
