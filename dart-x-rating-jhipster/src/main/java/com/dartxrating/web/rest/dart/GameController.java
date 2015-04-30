package com.dartxrating.web.rest.dart;

import com.dartxrating.domain.dart.Game;
import com.dartxrating.domain.dart.Placement;
import com.dartxrating.domain.dart.Player;
import com.dartxrating.domain.dart.PlayerPlacement;
import com.dartxrating.repository.dart.GameRepository;
import com.dartxrating.repository.dart.PlayerRepository;
import com.dartxrating.service.dart.RatingService;
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
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private RatingService ratingService;

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueUser')")
    @RequestMapping(value = "/leagues/{leagueId}/games", method = RequestMethod.GET)
    public ResponseEntity<List<Game>> listGames(@PathVariable String leagueId) {
        List<Game> games = gameRepository.findByLeagueId(leagueId);
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueUser')")
    @RequestMapping(value = "/leagues/{leagueId}/games", method = RequestMethod.POST)
    public ResponseEntity<Game> createGame(@PathVariable String leagueId,
                                           @Valid @RequestBody Game game) {
        // Set game variables
        game.setGameId(UUID.randomUUID().toString());
        game.setLeagueId(leagueId);
        game.setDateTime(DateTime.now().toDateTimeISO().toDate());

        // Find player data
        for(Placement placement : game.getPlacements()) {
            Player leaguePlayer = playerRepository.findOne(placement.getPlayer().getPlayerId());
            PlayerPlacement player = placement.getPlayer();
            player.setRating(leaguePlayer.getRating());
            player.setName(leaguePlayer.getName());
        }

        // Calculate game rating
        List<PlayerPlacement> calculatedRating = ratingService.calculateRatings(game);

        // Set league players
        List<Player> leaguePlayers = playerRepository.findByLeagueId(leagueId);
        for (Player leaguePlayer : leaguePlayers) {
            leaguePlayer.setPlayedLastGame(false);
            playerRepository.save(leaguePlayer);
        }

        for (PlayerPlacement gamePlayer : calculatedRating) {
            for (Player leaguePlayer : leaguePlayers) {
                if (gamePlayer.getPlayerId().equals(leaguePlayer.getPlayerId())) {
                    leaguePlayer.setRating(gamePlayer.getRating());
                    leaguePlayer.setRatingAdjustment(gamePlayer.getRatingAdjustment());
                    leaguePlayer.setGames(leaguePlayer.getGames() + 1);
                    leaguePlayer.setPlayedLastGame(true);
                    playerRepository.save(leaguePlayer);
                }
            }
        }

        // Save game
        gameRepository.save(game);

        return new ResponseEntity<>(game, HttpStatus.OK);
    }

}
