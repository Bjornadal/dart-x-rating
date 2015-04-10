package no.nb.dartxrating.model.database;

import org.springframework.data.mongodb.core.mapping.Document;

/**
 * Created by andreasb on 10.04.15.
 */
@Document(collection = "Achievements")
public class Achievement {
    private int id;
    private String name;
    private String description;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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
}
