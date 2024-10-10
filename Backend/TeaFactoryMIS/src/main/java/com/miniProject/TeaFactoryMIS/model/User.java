package com.miniProject.TeaFactoryMIS.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(name = "Users")
public class User {
    @Id
    private String userId;

    @Column(unique = true)
    private String username;

    private String password;


}
