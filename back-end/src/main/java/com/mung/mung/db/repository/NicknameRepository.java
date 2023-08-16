package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Dog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NicknameRepository extends JpaRepository<Dog, Long> {
    Dog findByDogId(long dogId);

}
