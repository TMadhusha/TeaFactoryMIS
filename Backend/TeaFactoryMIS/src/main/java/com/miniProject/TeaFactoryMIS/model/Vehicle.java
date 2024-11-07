package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

@Table(name = "All_vehicles")
public class Vehicle {
    @Id
    @Column(name = "vehicle_No")
    private String vehicle_No ;

    @Column(name = "vehicle_type")
    private String vehicle_type;

    @Lob
    @Column(name = "vehicle_image", length = 1000)
    private byte[] vehicle_image;

    @Column(name = "vehicle_availability")
    private String vehicle_availability;

    @Column(name = "fuel_name")
    private String fuel_name;
}






