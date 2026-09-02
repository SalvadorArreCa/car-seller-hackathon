package coforge.car_seller.catalog;

public class VehicleDescriptionBuilder {

    public static String build(VehicleCatalogEntry v) {
        StringBuilder sb = new StringBuilder();

        sb.append(v.year()).append(" ").append(v.make()).append(" ").append(v.model())
                .append(", ").append(v.bodyType()).append(". ");

        sb.append(v.fuelType()).append(", ").append(v.transmission())
                .append(" transmission, ").append(v.drivetrain())
                .append(", seats ").append(v.seats()).append(". ");

        if (v.fuelEconomy() != null) {
            sb.append("Fuel economy: ").append(v.fuelEconomy().combined())
                    .append(" ").append(v.fuelEconomy().unit()).append(" combined. ");
        } else if (v.electricRange() != null) {
            sb.append("Electric range: ").append(v.electricRange()).append(" miles. ");
        }

        if (v.cargoCapacity() != null) {
            sb.append("Cargo capacity: ").append(v.cargoCapacity()).append(" cubic feet. ");
        }

        sb.append("Price: $").append(String.format("%,.0f", v.price())).append(". ");

        if (v.features() != null && !v.features().isEmpty()) {
            sb.append("Features: ").append(String.join(", ", v.features())).append(".");
        }

        return sb.toString().trim();
    }
}
