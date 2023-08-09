package org.wcci.regexcellent.services;

import java.util.Optional;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import org.wcci.regexcellent.entities.Question;
import org.wcci.regexcellent.repositories.QuestionRepo;


@Service
/**
 * I contain the business logic for responding to API requests for
 * pet-related requests.
 */
public class QuestionService {
    final private static Logger logger = LoggerFactory.getLogger(QuestionService.class);
    final private QuestionRepo questionRepo;

    public QuestionService(
            @Autowired final QuestionRepo questionRepo) {
        this.questionRepo = questionRepo;
    }

    public Stream<Question> questionStream() {
        final Iterable<Question> questions = this.questionRepo.findAll();

        // Standard conversion from iterator to stream.
        return StreamSupport.stream(questions.spliterator(), false);
    }

    public Question findQuestion(final long question_id) {
        final Optional<Question> possiblyAQuestion = questionRepo.findById(question_id);
        if (!possiblyAQuestion.isPresent()) {
            logger.info("Question not found: " + question_id);
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found " + question_id);
        }
        return possiblyAQuestion.get();
    }

    public Question writeToDatabase(final Question question) {
        if (question.getName().contains("bad word"))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Sorry, cursing not allowed");

        return questionRepo.save(question);
    }


    public void deleteQuestionById(final long question_id) {
        if (!questionRepo.findById(question_id).isPresent())
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Question not found " + question_id);

        questionRepo.deleteById(question_id);
    }

    public Question updateQuestion(Question question, long question_id) {
        final Question databaseQuestion = findQuestion(question_id);

        if (question_id != databaseQuestion.getQuestionId())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Sorry, you may not change the question_id");

        // Copy the non-ID info from the request body to the database object
        databaseQuestion.setName(question.getName());
        databaseQuestion.setDescription(question.getDescription());
        databaseQuestion.setMatchWords(question.getMatchWords());
        databaseQuestion.setExclusionWords(question.getExclusionWords());

        // Ask the repo to write the modified student to MySQL (or whatever)
        writeToDatabase(databaseQuestion);

        return databaseQuestion;
    }
}

