package com.dartxrating.domain;

/**
 * Created by andreasb on 22.04.15.
 */
public class LeagueRole {
    private String leagueId;
    private String role;

    public LeagueRole(String leagueId, String role) {
        this.leagueId = leagueId;
        this.role = role;
    }

    public String getLeagueId() {
        return leagueId;
    }

    public void setLeagueId(String leagueId) {
        this.leagueId = leagueId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
