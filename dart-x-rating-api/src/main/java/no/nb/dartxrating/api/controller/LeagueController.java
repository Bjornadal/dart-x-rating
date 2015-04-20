package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.GameRepository;
import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.api.repository.PlayerRepository;
import no.nb.dartxrating.api.security.PasswordHash;
import no.nb.dartxrating.api.security.SecurityService;
import no.nb.dartxrating.model.database.League;
import no.nb.dartxrating.model.rest.AuthToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;
import java.util.UUID;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

/**
 * Created by andreasb on 10.04.15.
 */
@RestController
public class LeagueController {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private SecurityService securityService;

    @RequestMapping(value = "/leagues", method = RequestMethod.POST)
    public ResponseEntity<League> createLeague(@Valid @RequestBody League league) throws InvalidKeySpecException, NoSuchAlgorithmException {
        league.setLeagueId(UUID.randomUUID().toString());
        league.setPassword(PasswordHash.createHash(league.getPassword(true)));
        leagueRepository.save(league);
        return new ResponseEntity<>(league, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/leagues/{leagueId}", method = RequestMethod.POST)
    public ResponseEntity<League> updateLeague(@PathVariable String leagueId,
                                               @RequestHeader("authToken") String authToken,
                                               @RequestBody League league) {
        if (!securityService.hasAccess(leagueId, authToken)) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }

        League oldLeague = leagueRepository.findOne(leagueId);
        leagueRepository.save(oldLeague);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}/authenticate", method = RequestMethod.POST)
    public ResponseEntity<AuthToken> authenticateLeague(@PathVariable String leagueId,
                                                        @RequestHeader("password") String password) throws IllegalAccessException, InvalidKeySpecException, NoSuchAlgorithmException {
        League league = leagueRepository.findOne(leagueId);
        AuthToken authToken = securityService.authenticate(league, password);
        return new ResponseEntity<>(authToken, HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues", method = RequestMethod.GET)
    public ResponseEntity<List<League>> listLeagues(@RequestParam(required = false) String[] expand) {
        List<League> leagues = leagueRepository.findAll();
        for (League league : leagues) {
            league.add(linkTo(methodOn(LeagueController.class).getLeague(league.getLeagueId(), null)).withSelfRel());
            league.add(linkTo(methodOn(GameController.class).listGames(league.getLeagueId())).withRel("games"));
            league.add(linkTo(methodOn(PlayerController.class).listPlayers(league.getLeagueId())).withRel("players"));

            //Expand
            if (expand != null) {
                for (String item : expand) {
                    //Expand games
                    if (item.equals("games")) {
                        league.setGames(gameRepository.findByLeagueId(league.getLeagueId()));
                    }
                    //Expand players
                    if (item.equals("players")) {
                        league.setPlayers(playerRepository.findByLeagueId(league.getLeagueId()));
                    }
                }
            }
        }

        return new ResponseEntity<>(leagues, HttpStatus.OK);
    }

    @RequestMapping(value = "/leagues/{leagueId}", method = RequestMethod.GET)
    public ResponseEntity<League> getLeague(@PathVariable String leagueId,
                                            @RequestParam(required = false) String[] expand) {
        League league = leagueRepository.findOne(leagueId);
        league.add(linkTo(methodOn(GameController.class).listGames(league.getLeagueId())).withRel("games"));
        league.add(linkTo(methodOn(PlayerController.class).listPlayers(league.getLeagueId())).withRel("players"));

        //Expand
        if (expand != null) {
            for (String item : expand) {
                //Expand games
                if (item.equals("games")) {
                    league.setGames(gameRepository.findByLeagueId(league.getLeagueId()));
                }
                //Expand players
                if (item.equals("players")) {
                    league.setPlayers(playerRepository.findByLeagueId(league.getLeagueId()));
                }
            }
        }

        return new ResponseEntity<>(league, HttpStatus.OK);
    }
}
