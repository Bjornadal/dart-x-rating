package no.nb.dartxrating.model.datebaseRaymond;

import java.util.Date;
import java.util.List;

/**
 * Created by Raymond on 25.04.2015.
 */
public class Game {

    private String gameId;
    private String seasonId;
    private String type;
    private Date date;
    private List<String> players; //List of playerIds
    private GameResult result;
    private List<Statistics> statistics;
}
