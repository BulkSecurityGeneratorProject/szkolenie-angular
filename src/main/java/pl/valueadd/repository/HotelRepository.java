package pl.valueadd.repository;

import pl.valueadd.domain.Hotel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Hotel entity.
 */
@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

    @Query(value = "select distinct hotel from Hotel hotel left join fetch hotel.rooms",
        countQuery = "select count(distinct hotel) from Hotel hotel")
    Page<Hotel> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct hotel from Hotel hotel left join fetch hotel.rooms")
    List<Hotel> findAllWithEagerRelationships();

    @Query("select hotel from Hotel hotel left join fetch hotel.rooms where hotel.id =:id")
    Optional<Hotel> findOneWithEagerRelationships(@Param("id") Long id);

}
