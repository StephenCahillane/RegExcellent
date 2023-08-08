package org.wcci.regexcellent;

import static org.hamcrest.Matchers.hasKey;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.hateoas.MediaTypes;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.transaction.annotation.Transactional;

import org.wcci.regexcellent.entities.Question;
import org.wcci.regexcellent.restControllers.QuestionRestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles(value = "test")
@Transactional()
public class QuestionRestControllerTest extends HateoasHelper {
        private static final String QUESTION_LIST = "questionList";

        final private static Logger logger = LoggerFactory.getLogger(QuestionRestControllerTest.class);

        @Autowired
        private MockMvc mvc;

        @Test
        public void testGetQuestions() throws Exception {
                final MvcResult getAllResult = this.mvc.perform(MockMvcRequestBuilders.get("/api/questions")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                // And extract the object from the result
                final List<Question> resultObject = extractEmbeddedList(getAllResult, QUESTION_LIST,
                                Question.class);

                // Then the resulting list should contain no activities
                assertEquals(0, resultObject.size());

                this.mvc.perform(MockMvcRequestBuilders.get("/api/questions/9999999")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isNotFound());
        }

        @Test
        public void testCreateNewQuestion() throws Exception {
                Question question = new Question("Spikes");

                final MvcResult postResult = this.mvc
                                .perform(MockMvcRequestBuilders.post("/api/questions")
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(question)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey(QuestionRestController.LIST_ALL_QUESTIONS)))
                                .andReturn();

                final MvcResult getAllResult = this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get(extractLink(postResult,
                                                                QuestionRestController.LIST_ALL_QUESTIONS))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                final List<Question> resultObject = extractEmbeddedList(getAllResult, QUESTION_LIST,
                                Question.class);

                assertEquals(1, resultObject.size());

                final Question createdQuestion = new ObjectMapper().readValue(
                                postResult.getResponse().getContentAsString(),
                                Question.class);

                createdQuestion.setName("ModifiedName");
                final MvcResult updateResult = this.mvc
                                .perform(MockMvcRequestBuilders.put("/api/questions/" + createdQuestion.getQuestionId())
                                                .contentType(MediaType.APPLICATION_JSON) 
                                                .content(new ObjectMapper().writeValueAsString(createdQuestion))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals(createdQuestion.getName(),
                                new ObjectMapper().readValue(
                                                updateResult.getResponse().getContentAsString(),
                                                Question.class)
                                                .getName());

                final MvcResult secondGetResult = this.mvc
                                .perform(MockMvcRequestBuilders.get("/api/questions/" + createdQuestion.getQuestionId())
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals("ModifiedName",
                                new ObjectMapper().readValue(secondGetResult.getResponse().getContentAsString(),
                                                Question.class).getName());
        }

        @Test
        public void testDeleteQuestion() throws Exception {
                final String endpoint1 = "/api/questions";
                final String endpoint2 = "/api/questions/";

                Question question = new Question("Quicksand");

                MvcResult newDog = this.mvc
                                .perform(MockMvcRequestBuilders.post(endpoint1)
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(question)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey("listAllQuestions")))
                                .andReturn();

                int retrievedQuestionId = JsonPath.read(newDog.getResponse().getContentAsString(), "$.questionId");

                this.mvc.perform(MockMvcRequestBuilders.delete(endpoint2 + retrievedQuestionId)
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                this.mvc.perform(MockMvcRequestBuilders.get(endpoint2 + retrievedQuestionId))
                                .andExpect(status().isNotFound())
                                .andReturn();
        }

}
