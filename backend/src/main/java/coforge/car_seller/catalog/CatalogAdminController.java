package coforge.car_seller.catalog;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/catalog")
public class CatalogAdminController {

    private final VehicleCatalogLoader loader;
    private final VehicleEmbeddingService embeddingService;

    public CatalogAdminController(VehicleCatalogLoader loader, VehicleEmbeddingService embeddingService) {
        this.loader = loader;
        this.embeddingService = embeddingService;
    }

    @PostMapping("/reembed")
    public ResponseEntity<String> reembed() {
        int count = embeddingService.embedAndStoreCatalog(loader.load());
        return ResponseEntity.ok("Re-embedded " + count + " vehicles.");
    }
}
