package no.nb.dartxrating.model.database;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

/**
 * Created by andreasb on 22.04.15.
 */
@Document(collection = "Accounts")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Account {
    private String accountId;
    private String username;
    private String password;
    private String email;
    private Date dateCreated;
    private String systemRole;
    private List<HasLeagueRole> leagueRoles;

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
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

    public List<HasLeagueRole> getLeagueRoles() {
        return leagueRoles;
    }

    public void setLeagueRoles(List<HasLeagueRole> leagueRoles) {
        this.leagueRoles = leagueRoles;
    }

    public String getSystemRole() {
        return systemRole;
    }

    public void setSystemRole(String systemRole) {
        this.systemRole = systemRole;
    }
}
