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

import org.wcci.adjrvirtualpet.entities.Question;
import org.wcci.adjrvirtualpet.restControllers.ShelterRestController;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles(value = "test")
@Transactional()
public class ShelterRestControllerTest extends HateoasHelper {
        private static final String ORGANIC_DOG_LIST = "organicDogList";
        private static final String ORGANIC_CAT_LIST = "organicCatList";
        private static final String ORGANIC_SHELTER_LIST = "organicShelterList";

        final private static Logger logger = LoggerFactory.getLogger(ShelterRestControllerTest.class);

        @Autowired
        private MockMvc mvc;

        @Test
        public void testGetOrganicDogs() throws Exception {
                final MvcResult getAllResult = this.mvc.perform(MockMvcRequestBuilders.get("/api/organicDogs")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                // And extract the object from the result
                final List<OrganicDog> resultObject = extractEmbeddedList(getAllResult, ORGANIC_DOG_LIST,
                                OrganicDog.class);

                // Then the resulting list should contain no activities
                assertEquals(0, resultObject.size());

                this.mvc.perform(MockMvcRequestBuilders.get("/api/organicDogs/9999999")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isNotFound());

                logger.info("You got dogs, big dog!");
        }

        @Test
        public void testGetOrganicCats() throws Exception {
                final MvcResult getAllResult = this.mvc.perform(MockMvcRequestBuilders.get("/api/organicCats")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                // And extract the object from the result
                final List<OrganicCat> resultObject = extractEmbeddedList(getAllResult, ORGANIC_CAT_LIST,
                                OrganicCat.class);

                // Then the resulting list should contain no activities
                assertEquals(0, resultObject.size());

                this.mvc.perform(MockMvcRequestBuilders.get("/api/organicCats/9999999")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isNotFound());

        }

        @Test
        public void testCreateNewOrganicDog() throws Exception {
                OrganicDog dog = new OrganicDog("Phil");

                // If I add a dog
                final MvcResult postResult = this.mvc
                                .perform(MockMvcRequestBuilders.post("/api/organicDogs")
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(dog)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey(ShelterRestController.LIST_ALL_ORGANIC_DOGS)))
                                .andReturn();

                // And then ask for all organic dogs
                final MvcResult getAllResult = this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get(extractLink(postResult,
                                                                ShelterRestController.LIST_ALL_ORGANIC_DOGS))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                // And extract the object from the result
                final List<OrganicDog> resultObject = extractEmbeddedList(getAllResult, ORGANIC_DOG_LIST,
                                OrganicDog.class);

                assertEquals(1, resultObject.size());

                final OrganicDog createdDog = new ObjectMapper().readValue(
                                postResult.getResponse().getContentAsString(),
                                OrganicDog.class);

                createdDog.setName("ModifiedName");
                final MvcResult updateResult = this.mvc
                                .perform(MockMvcRequestBuilders.put("/api/organicDogs/" + createdDog.getPetID())
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(createdDog))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals(createdDog.getName(),
                                new ObjectMapper().readValue(
                                                updateResult.getResponse().getContentAsString(),
                                                OrganicDog.class)
                                                .getName());

                // Checking that the database remembers the change

                final MvcResult secondGetResult = this.mvc
                                .perform(MockMvcRequestBuilders.get("/api/organicDogs/" + createdDog.getPetID())
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals("ModifiedName",
                                new ObjectMapper().readValue(secondGetResult.getResponse().getContentAsString(),
                                                OrganicDog.class).getName());
        }

        @Test
        public void testCreateNewOrganicCat() throws Exception {
                OrganicCat cat = new OrganicCat("Makaveli");

                final MvcResult postResult = this.mvc
                                .perform(MockMvcRequestBuilders.post("/api/organicCats")
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(cat)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey(ShelterRestController.LIST_ALL_ORGANIC_CATS)))
                                .andReturn();

                final MvcResult getAllResult = this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get(extractLink(postResult,
                                                                ShelterRestController.LIST_ALL_ORGANIC_CATS))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                final List<OrganicCat> resultObject = extractEmbeddedList(getAllResult, ORGANIC_CAT_LIST,
                                OrganicCat.class);

                assertEquals(1, resultObject.size());

                final OrganicCat createdCat = new ObjectMapper().readValue(
                                postResult.getResponse().getContentAsString(),
                                OrganicCat.class);

                createdCat.setName("ModifiedName");
                final MvcResult updateResult = this.mvc
                                .perform(MockMvcRequestBuilders.put("/api/organicCats/" + createdCat.getPetID())
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(createdCat))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals(createdCat.getName(),
                                new ObjectMapper().readValue(
                                                updateResult.getResponse().getContentAsString(),
                                                OrganicCat.class)
                                                .getName());

                final MvcResult secondGetResult = this.mvc
                                .perform(MockMvcRequestBuilders.get("/api/organicCats/" + createdCat.getPetID())
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals("ModifiedName",
                                new ObjectMapper().readValue(secondGetResult.getResponse().getContentAsString(),
                                                OrganicCat.class).getName());
        }

        @Test
        public void testDeleteOrganicDog() throws Exception {
                final String endpoint1 = "/api/organicDogs";
                final String endpoint2 = "/api/organicDogs/";

                OrganicDog dog = new OrganicDog("Iggy");

                // Add an organic dog
                MvcResult newDog = this.mvc
                                .perform(MockMvcRequestBuilders.post(endpoint1)
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(dog)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey("listAllOrganicDogs")))
                                .andReturn();

                int retrievedDogId = JsonPath.read(newDog.getResponse().getContentAsString(), "$.petID");

                this.mvc.perform(MockMvcRequestBuilders.delete(endpoint2 + retrievedDogId)
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                this.mvc.perform(MockMvcRequestBuilders.get(endpoint2 + retrievedDogId))
                                .andExpect(status().isNotFound())
                                .andReturn();
        }

        @Test
        public void testDeleteOrganicCat() throws Exception {
                final String endpoint1 = "/api/organicCats";
                final String endpoint2 = "/api/organicCats/";

                OrganicCat cat = new OrganicCat("Makaveli");

                // Add an organic cat
                MvcResult newCat = this.mvc
                                .perform(MockMvcRequestBuilders.post(endpoint1)
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(cat)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey("listAllOrganicCats")))
                                .andReturn();

                int retrievedCatId = JsonPath.read(newCat.getResponse().getContentAsString(), "$.petID");

                this.mvc.perform(MockMvcRequestBuilders.delete(endpoint2 + retrievedCatId)
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                this.mvc.perform(MockMvcRequestBuilders.get(endpoint2 + retrievedCatId))
                                .andExpect(status().isNotFound())
                                .andReturn();
        }

        @Test
        public void testGetOrganicShelter() throws Exception {
                final MvcResult getAllResult = this.mvc.perform(MockMvcRequestBuilders.get("/api/organicShelters")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                // And extract the object from the result
                final List<OrganicShelter> resultObject = extractEmbeddedList(getAllResult, ORGANIC_SHELTER_LIST,
                                OrganicShelter.class);

                // Then the resulting list should contain no activities
                assertEquals(0, resultObject.size());

                this.mvc.perform(MockMvcRequestBuilders.get("/api/organicShelters/99999")
                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isNotFound());

                logger.info("You got a shelter, big shelter!");
        }

        @Test
        public void testCreateNewOrganicShelter() throws Exception {
                OrganicShelter pound = new OrganicShelter();
                pound.setName("Ye olde dog pound");

                final MvcResult postResult = this.mvc
                                .perform(MockMvcRequestBuilders.post("/api/organicShelters")
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(pound)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links",
                                                hasKey(ShelterRestController.LIST_ALL_ORGANIC_SHELTERS)))
                                .andReturn();

                final MvcResult getAllResult = this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get(extractLink(postResult,
                                                                ShelterRestController.LIST_ALL_ORGANIC_SHELTERS))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                final List<OrganicShelter> resultObject = extractEmbeddedList(getAllResult, ORGANIC_SHELTER_LIST,
                                OrganicShelter.class);

                assertEquals(1, resultObject.size());

                final OrganicShelter createdShelter = new ObjectMapper().readValue(
                                postResult.getResponse().getContentAsString(),
                                OrganicShelter.class);

                createdShelter.setName("ModifiedName");
                final MvcResult updateResult = this.mvc
                                .perform(MockMvcRequestBuilders
                                                .put("/api/organicShelters/" + createdShelter.getShelterID())
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(createdShelter))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals(createdShelter.getName(),
                                new ObjectMapper().readValue(
                                                updateResult.getResponse().getContentAsString(),
                                                OrganicShelter.class)
                                                .getName());

                final MvcResult secondGetResult = this.mvc
                                .perform(MockMvcRequestBuilders
                                                .get("/api/organicShelters/" + createdShelter.getShelterID())
                                                .contentType(MediaType.APPLICATION_JSON)
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();
                assertEquals("ModifiedName",
                                new ObjectMapper().readValue(secondGetResult.getResponse().getContentAsString(),
                                                OrganicShelter.class).getName());
        }

        @Test
        public void testPutOrganicDogInShelter() throws Exception {
                OrganicDog dog = new OrganicDog("Phil");
                OrganicShelter shelter = new OrganicShelter("Big Town");

                // If I add a dog
                final MvcResult dogPostResult = this.mvc
                                .perform(MockMvcRequestBuilders.post("/api/organicDogs")
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(dog)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey(ShelterRestController.LIST_ALL_ORGANIC_DOGS)))
                                .andReturn();

                final OrganicDog dogResultObject = this.extractObject(OrganicDog.class, dogPostResult);

                final MvcResult getAllDogsResult = this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get(extractLink(dogPostResult,
                                                                ShelterRestController.LIST_ALL_ORGANIC_DOGS))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                final List<OrganicDog> allDogs = extractEmbeddedList(getAllDogsResult, ORGANIC_DOG_LIST, OrganicDog.class);

                // Then the resulting list should contain a dog
                assertEquals(1, allDogs.size());

                // If I add a shelter
                final MvcResult shelterPostResult = this.mvc
                                .perform(MockMvcRequestBuilders.post("/api/organicShelters")
                                                .accept(MediaTypes.HAL_JSON)
                                                .contentType(MediaType.APPLICATION_JSON) // I'm a program and sending
                                                                                         // you JSON-encoded data
                                                .content(new ObjectMapper().writeValueAsString(shelter)))
                                .andExpect(status().isOk())
                                .andExpect(content().contentTypeCompatibleWith(MediaTypes.HAL_JSON))
                                .andExpect(jsonPath("$._links", hasKey("self")))
                                .andExpect(jsonPath("$._links", hasKey(ShelterRestController.LIST_ALL_ORGANIC_SHELTERS)))
                                .andReturn();

                final MvcResult getAllSheltersResult = this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get(extractLink(shelterPostResult,
                                                                ShelterRestController.LIST_ALL_ORGANIC_SHELTERS))
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                final OrganicShelter shelterResultObject = this.extractObject(OrganicShelter.class, shelterPostResult);

                // Then the resulting list should contain a shelter
                assertEquals(1, this.extractEmbeddedList(getAllSheltersResult, ORGANIC_SHELTER_LIST, OrganicShelter.class).size());


                // And then put the dog in a shelter
                this.mvc.perform(
                                MockMvcRequestBuilders
                                                .put("/api/organicShelters/" + shelterResultObject.getShelterID() + "/organicDogs/" + dogResultObject.getPetID())
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                // And extract the object from the result
                this.mvc.perform(
                                MockMvcRequestBuilders
                                                .get("/api/organicShelters/" + shelterResultObject.getShelterID())
                                                .accept(MediaTypes.HAL_JSON))
                                .andExpect(status().isOk())
                                .andReturn();

                final OrganicShelter createdShelter = new ObjectMapper().readValue(
                                shelterPostResult.getResponse().getContentAsString(),
                                OrganicShelter.class);

                assertEquals(1, createdShelter.getDogCount());
        }
}
