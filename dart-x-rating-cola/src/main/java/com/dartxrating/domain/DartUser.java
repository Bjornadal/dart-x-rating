package com.dartxrating.domain;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * Created by andreasb on 22.04.15.
 */
@Document(collection = "Users")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DartUser implements UserDetails {
    @Id
    private String userId;
    private String username;
    private String password;
    private String name;
    private String email;
    private Date dateCreated;
    private List<String> roles;
    private List<LeagueRole> leagueRoles;

    public DartUser() {

    }

    public DartUser(DartUser dartUser) {
        this.userId = dartUser.getUserId();
        this.name = dartUser.getName();
        this.username = dartUser.getUsername();
        this.password = dartUser.getPassword();
        this.name = dartUser.getName();
        this.email = dartUser.getEmail();
        this.dateCreated = dartUser.getDateCreated();
        this.roles = dartUser.getRoles();
        this.leagueRoles = dartUser.getLeagueRoles();
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

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String[] userRoles = this.getRoles().toArray(new String[this.getRoles().size()]);
        Collection<? extends GrantedAuthority> authorities = AuthorityUtils.createAuthorityList(userRoles);
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
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
