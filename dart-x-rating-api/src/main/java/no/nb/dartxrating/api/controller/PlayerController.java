package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.api.repository.PlayerRepository;
import no.nb.dartxrating.model.database.League;
import no.nb.dartxrating.model.database.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by andreasb on 10.04.15.
 */

@RestController
public class PlayerController {

    @Autowired
    private LeagueRepository leagueRepository;

    @RequestMapping(value = "/leagues/{leagueId}/players", method = RequestMethod.GET)
    public ResponseEntity<List<Player>> listPlayers(@PathVariable String leagueId) {

        List<Player> leaguePlayers = leagueRepository.findOne(leagueId).getPlayers();

        return new ResponseEntity<List<Player>>(leaguePlayers, HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}/players", method = RequestMethod.POST)
    public ResponseEntity createPlayer(@PathVariable String leagueId, @RequestBody Player player) {

        player.setPlayerId(UUID.randomUUID().toString());
        player.setRating(1500);

        League league = leagueRepository.findOne(leagueId);
        league.getPlayers().add(player);
        leagueRepository.save(league);

        return new ResponseEntity<Player>(HttpStatus.CREATED);
    }

    @RequestMapping(value = "/leagues/{leagueId}/players/{playerId}", method = RequestMethod.POST)
    public ResponseEntity createPlayer(@PathVariable String leagueId, @PathVariable String playerId, @RequestBody Player player) {
        League league = leagueRepository.findOne(leagueId);
        List<Player> leaguePlayers = league.getPlayers();

        Player oldPlayer = leaguePlayers.stream()
                .filter(p -> p.getPlayerId().equals(playerId))
                .collect(Collectors.toList()).get(0);

        oldPlayer.merge(player);

        leagueRepository.save(league);

        return new ResponseEntity<Player>(HttpStatus.OK);
    }
}
