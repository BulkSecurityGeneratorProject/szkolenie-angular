package pl.valueadd.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "capacity")
    private Integer capacity;

    @OneToMany(mappedBy = "room")
    private Set<Price> prices = new HashSet<>();

    @ManyToMany(mappedBy = "rooms")
    @JsonIgnore
    private Set<Hotel> hotels = new HashSet<>();

    @ManyToMany(mappedBy = "rooms")
    @JsonIgnore
    private Set<Booking> bookings = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public Room number(Integer number) {
        this.number = number;
        return this;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public Room capacity(Integer capacity) {
        this.capacity = capacity;
        return this;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Set<Price> getPrices() {
        return prices;
    }

    public Room prices(Set<Price> prices) {
        this.prices = prices;
        return this;
    }

    public Room addPrice(Price price) {
        this.prices.add(price);
        price.setRoom(this);
        return this;
    }

    public Room removePrice(Price price) {
        this.prices.remove(price);
        price.setRoom(null);
        return this;
    }

    public void setPrices(Set<Price> prices) {
        this.prices = prices;
    }

    public Set<Hotel> getHotels() {
        return hotels;
    }

    public Room hotels(Set<Hotel> hotels) {
        this.hotels = hotels;
        return this;
    }

    public Room addHotel(Hotel hotel) {
        this.hotels.add(hotel);
        hotel.getRooms().add(this);
        return this;
    }

    public Room removeHotel(Hotel hotel) {
        this.hotels.remove(hotel);
        hotel.getRooms().remove(this);
        return this;
    }

    public void setHotels(Set<Hotel> hotels) {
        this.hotels = hotels;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Room bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Room addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.getRooms().add(this);
        return this;
    }

    public Room removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.getRooms().remove(this);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Room)) {
            return false;
        }
        return id != null && id.equals(((Room) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", number=" + getNumber() +
            ", capacity=" + getCapacity() +
            "}";
    }
}
