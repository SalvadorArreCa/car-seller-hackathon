package coforge.car_seller.catalog;

import java.util.List;

public record VehicleCatalogEntry(
        String id,
        String make,
        String model,
        Integer year,
        Double price,
        String bodyType,
        String fuelType,
        String transmission,
        Integer seats,
        String drivetrain,
        FuelEconomy fuelEconomy,
        Integer electricRange,
        Double cargoCapacity,
        List<String> features
) {
    public record FuelEconomy(Integer city, Integer highway, Integer combined, String unit) {}
}