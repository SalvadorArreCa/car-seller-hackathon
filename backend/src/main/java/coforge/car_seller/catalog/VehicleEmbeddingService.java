package coforge.car_seller.catalog;

import coforge.car_seller.ollama.OllamaService;
import com.pgvector.PGvector;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@Service
public class VehicleEmbeddingService {

    private final JdbcTemplate jdbcTemplate;
    private final OllamaService ollamaService;
    private final ObjectMapper objectMapper;

    public VehicleEmbeddingService(JdbcTemplate jdbcTemplate, OllamaService ollamaService, ObjectMapper objectMapper) {
        this.jdbcTemplate = jdbcTemplate;
        this.ollamaService = ollamaService;
        this.objectMapper = objectMapper;
    }

    public int embedAndStoreCatalog(List<VehicleCatalogEntry> catalog) {
        int count = 0;
        for (VehicleCatalogEntry vehicle : catalog) {
            String description = VehicleDescriptionBuilder.build(vehicle);
            PGvector vector = new PGvector(ollamaService.embed(description));

            // Jackson 3: this now throws an unchecked JacksonException on failure —
            // no try/catch needed, it'll just propagate if serialization ever fails.
            String detailsJson = objectMapper.writeValueAsString(vehicle);

            jdbcTemplate.update("""
                INSERT INTO vehicle (id, make, model, year, price, body_type, fuel_type, seats, description, details, embedding)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?::jsonb, ?)
                ON CONFLICT (id) DO UPDATE SET
                    make = EXCLUDED.make, model = EXCLUDED.model, year = EXCLUDED.year,
                    price = EXCLUDED.price, body_type = EXCLUDED.body_type, fuel_type = EXCLUDED.fuel_type,
                    seats = EXCLUDED.seats, description = EXCLUDED.description,
                    details = EXCLUDED.details, embedding = EXCLUDED.embedding
                """,
                    vehicle.id(), vehicle.make(), vehicle.model(), vehicle.year(), vehicle.price(),
                    vehicle.bodyType(), vehicle.fuelType(), vehicle.seats(),
                    description, detailsJson, vector);
            count++;
        }
        return count;
    }
}