package com.miniProject.TeaFactoryMIS.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Fertilizer {

    @Id
    private  String fer_id;
    private  String  name;
    private double quantity;


}
