package coforge.car_seller.catalog;

import org.springframework.stereotype.Component;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class VehicleCatalogLoader {

    private final tools.jackson.databind.ObjectMapper objectMapper;

    public VehicleCatalogLoader(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    public List<VehicleCatalogEntry> load() {
        try (InputStream is = getClass().getResourceAsStream("/data/vehicle-catalog.json")) {
            if (is == null) {
                throw new IllegalStateException("vehicle-catalog.json not found on classpath");
            }
            return objectMapper.readValue(is, new tools.jackson.core.type.TypeReference<List<VehicleCatalogEntry>>() {});
        } catch (IOException e) {
            throw new RuntimeException("Failed to load vehicle catalog", e);
        }
    }
}