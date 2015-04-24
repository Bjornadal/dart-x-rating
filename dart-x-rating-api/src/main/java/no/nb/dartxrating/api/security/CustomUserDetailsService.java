package no.nb.dartxrating.api.security;

import no.nb.dartxrating.api.repository.UserRepository;
import no.nb.dartxrating.model.database.DartUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

/**
 * Created by Andreas on 22.04.2015.
 */
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DartUser user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username " + username + " not found");
        }

        String[] userRoles = user.getRoles().toArray(new String[user.getRoles().size()]);
        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRoles);

        //return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
        //return new UserRepositoryUserDetails(user);
        return user;
    }
}