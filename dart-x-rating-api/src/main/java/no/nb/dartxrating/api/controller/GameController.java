package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.LeagueRepository;
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

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
public class GameController {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private RatingService ratingService;

    @RequestMapping(value = "/leagues/{leagueId}/games", method = RequestMethod.GET)
    public ResponseEntity<List<Game>> listGames(@PathVariable String leagueId) {
        List<Game> games = leagueRepository.findOne(leagueId).getGames();

        return new ResponseEntity<List<Game>>(games, HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}/games", method = RequestMethod.POST)
    public ResponseEntity<Game> createGame(@PathVariable String leagueId, @RequestBody Game game) {

        League league = leagueRepository.findOne(leagueId);

        Game strippedGame = new Game();
        strippedGame.setGameId(UUID.randomUUID().toString());
        strippedGame.setDateTime(DateTime.now().toDateTimeISO().toDate());
        for(Placement placement : game.getPlacements()) {
            Player strippedPlayer = new Player();
            strippedPlayer.setPlayerId(placement.getPlayer().getPlayerId());
            List<Player> filterdPlayer = league.getPlayers().stream()
                                                            .filter(p -> p.getPlayerId().equals(strippedPlayer.getPlayerId()))
                                                            .collect(Collectors.toList());
            strippedPlayer.setRating(filterdPlayer.get(0).getRating());
            strippedPlayer.setName(filterdPlayer.get(0).getName());
            placement.setPlayer(strippedPlayer);
            strippedGame.getPlacements().add(placement);
        }

        List<Player> calculatedRating = ratingService.calculateRatings(strippedGame);

        for (Player gamePlayer : calculatedRating) {
            for (Player leaguePlayer : league.getPlayers()) {
                if (gamePlayer.getPlayerId().equals(leaguePlayer.getPlayerId())) {
                    leaguePlayer.setRating(gamePlayer.getRating());
                    leaguePlayer.setPreviousRating(gamePlayer.getPreviousRating());
                    leaguePlayer.setRatingAdjustment(gamePlayer.getRatingAdjustment());
                }
            }
        }

        league.getGames().add(strippedGame);
        leagueRepository.save(league);

        return new ResponseEntity<Game>(HttpStatus.OK);
    }

}
