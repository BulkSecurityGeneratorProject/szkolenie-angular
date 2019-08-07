package pl.valueadd.web.rest;

import pl.valueadd.domain.Facilities;
import pl.valueadd.repository.FacilitiesRepository;
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
 * REST controller for managing {@link pl.valueadd.domain.Facilities}.
 */
@RestController
@RequestMapping("/api")
public class FacilitiesResource {

    private final Logger log = LoggerFactory.getLogger(FacilitiesResource.class);

    private static final String ENTITY_NAME = "facilities";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FacilitiesRepository facilitiesRepository;

    public FacilitiesResource(FacilitiesRepository facilitiesRepository) {
        this.facilitiesRepository = facilitiesRepository;
    }

    /**
     * {@code POST  /facilities} : Create a new facilities.
     *
     * @param facilities the facilities to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new facilities, or with status {@code 400 (Bad Request)} if the facilities has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/facilities")
    public ResponseEntity<Facilities> createFacilities(@RequestBody Facilities facilities) throws URISyntaxException {
        log.debug("REST request to save Facilities : {}", facilities);
        if (facilities.getId() != null) {
            throw new BadRequestAlertException("A new facilities cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Facilities result = facilitiesRepository.save(facilities);
        return ResponseEntity.created(new URI("/api/facilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /facilities} : Updates an existing facilities.
     *
     * @param facilities the facilities to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated facilities,
     * or with status {@code 400 (Bad Request)} if the facilities is not valid,
     * or with status {@code 500 (Internal Server Error)} if the facilities couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/facilities")
    public ResponseEntity<Facilities> updateFacilities(@RequestBody Facilities facilities) throws URISyntaxException {
        log.debug("REST request to update Facilities : {}", facilities);
        if (facilities.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Facilities result = facilitiesRepository.save(facilities);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, facilities.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /facilities} : get all the facilities.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of facilities in body.
     */
    @GetMapping("/facilities")
    public List<Facilities> getAllFacilities() {
        log.debug("REST request to get all Facilities");
        return facilitiesRepository.findAll();
    }

    /**
     * {@code GET  /facilities/:id} : get the "id" facilities.
     *
     * @param id the id of the facilities to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the facilities, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/facilities/{id}")
    public ResponseEntity<Facilities> getFacilities(@PathVariable Long id) {
        log.debug("REST request to get Facilities : {}", id);
        Optional<Facilities> facilities = facilitiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(facilities);
    }

    /**
     * {@code DELETE  /facilities/:id} : delete the "id" facilities.
     *
     * @param id the id of the facilities to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/facilities/{id}")
    public ResponseEntity<Void> deleteFacilities(@PathVariable Long id) {
        log.debug("REST request to delete Facilities : {}", id);
        facilitiesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
