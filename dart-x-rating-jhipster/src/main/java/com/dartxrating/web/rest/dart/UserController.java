package com.dartxrating.web.rest.dart;

//import com.dartxrating.domain.dart.DartUser;
//import com.dartxrating.repository.dart.UserRepository;
//import org.joda.time.DateTime;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.access.prepost.PreAuthorize;
//import org.springframework.web.bind.annotation.*;
//
//import javax.validation.Valid;
//import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.UUID;

/**
 * Created by andreasb on 22.04.15.
 */
//@RestController
//@RequestMapping("/api")
//public class UserController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @RequestMapping(value = "/users", method = RequestMethod.POST)
//    public ResponseEntity<DartUser> createUser(@Valid @RequestBody DartUser dartUser) {
//        if (userRepository.findByUsername(dartUser.getUsername()) != null) {
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//
//        dartUser.setUserId(UUID.randomUUID().toString());
//        dartUser.setDateCreated(DateTime.now().toDate());
//        dartUser.setLeagueRoles(new ArrayList<>());
//        dartUser.setRoles(new ArrayList(Arrays.asList(new String[]{"ROLE_USER"})));
//
//        userRepository.save(dartUser);
//        return new ResponseEntity<>(dartUser, HttpStatus.CREATED);
//    }
//
//    @RequestMapping(value = "/users/{username}", method = RequestMethod.GET)
//    @PreAuthorize("#username == principal.username")
//    public ResponseEntity<DartUser> getUsers(@PathVariable String username) {
//        DartUser user = userRepository.findByUsername(username);
//
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//}
