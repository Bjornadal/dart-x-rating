package no.nb.dartxrating.model.datebaseRaymond;

import java.util.Date;
import java.util.List;

/**
 * Created by Raymond on 25.04.2015.
 */
public class League {

    private String leagueId;
    private String name;
    private Date dateCreated;
    private List<String> owners; //List of userIds
    private List<Season> seasons;
    private List<Cup> cups;
    private List<Statistics> statistics;
}
