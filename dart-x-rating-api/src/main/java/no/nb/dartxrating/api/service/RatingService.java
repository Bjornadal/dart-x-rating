package no.nb.dartxrating.api.service;

import no.nb.dartxrating.model.database.Game;
import no.nb.dartxrating.model.database.Placement;
import no.nb.dartxrating.model.database.Player;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Andreas on 10.04.2015.
 */

@Service
public class RatingService {

    private final int kValue = 32;

    public List<Player> calculateRatings(Game game) {

        List<Placement> currentPlacements = new ArrayList<>();
        for (Placement currentPlacement : game.getPlacements()) {
            try {
                currentPlacements.add(currentPlacement.clone());
            }
            catch (CloneNotSupportedException cne) {
                currentPlacements.add(currentPlacement);
            }
        }

        for (Placement placement : game.getPlacements()) {
            Player player = placement.getPlayer();
            double rating = player.getRating();
            player.setPreviousRating(rating);
            double ratingAdjustment = 0;
            int wl = (placement.getPlacement() == 1) ? 1 : 0;
            boolean playerWinner = (placement.getPlacement() == 1);

            for (Placement comparePlacement : currentPlacements) {
                Player comparePlayer = comparePlacement.getPlayer();
                boolean comparePlayerWinner = (placement.getPlacement() != 1);
                if (player.getPlayerId().equals(comparePlayer.getPlayerId()) && (playerWinner || (!playerWinner && comparePlayerWinner))) {
                    double opponentRating = comparePlayer.getRating();
                    double winChance = 1/(1 + (Math.pow(10, ((opponentRating - rating) / 400))));
                    double currentRatingAdjustment = (rating+kValue*(wl-winChance))-rating;
                    ratingAdjustment += currentRatingAdjustment;

                    System.out.println("'" + player.getName() + "' has win chance of " + winChance + " against '" + comparePlayer.getName()  + "'");
                    System.out.println("'" + player.getName() + "' gets rating adjusted " + currentRatingAdjustment + " for " + (playerWinner ? "winning" : "losing") + " against '" + comparePlayer.getName()  + "'");
                }
            }

            player.setRatingAdjustment(ratingAdjustment);
            player.setRating(rating + ratingAdjustment);

            System.out.println("'" + player.getName() + "' gets total adjustment of " + ratingAdjustment + ". New rating " + player.getRating() + "");
            System.out.println("=========================================");
        }

        List<Player> players = new ArrayList<>();
        game.getPlacements().forEach(element -> players.add(element.getPlayer()));

        return players;
    }
}
