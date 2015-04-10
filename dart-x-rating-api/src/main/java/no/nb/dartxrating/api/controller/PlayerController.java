package no.nb.dartxrating.api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by andreasb on 10.04.15.
 */

@RestController
@RequestMapping("/players")
public class PlayerController {

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String players() {
        return "Players";
    }
}
