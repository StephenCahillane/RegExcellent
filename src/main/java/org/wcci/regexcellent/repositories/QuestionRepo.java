package org.wcci.regexcellent.repositories;
import org.springframework.data.repository.CrudRepository;
import org.wcci.regexcellent.entities.Question;


public interface QuestionRepo extends CrudRepository<Question, Long> {}
