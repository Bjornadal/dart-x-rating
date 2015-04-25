package no.nb.dartxrating.model.datebaseRaymond;

import java.util.Date;
import java.util.List;

/**
 * Created by Raymond on 25.04.2015.
 */
public class User {

    private int userId;
    private String firstname;
    private String lastname;
    private String alias;
    private String email;
    private String password;
    private Date dateCreated;
    private List<String> roles;
    private List<Statistics> statistics;
}
