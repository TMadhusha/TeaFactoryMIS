package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Employee {
    @Id
    private String empId;
    private String firstname;
    private String lastname;
    @Temporal(TemporalType.DATE)
    private Date dob;

    private String houseNo;
    private String lineNo;
    private String nic;
    private String category;
    private String role;

    @Lob
    @Column(columnDefinition = "VARBINARY(MAX)")
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;



}
