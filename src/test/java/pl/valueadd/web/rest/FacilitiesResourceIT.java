package pl.valueadd.web.rest;

import pl.valueadd.SzkolenieangularApp;
import pl.valueadd.domain.Facilities;
import pl.valueadd.repository.FacilitiesRepository;
import pl.valueadd.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static pl.valueadd.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link FacilitiesResource} REST controller.
 */
@SpringBootTest(classes = SzkolenieangularApp.class)
public class FacilitiesResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private FacilitiesRepository facilitiesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restFacilitiesMockMvc;

    private Facilities facilities;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacilitiesResource facilitiesResource = new FacilitiesResource(facilitiesRepository);
        this.restFacilitiesMockMvc = MockMvcBuilders.standaloneSetup(facilitiesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facilities createEntity(EntityManager em) {
        Facilities facilities = new Facilities()
            .type(DEFAULT_TYPE);
        return facilities;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facilities createUpdatedEntity(EntityManager em) {
        Facilities facilities = new Facilities()
            .type(UPDATED_TYPE);
        return facilities;
    }

    @BeforeEach
    public void initTest() {
        facilities = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacilities() throws Exception {
        int databaseSizeBeforeCreate = facilitiesRepository.findAll().size();

        // Create the Facilities
        restFacilitiesMockMvc.perform(post("/api/facilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilities)))
            .andExpect(status().isCreated());

        // Validate the Facilities in the database
        List<Facilities> facilitiesList = facilitiesRepository.findAll();
        assertThat(facilitiesList).hasSize(databaseSizeBeforeCreate + 1);
        Facilities testFacilities = facilitiesList.get(facilitiesList.size() - 1);
        assertThat(testFacilities.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createFacilitiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facilitiesRepository.findAll().size();

        // Create the Facilities with an existing ID
        facilities.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacilitiesMockMvc.perform(post("/api/facilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilities)))
            .andExpect(status().isBadRequest());

        // Validate the Facilities in the database
        List<Facilities> facilitiesList = facilitiesRepository.findAll();
        assertThat(facilitiesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacilities() throws Exception {
        // Initialize the database
        facilitiesRepository.saveAndFlush(facilities);

        // Get all the facilitiesList
        restFacilitiesMockMvc.perform(get("/api/facilities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facilities.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getFacilities() throws Exception {
        // Initialize the database
        facilitiesRepository.saveAndFlush(facilities);

        // Get the facilities
        restFacilitiesMockMvc.perform(get("/api/facilities/{id}", facilities.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(facilities.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFacilities() throws Exception {
        // Get the facilities
        restFacilitiesMockMvc.perform(get("/api/facilities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacilities() throws Exception {
        // Initialize the database
        facilitiesRepository.saveAndFlush(facilities);

        int databaseSizeBeforeUpdate = facilitiesRepository.findAll().size();

        // Update the facilities
        Facilities updatedFacilities = facilitiesRepository.findById(facilities.getId()).get();
        // Disconnect from session so that the updates on updatedFacilities are not directly saved in db
        em.detach(updatedFacilities);
        updatedFacilities
            .type(UPDATED_TYPE);

        restFacilitiesMockMvc.perform(put("/api/facilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacilities)))
            .andExpect(status().isOk());

        // Validate the Facilities in the database
        List<Facilities> facilitiesList = facilitiesRepository.findAll();
        assertThat(facilitiesList).hasSize(databaseSizeBeforeUpdate);
        Facilities testFacilities = facilitiesList.get(facilitiesList.size() - 1);
        assertThat(testFacilities.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFacilities() throws Exception {
        int databaseSizeBeforeUpdate = facilitiesRepository.findAll().size();

        // Create the Facilities

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacilitiesMockMvc.perform(put("/api/facilities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facilities)))
            .andExpect(status().isBadRequest());

        // Validate the Facilities in the database
        List<Facilities> facilitiesList = facilitiesRepository.findAll();
        assertThat(facilitiesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacilities() throws Exception {
        // Initialize the database
        facilitiesRepository.saveAndFlush(facilities);

        int databaseSizeBeforeDelete = facilitiesRepository.findAll().size();

        // Delete the facilities
        restFacilitiesMockMvc.perform(delete("/api/facilities/{id}", facilities.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Facilities> facilitiesList = facilitiesRepository.findAll();
        assertThat(facilitiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Facilities.class);
        Facilities facilities1 = new Facilities();
        facilities1.setId(1L);
        Facilities facilities2 = new Facilities();
        facilities2.setId(facilities1.getId());
        assertThat(facilities1).isEqualTo(facilities2);
        facilities2.setId(2L);
        assertThat(facilities1).isNotEqualTo(facilities2);
        facilities1.setId(null);
        assertThat(facilities1).isNotEqualTo(facilities2);
    }
}
