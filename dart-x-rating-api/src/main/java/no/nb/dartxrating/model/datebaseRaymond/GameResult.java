package no.nb.dartxrating.model.datebaseRaymond;

import java.util.HashMap;

/**
 * Created by Raymond on 25.04.2015.
 */
public class GameResult {

    private String resultId;
    private String gameId;
    private HashMap<String, Integer> ranks;

    public boolean isWinner(String playerId) {
        return ranks.get(playerId) == 1;
    }
}
