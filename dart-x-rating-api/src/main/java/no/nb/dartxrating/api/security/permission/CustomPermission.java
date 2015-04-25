package no.nb.dartxrating.api.security.permission;

import no.nb.dartxrating.model.database.DartUser;
import no.nb.dartxrating.model.database.LeagueRole;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Optional;
import java.util.stream.Stream;

/**
 * Created by andreasb on 24.04.15.
 */
@Component
public class CustomPermission implements PermissionEvaluator {
    @Override
    public boolean hasPermission(Authentication authentication, Object o, Object o2) {
        DartUser dartUser = (DartUser)authentication.getPrincipal();
        String permissionType = (String)o2;
        String value = (String)o;

        switch(permissionType) {
            case "isLeagueAdmin":
                return hasLeaguePermission(dartUser, value, "ROLE_ADMIN");
            case "isLeagueUser":
                return hasLeaguePermission(dartUser, value, "ROLE_USER");
            default:
                return false;
        }
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable serializable, String s, Object o) {
        DartUser dartUser = (DartUser)authentication.getPrincipal();
        System.out.println("Checking leagueAdmin permission");
        return false;
    }

    private boolean hasLeaguePermission(DartUser dartUser, String leagueId, String roleCheck) {
        boolean hasAccess = dartUser.getLeagueRoles().stream().filter(role -> role.getLeagueId().equals(leagueId) && role.getRole().equals(roleCheck)).findAny().isPresent();
        return hasAccess;
    }
}
