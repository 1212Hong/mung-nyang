package com.mung.mung.db.repository;

import com.mung.mung.db.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    Quiz findQuizById(Long id);

}
