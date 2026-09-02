package coforge.car_seller.catalog;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class VehicleCatalogSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(VehicleCatalogSeeder.class);

    private final JdbcTemplate jdbcTemplate;
    private final VehicleCatalogLoader loader;
    private final VehicleEmbeddingService embeddingService;

    public VehicleCatalogSeeder(JdbcTemplate jdbcTemplate, VehicleCatalogLoader loader, VehicleEmbeddingService embeddingService) {
        this.jdbcTemplate = jdbcTemplate;
        this.loader = loader;
        this.embeddingService = embeddingService;
    }

    @Override
    public void run(String... args) {
        Integer existing = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM vehicle", Integer.class);
        if (existing != null && existing > 0) {
            log.info("Vehicle catalog already embedded ({} rows) — skipping seed.", existing);
            return;
        }

        log.info("Embedding vehicle catalog — calls Ollama once per vehicle, may take ~a minute...");
        List<VehicleCatalogEntry> catalog = loader.load();
        int count = embeddingService.embedAndStoreCatalog(catalog);
        log.info("Embedded and stored {} vehicles.", count);
    }
}
