package pl.valueadd.domain;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Hotel.
 */
@Entity
@Table(name = "hotel")
public class Hotel implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @OneToMany(mappedBy = "hotel")
    private Set<Facalities> facalities = new HashSet<>();

    @OneToMany(mappedBy = "hotel")
    private Set<Room> rooms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Hotel name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public Hotel location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Set<Facalities> getFacalities() {
        return facalities;
    }

    public Hotel facalities(Set<Facalities> facalities) {
        this.facalities = facalities;
        return this;
    }

    public Hotel addFacalities(Facalities facalities) {
        this.facalities.add(facalities);
        facalities.setHotel(this);
        return this;
    }

    public Hotel removeFacalities(Facalities facalities) {
        this.facalities.remove(facalities);
        facalities.setHotel(null);
        return this;
    }

    public void setFacalities(Set<Facalities> facalities) {
        this.facalities = facalities;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public Hotel rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public Hotel addRoom(Room room) {
        this.rooms.add(room);
        room.setHotel(this);
        return this;
    }

    public Hotel removeRoom(Room room) {
        this.rooms.remove(room);
        room.setHotel(null);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hotel)) {
            return false;
        }
        return id != null && id.equals(((Hotel) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Hotel{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", location='" + getLocation() + "'" +
            "}";
    }
}
