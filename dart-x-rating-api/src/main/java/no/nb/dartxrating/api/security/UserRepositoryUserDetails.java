package no.nb.dartxrating.api.security;

import no.nb.dartxrating.model.database.DartUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

/**
 * Created by andreasb on 24.04.15.
 */
public class UserRepositoryUserDetails extends DartUser implements UserDetails {

    public UserRepositoryUserDetails() {

    }

    public UserRepositoryUserDetails(DartUser dartUser) {
        super(dartUser);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String[] userRoles = this.getRoles().toArray(new String[this.getRoles().size()]);
        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRoles);
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
