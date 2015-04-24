package no.nb.dartxrating.api.security.permission;

import no.nb.dartxrating.model.database.DartUser;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

/**
 * Created by andreasb on 24.04.15.
 */
@Component
public class LeagueAdminPermission implements PermissionEvaluator {
    @Override
    public boolean hasPermission(Authentication authentication, Object o, Object o2) {
        DartUser dartUser = (DartUser)authentication.getPrincipal();
        System.out.println("Checking leagueAdmin permission");
        return true;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable serializable, String s, Object o) {
        DartUser dartUser = (DartUser)authentication.getPrincipal();
        System.out.println("Checking leagueAdmin permission");
        return true;
    }
}
