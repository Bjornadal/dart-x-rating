package no.nb.dartxrating.api.security;

import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.model.database.League;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Andreas on 19.04.2015.
 */
@Service
public class SecurityService {

    @Autowired
    private LeagueRepository leagueRepository;

    public String authenticate(String leagueId, String password) {
        leagueRepository.findOne(leagueId);
        return "";
    }
}
