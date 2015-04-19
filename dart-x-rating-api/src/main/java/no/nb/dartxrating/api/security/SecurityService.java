package no.nb.dartxrating.api.security;

import no.nb.dartxrating.api.repository.LeagueRepository;
import no.nb.dartxrating.model.database.League;
import no.nb.dartxrating.model.rest.AuthToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.UUID;

/**
 * Created by Andreas on 19.04.2015.
 */
@Service
public class SecurityService {

    @Autowired
    private LeagueRepository leagueRepository;

    private HashMap<String, String> tokens = new HashMap<>();

    public AuthToken authenticate(League league, String password) throws InvalidKeySpecException, NoSuchAlgorithmException, IllegalAccessException {
        if (PasswordHash.validatePassword(password, league.getPassword(true))) {
            String token = UUID.randomUUID().toString();
            tokens.put(token, league.getLeagueId());
            return new AuthToken(token);
        }

        throw new IllegalAccessException("Wrong password");
    }

    public boolean hasAccess(String leagueId, String token) {
       if (tokens.get(token).equals(leagueId)) {
            return true;
        }

        return false;
    }
}
