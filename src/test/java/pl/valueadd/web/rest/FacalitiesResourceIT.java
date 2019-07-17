package pl.valueadd.web.rest;

import pl.valueadd.SzkolenieangularApp;
import pl.valueadd.domain.Facalities;
import pl.valueadd.repository.FacalitiesRepository;
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
 * Integration tests for the {@Link FacalitiesResource} REST controller.
 */
@SpringBootTest(classes = SzkolenieangularApp.class)
public class FacalitiesResourceIT {

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    @Autowired
    private FacalitiesRepository facalitiesRepository;

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

    private MockMvc restFacalitiesMockMvc;

    private Facalities facalities;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FacalitiesResource facalitiesResource = new FacalitiesResource(facalitiesRepository);
        this.restFacalitiesMockMvc = MockMvcBuilders.standaloneSetup(facalitiesResource)
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
    public static Facalities createEntity(EntityManager em) {
        Facalities facalities = new Facalities()
            .type(DEFAULT_TYPE);
        return facalities;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Facalities createUpdatedEntity(EntityManager em) {
        Facalities facalities = new Facalities()
            .type(UPDATED_TYPE);
        return facalities;
    }

    @BeforeEach
    public void initTest() {
        facalities = createEntity(em);
    }

    @Test
    @Transactional
    public void createFacalities() throws Exception {
        int databaseSizeBeforeCreate = facalitiesRepository.findAll().size();

        // Create the Facalities
        restFacalitiesMockMvc.perform(post("/api/facalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facalities)))
            .andExpect(status().isCreated());

        // Validate the Facalities in the database
        List<Facalities> facalitiesList = facalitiesRepository.findAll();
        assertThat(facalitiesList).hasSize(databaseSizeBeforeCreate + 1);
        Facalities testFacalities = facalitiesList.get(facalitiesList.size() - 1);
        assertThat(testFacalities.getType()).isEqualTo(DEFAULT_TYPE);
    }

    @Test
    @Transactional
    public void createFacalitiesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = facalitiesRepository.findAll().size();

        // Create the Facalities with an existing ID
        facalities.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFacalitiesMockMvc.perform(post("/api/facalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facalities)))
            .andExpect(status().isBadRequest());

        // Validate the Facalities in the database
        List<Facalities> facalitiesList = facalitiesRepository.findAll();
        assertThat(facalitiesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFacalities() throws Exception {
        // Initialize the database
        facalitiesRepository.saveAndFlush(facalities);

        // Get all the facalitiesList
        restFacalitiesMockMvc.perform(get("/api/facalities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(facalities.getId().intValue())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())));
    }
    
    @Test
    @Transactional
    public void getFacalities() throws Exception {
        // Initialize the database
        facalitiesRepository.saveAndFlush(facalities);

        // Get the facalities
        restFacalitiesMockMvc.perform(get("/api/facalities/{id}", facalities.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(facalities.getId().intValue()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFacalities() throws Exception {
        // Get the facalities
        restFacalitiesMockMvc.perform(get("/api/facalities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFacalities() throws Exception {
        // Initialize the database
        facalitiesRepository.saveAndFlush(facalities);

        int databaseSizeBeforeUpdate = facalitiesRepository.findAll().size();

        // Update the facalities
        Facalities updatedFacalities = facalitiesRepository.findById(facalities.getId()).get();
        // Disconnect from session so that the updates on updatedFacalities are not directly saved in db
        em.detach(updatedFacalities);
        updatedFacalities
            .type(UPDATED_TYPE);

        restFacalitiesMockMvc.perform(put("/api/facalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFacalities)))
            .andExpect(status().isOk());

        // Validate the Facalities in the database
        List<Facalities> facalitiesList = facalitiesRepository.findAll();
        assertThat(facalitiesList).hasSize(databaseSizeBeforeUpdate);
        Facalities testFacalities = facalitiesList.get(facalitiesList.size() - 1);
        assertThat(testFacalities.getType()).isEqualTo(UPDATED_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingFacalities() throws Exception {
        int databaseSizeBeforeUpdate = facalitiesRepository.findAll().size();

        // Create the Facalities

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFacalitiesMockMvc.perform(put("/api/facalities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(facalities)))
            .andExpect(status().isBadRequest());

        // Validate the Facalities in the database
        List<Facalities> facalitiesList = facalitiesRepository.findAll();
        assertThat(facalitiesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFacalities() throws Exception {
        // Initialize the database
        facalitiesRepository.saveAndFlush(facalities);

        int databaseSizeBeforeDelete = facalitiesRepository.findAll().size();

        // Delete the facalities
        restFacalitiesMockMvc.perform(delete("/api/facalities/{id}", facalities.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Facalities> facalitiesList = facalitiesRepository.findAll();
        assertThat(facalitiesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Facalities.class);
        Facalities facalities1 = new Facalities();
        facalities1.setId(1L);
        Facalities facalities2 = new Facalities();
        facalities2.setId(facalities1.getId());
        assertThat(facalities1).isEqualTo(facalities2);
        facalities2.setId(2L);
        assertThat(facalities1).isNotEqualTo(facalities2);
        facalities1.setId(null);
        assertThat(facalities1).isNotEqualTo(facalities2);
    }
}
