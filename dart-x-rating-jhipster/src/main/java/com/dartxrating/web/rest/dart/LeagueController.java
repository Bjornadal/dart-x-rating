package com.dartxrating.web.rest.dart;

import com.dartxrating.domain.dart.League;
import com.dartxrating.repository.dart.AchievementRepository;
import com.dartxrating.repository.dart.GameRepository;
import com.dartxrating.repository.dart.LeagueRepository;
import com.dartxrating.repository.dart.PlayerRepository;
import com.dartxrating.security.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mvc.ControllerLinkBuilder;import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
@RequestMapping("/api")
public class LeagueController {

    @Autowired
    private LeagueRepository leagueRepository;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private AchievementRepository achievementRepository;

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value = "/leagues", method = RequestMethod.POST)
    public ResponseEntity<League> createLeague(@Valid @RequestBody League league) throws InvalidKeySpecException, NoSuchAlgorithmException {
        league.setLeagueId(UUID.randomUUID().toString());
        league.setPassword(PasswordHash.createHash(league.getPassword(true)));
        leagueRepository.save(league);
        return new ResponseEntity<>(league, HttpStatus.CREATED);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueAdmin')")
    @RequestMapping(value = "/leagues/{leagueId}", method = RequestMethod.POST)
    public ResponseEntity<League> updateLeague(@PathVariable String leagueId,
                                               @RequestBody League league) {
        League oldLeague = leagueRepository.findOne(leagueId);
        leagueRepository.save(oldLeague);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ROLE_USER')")
    @RequestMapping(value = "/leagues", method = RequestMethod.GET)
    public ResponseEntity<List<League>> listLeagues(@RequestParam(required = false) String[] expand) {
        List<League> leagues = leagueRepository.findAll();
        for (League league : leagues) {
            league.add(linkTo(methodOn(LeagueController.class).getLeague(league.getLeagueId(), null)).withSelfRel());
            league.add(linkTo(methodOn(GameController.class).listGames(league.getLeagueId())).withRel("games"));
            league.add(ControllerLinkBuilder.linkTo(methodOn(PlayerController.class).listPlayers(league.getLeagueId())).withRel("players"));
            league.add(linkTo(methodOn(AchievementController.class).listAchievements(league.getLeagueId())).withRel("achievements"));

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
                    // Expand achievements
                    if (item.equals("achievements")) {
                        league.setAchievements(achievementRepository.findByLeagueId(league.getLeagueId()));
                    }
                }
            }
        }

        return new ResponseEntity<>(leagues, HttpStatus.OK);
    }

    @PreAuthorize("hasPermission(#leagueId, 'isLeagueUser')")
    @RequestMapping(value = "/leagues/{leagueId}", method = RequestMethod.GET)
    public ResponseEntity<League> getLeague(@PathVariable String leagueId,
                                            @RequestParam(required = false) String[] expand) {
        League league = leagueRepository.findOne(leagueId);
        league.add(linkTo(methodOn(GameController.class).listGames(league.getLeagueId())).withRel("games"));
        league.add(ControllerLinkBuilder.linkTo(methodOn(PlayerController.class).listPlayers(league.getLeagueId())).withRel("players"));
        league.add(linkTo(methodOn(AchievementController.class).listAchievements(league.getLeagueId())).withRel("achievements"));

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
                // Expand achievements
                if (item.equals("achievements")) {
                    league.setAchievements(achievementRepository.findByLeagueId(league.getLeagueId()));
                }
            }
        }

        return new ResponseEntity<>(league, HttpStatus.OK);
    }
}
