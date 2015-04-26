package no.nb.dartxrating.model.datebaseRaymond;

import java.util.Date;
import java.util.List;

/**
 * Created by Raymond on 25.04.2015.
 */
public class Season {

    private String seasonId;
    private String leagueId;
    private Date startDate;
    private Date endDate;
    private List<Game> games;
//    private List<Criterias> criterias;
    private List<Statistics> statistics;

}
