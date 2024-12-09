package com.miniProject.TeaFactoryMIS.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data

public class FuelDTO {
    private String fuel_id;
    private String fuel_name;
    private String fuel_type;
    private String fuel_quantity;
}