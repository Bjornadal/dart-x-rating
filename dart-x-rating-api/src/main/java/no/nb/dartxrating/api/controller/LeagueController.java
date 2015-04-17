package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.api.repository.PlayerRepository;
import no.nb.dartxrating.model.database.League;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
public class LeagueController {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @RequestMapping(value = "/leagues", method = RequestMethod.POST)
    public ResponseEntity<League> createLeague(@RequestBody League league) {
        league.setLeagueId(UUID.randomUUID().toString());
        leagueRepository.save(league);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/leagues/{leagueId}", method = RequestMethod.POST)
    public ResponseEntity<League> updateLeague(@PathVariable String leagueId, @RequestBody League league) {
        League oldLeague = leagueRepository.findOne(leagueId);
        leagueRepository.save(oldLeague);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues", method = RequestMethod.GET)
    public ResponseEntity<List<League>> listLeagues() {
        return new ResponseEntity<>(leagueRepository.findAll(), HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}", method = RequestMethod.GET)
    public ResponseEntity<League> getLeague(@PathVariable String leagueId) {
        League league = leagueRepository.findOne(leagueId);
        league.setPlayers(playerRepository.findByLeagueId(leagueId));
        return new ResponseEntity<>(league, HttpStatus.OK);
    }
}
