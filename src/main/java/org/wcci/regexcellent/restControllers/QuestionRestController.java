package org.wcci.regexcellent.restControllers;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import org.wcci.regexcellent.entities.Question;
import org.wcci.regexcellent.services.QuestionService;


@RestController
public class QuestionRestController {
    public static final String LIST_ALL_QUESTIONS = "listAllQuestions";

    final private QuestionService questionService;

    public QuestionRestController(@Autowired QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/api/questions")
    public CollectionModel<EntityModel<Question>> getQuestions() {
        List<EntityModel<Question>> questions = this.questionService.questionStream()
                .map(question -> EntityModel.of(question))
                .collect(Collectors.toList());
        return CollectionModel.of(questions);
    }

    @GetMapping("/api/questions/{question_id}")
    public EntityModel<Question> getQuestion(@PathVariable final Long question_id) {
        final Question question = questionService.findQuestion(question_id);
        return EntityModel.of(question,
                linkTo(methodOn(QuestionRestController.class).getQuestions()).withRel(LIST_ALL_QUESTIONS),
                linkTo(methodOn(QuestionRestController.class).getQuestion(question_id)).withSelfRel());
    }

    @PostMapping("/api/saveQuestions")
    public EntityModel<Question> newQuestion(@RequestBody final Question question) {
        return EntityModel.of(questionService.writeToDatabase(question),
                linkTo(methodOn(QuestionRestController.class).getQuestion(question.getQuestionId())).withSelfRel(),
                linkTo(methodOn(QuestionRestController.class).getQuestions()).withRel(LIST_ALL_QUESTIONS));
    }

    @DeleteMapping("/api/questions/{question_id}")
    public void deleteQuestion(@PathVariable long question_id) {
        questionService.deleteQuestionById(question_id);
    }

    // Talk to the Product Owner before changing this
    @DeleteMapping("/api/questions")
    public void deleteAllQuestions() {
        throw new ResponseStatusException(HttpStatus.FORBIDDEN);
    }

    @PutMapping("/api/questions/{question_id}")
    public EntityModel<Question> updateQuestion(
            @PathVariable final long question_id, // the name of the parameter (organicDog_id) must match
                                                    // "{organicDog_id}" in
                                                    // the line above
            @RequestBody final Question question) {
        // Update the organicDog if that is the right thing to do
        final Question databaseQuestion = questionService.updateQuestion(question, question_id);

        // Return the modified database organicDog
        return EntityModel.of(databaseQuestion,
                linkTo(methodOn(QuestionRestController.class).getQuestion(question.getQuestionId())).withSelfRel());
    }

}

