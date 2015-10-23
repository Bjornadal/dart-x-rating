package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.GameRepository;
import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.api.repository.PlayerRepository;
import no.nb.dartxrating.api.service.RatingService;
import no.nb.dartxrating.model.database.Game;
import no.nb.dartxrating.model.database.League;
import no.nb.dartxrating.model.database.Placement;
import no.nb.dartxrating.model.database.Player;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
public class GameController {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private RatingService ratingService;

    @RequestMapping(value = "/leagues/{leagueId}/games", method = RequestMethod.GET)
    public ResponseEntity<List<Game>> listGames(@PathVariable String leagueId) {
        List<Game> games = gameRepository.findByLeagueId(leagueId);
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}/games", method = RequestMethod.POST)
    public ResponseEntity<Game> createGame(@PathVariable String leagueId,
                                           @Valid @RequestBody Game game) {
        List<Player> leaguePlayers = playerRepository.findByLeagueId(leagueId);

        Game strippedGame = new Game();
        strippedGame.setGameId(UUID.randomUUID().toString());
        strippedGame.setLeagueId(leagueId);
        strippedGame.setDateTime(DateTime.now().toDateTimeISO().toDate());

        for(Placement placement : game.getPlacements()) {
            Player strippedPlayer = new Player();
            strippedPlayer.setPlayerId(placement.getPlayer().getPlayerId());
            Player filteredPlayer = leaguePlayers.stream()
                                                            .filter(p -> p.getPlayerId().equals(strippedPlayer.getPlayerId()))
                                                            .collect(Collectors.toList()).get(0);
            strippedPlayer.setRating(filteredPlayer.getRating());
            strippedPlayer.setName(filteredPlayer.getName());
            placement.setPlayer(strippedPlayer);
            strippedGame.getPlacements().add(placement);
        }

        List<Player> calculatedRating = ratingService.calculateRatings(strippedGame);

        for (Player gamePlayer : calculatedRating) {
            for (Player leaguePlayer : leaguePlayers) {
                if (gamePlayer.getPlayerId().equals(leaguePlayer.getPlayerId())) {
                    leaguePlayer.setRating(gamePlayer.getRating());
                    leaguePlayer.setPreviousRating(gamePlayer.getPreviousRating());
                    leaguePlayer.setRatingAdjustment(gamePlayer.getRatingAdjustment());
                    leaguePlayer.setGames(leaguePlayer.getGames() + 1);

                    playerRepository.save(leaguePlayer);
                }
            }
        }

        gameRepository.save(strippedGame);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
