package com.dartxrating.web.rest.dart;

import com.dartxrating.domain.dart.Achievement;
import com.dartxrating.domain.dart.Player;
import com.dartxrating.repository.dart.PlayerRepository;
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
public class PlayerController {

    @Autowired
    private PlayerRepository playerRepository;

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueUser')")
    @RequestMapping(value = "/leagues/{leagueId}/players", method = RequestMethod.GET)
    public ResponseEntity<List<Player>> listPlayers(@PathVariable String leagueId) {
        List<Player> leaguePlayers = playerRepository.findByLeagueId(leagueId);
        return new ResponseEntity<>(leaguePlayers, HttpStatus.OK);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueAdmin')")
    @RequestMapping(value = "/leagues/{leagueId}/players", method = RequestMethod.POST)
    public ResponseEntity createPlayer(@PathVariable String leagueId,
                                       @Valid @RequestBody Player player) {
        player.setPlayerId(UUID.randomUUID().toString());
        player.setRating(1500);
        player.setLeagueId(leagueId);
        playerRepository.save(player);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueAdmin')")
    @RequestMapping(value = "/leagues/{leagueId}/players/{playerId}", method = RequestMethod.POST)
    public ResponseEntity updatePlayer(@PathVariable String leagueId,
                                       @PathVariable String playerId,
                                       @RequestBody Player player) {
        Player oldPlayer = playerRepository.findOne(playerId);
        oldPlayer.merge(player);
        playerRepository.save(player);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueUser')")
    @RequestMapping(value = "/leagues/{leagueId}/players/{playerId}/achievements", method = RequestMethod.POST)
    public ResponseEntity<Player> addAchievement(@PathVariable String leagueId,
                                                 @PathVariable String playerId,
                                                 @RequestBody Achievement achievement) {
        Player player = playerRepository.findOne(playerId);
        achievement.setDateTime(DateTime.now().toDateTimeISO().toDate());
        player.getAchievements().add(achievement);
        playerRepository.save(player);
        return new ResponseEntity<>(player, HttpStatus.CREATED);
    }
}
