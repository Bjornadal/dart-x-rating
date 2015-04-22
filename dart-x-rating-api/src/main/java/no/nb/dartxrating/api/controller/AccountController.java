package no.nb.dartxrating.api.controller;

import no.nb.dartxrating.model.database.Account;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

/**
 * Created by andreasb on 22.04.15.
 */
//@RestController
public class AccountController {

    @RequestMapping(value = "/accounts", method = RequestMethod.POST)
    public ResponseEntity<Account> createAccount(@Valid @RequestBody Account account) {
        return null;
    }

    @RequestMapping(value = "/accounts/{accountId}", method = RequestMethod.GET)
    public ResponseEntity<Account> getAccount(@RequestParam String accountId) {
        return null;
    }

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity login() {
        return null;
    }

    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity logout() {
        return null;
    }
}
