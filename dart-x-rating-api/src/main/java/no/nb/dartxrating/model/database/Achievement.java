package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.joda.time.DateTime;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Achievements")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Achievement {

    @Id
    private String achievementId;
    private String name;
    private String description;
    private Date dateTime;

    public String getAchievementId() {
        return achievementId;
    }

    public void setAchievementId(String achievementId) {
        this.achievementId = achievementId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDateTime() {
        return dateTime;
    }

    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
}
