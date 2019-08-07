package pl.valueadd.repository;

import pl.valueadd.domain.Facilities;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Facilities entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacilitiesRepository extends JpaRepository<Facilities, Long> {

}
