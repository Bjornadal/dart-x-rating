package com.dartxrating.security.permission;

import com.dartxrating.domain.dart.DartUser;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Collection;

/**
 * Created by andreasb on 24.04.15.
 */
@Component
public class CustomPermission implements PermissionEvaluator {
    @Override
    public boolean hasPermission(Authentication authentication, Object o, Object o2) {
        String permissionType = (String)o2;
        String value = (String)o;

        switch(permissionType) {
            case "isLeagueAdmin":
                return hasLeaguePermission(authentication.getAuthorities(), value, "LEAGUE_ADMIN");
            case "isLeagueUser":
                return hasLeaguePermission(authentication.getAuthorities(), value, "LEAGUE_USER");
            default:
                return false;
        }
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable serializable, String s, Object o) {
        String permissionType = s;
        String value = (String)o;

        switch(permissionType) {
            case "isLeagueAdmin":
                return hasLeaguePermission(authentication.getAuthorities(), value, "LEAGUE_ADMIN");
            case "isLeagueUser":
                return hasLeaguePermission(authentication.getAuthorities(), value, "LEAGUE_USER");
            default:
                return false;
        }
    }

    private boolean hasLeaguePermission(Collection<? extends GrantedAuthority> authorities, String leagueId, String roleCheck) {
        for (GrantedAuthority ga : authorities) {
            System.out.println(ga.getAuthority() + " vs " + roleCheck + ";" + leagueId);
            if (ga.getAuthority().equals(roleCheck + ";" + leagueId))   {
                System.out.println("Found role");
            }
            else {
                System.out.println("NO role");
            }
        }
        boolean hasAccess = authorities.stream().filter(role -> role.getAuthority().equals(roleCheck + ";" + leagueId)).findAny().isPresent();
        return hasAccess;
    }
}
