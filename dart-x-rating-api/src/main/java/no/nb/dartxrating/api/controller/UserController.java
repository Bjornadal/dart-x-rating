package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.api.repository.UserRepository;
import no.nb.dartxrating.api.security.UserRepositoryUserDetails;
import no.nb.dartxrating.model.database.DartUser;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.web.bind.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

/**
 * Created by andreasb on 22.04.15.
 */
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "/users", method = RequestMethod.POST)
    public ResponseEntity<DartUser> createUser(@Valid @RequestBody DartUser dartUser) {
        dartUser.setUserId(UUID.randomUUID().toString());
        dartUser.setDateCreated(DateTime.now().toDate());
        dartUser.setLeagueRoles(null);
        dartUser.setRoles(new ArrayList(Arrays.asList(new String[]{"ROLE_USER"})));

        userRepository.save(dartUser);
        return new ResponseEntity<>(dartUser, HttpStatus.CREATED);
    }

    @RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
    @PreAuthorize("#username == principal.username")
    public ResponseEntity<DartUser> getUsers(@PathVariable String username) {
        DartUser user = userRepository.findByUsername(username);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
