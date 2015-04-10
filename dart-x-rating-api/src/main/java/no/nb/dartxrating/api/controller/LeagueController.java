package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.model.database.League;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
@RequestMapping("/leagues")
public class LeagueController {

    @Autowired
    private LeagueRepository leagueRepository;

    @RequestMapping(value = "" ,method = RequestMethod.POST)
    public ResponseEntity<League> createLeague(@RequestBody League league) {
        league.setId(UUID.randomUUID().toString());
        leagueRepository.save(league);

        return new ResponseEntity<League>(HttpStatus.CREATED);
    }

    @RequestMapping
    public ResponseEntity<List<League>> listLeagues() {
        return new ResponseEntity<List<League>>(leagueRepository.findAll(), HttpStatus.OK);
    }
}
