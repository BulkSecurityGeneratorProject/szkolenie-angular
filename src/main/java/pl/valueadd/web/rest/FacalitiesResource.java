package pl.valueadd.web.rest;

import pl.valueadd.domain.Facalities;
import pl.valueadd.repository.FacalitiesRepository;
import pl.valueadd.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link pl.valueadd.domain.Facalities}.
 */
@RestController
@RequestMapping("/api")
public class FacalitiesResource {

    private final Logger log = LoggerFactory.getLogger(FacalitiesResource.class);

    private static final String ENTITY_NAME = "facalities";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacalitiesRepository facalitiesRepository;

    public FacalitiesResource(FacalitiesRepository facalitiesRepository) {
        this.facalitiesRepository = facalitiesRepository;
    }

    /**
     * {@code POST  /facalities} : Create a new facalities.
     *
     * @param facalities the facalities to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facalities, or with status {@code 400 (Bad Request)} if the facalities has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facalities")
    public ResponseEntity<Facalities> createFacalities(@RequestBody Facalities facalities) throws URISyntaxException {
        log.debug("REST request to save Facalities : {}", facalities);
        if (facalities.getId() != null) {
            throw new BadRequestAlertException("A new facalities cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Facalities result = facalitiesRepository.save(facalities);
        return ResponseEntity.created(new URI("/api/facalities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facalities} : Updates an existing facalities.
     *
     * @param facalities the facalities to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facalities,
     * or with status {@code 400 (Bad Request)} if the facalities is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facalities couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facalities")
    public ResponseEntity<Facalities> updateFacalities(@RequestBody Facalities facalities) throws URISyntaxException {
        log.debug("REST request to update Facalities : {}", facalities);
        if (facalities.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Facalities result = facalitiesRepository.save(facalities);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, facalities.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facalities} : get all the facalities.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facalities in body.
     */
    @GetMapping("/facalities")
    public List<Facalities> getAllFacalities() {
        log.debug("REST request to get all Facalities");
        return facalitiesRepository.findAll();
    }

    /**
     * {@code GET  /facalities/:id} : get the "id" facalities.
     *
     * @param id the id of the facalities to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facalities, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facalities/{id}")
    public ResponseEntity<Facalities> getFacalities(@PathVariable Long id) {
        log.debug("REST request to get Facalities : {}", id);
        Optional<Facalities> facalities = facalitiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facalities);
    }

    /**
     * {@code DELETE  /facalities/:id} : delete the "id" facalities.
     *
     * @param id the id of the facalities to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facalities/{id}")
    public ResponseEntity<Void> deleteFacalities(@PathVariable Long id) {
        log.debug("REST request to delete Facalities : {}", id);
        facalitiesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
