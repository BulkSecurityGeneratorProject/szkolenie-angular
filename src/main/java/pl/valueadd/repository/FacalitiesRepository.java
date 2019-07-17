package pl.valueadd.repository;

import pl.valueadd.domain.Facalities;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Facalities entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacalitiesRepository extends JpaRepository<Facalities, Long> {

}
