package no.nb.dartxrating.api.security;

import no.nb.dartxrating.api.repository.AccountRepository;
import no.nb.dartxrating.model.database.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

import static java.util.Arrays.asList;

/**
 * Created by Andreas on 22.04.2015.
 */
@Service
public class DartUserDetailsService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepository.findByUsername(username);
        if (account == null) {
            throw new UsernameNotFoundException("Username " + username + " not found");
        }

        String[] accountRoles = account.getRoles().toArray(new String[account.getRoles().size()]);
        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(accountRoles);

        return new User(username, account.getPassword(), authorities);
    }
}