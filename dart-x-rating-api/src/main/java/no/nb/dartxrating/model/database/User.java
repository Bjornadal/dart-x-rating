package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Created by andreasb on 22.04.15.
 */
@Document(collection = "Users")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class User {
    @Id
    private String userId;
    private String username;
    private String password;
    private String name;
    private String email;
    private Date dateCreated;
    private List<String> roles;
    private List<LeagueRole> leagueRoles;

    public User() {

    }

    public User(User user) {
        super();
        this.userId = user.getUserId();
        this.name = user.getName();
        this.password = user.getPassword();
        this.name = user.getName();
        this.email = user.getEmail();
        this.dateCreated = user.getDateCreated();
        this.roles = user.getRoles();
        this.leagueRoles = user.getLeagueRoles();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public List<LeagueRole> getLeagueRoles() {
        return leagueRoles;
    }

    public void setLeagueRoles(List<LeagueRole> leagueRoles) {
        this.leagueRoles = leagueRoles;
    }
}
