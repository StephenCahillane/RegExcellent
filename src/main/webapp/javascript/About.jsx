import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import "../css/style.css";

export default function About() {
  return (
    <div className="flex-container">
      <section className="container1">
        <h1>Team RegExcellent's Side Scroller Game!</h1>
        <img className="logo" src="/images/knight-logo.png" alt="Character Pic"></img>
        <h1>About The Game</h1>
        <p>
          This project is a mini-game where you move through side scroller while solving
          regular expression questions. These questions are prompted when
          encountering a trap space,so be careful! Simply let your character move 
          and when you encounter a trap answer the question. We implemented the viewport by using a basic
          column and row format. We then filled each cell with data such as the column the player is currently in,
          and trap cells that we populated with trapID's. These trap ID's are linked with specific pictures and questions 
          that will prompt when encountering teh trap cell. We used ReactSimple Animate to implement animations of the knight 
          walking in place, as well as CSS animate to make the movement between cells fluid.
        </p>
        <h1>About our Team</h1>
        <p>
          We have worked together over the course of the last three week in order
          to deliver this project. Through these last three weeks we have
          learned the value of working as a team and effective communication. Learned how to effectively 
          "divide & conquer" making it much easier to get a large scale project done. The use of a SCRUM board 
          was key to our organization efforts , which enabled us to have a cohesive story for each feature we wanted to add.
          Here are a few links to our individual portfolio pages!
        </p>
        <h2>Mckeon Campbell</h2>
        <p>
          <a href="http://mckeon-campbell.github.io/">
            <img className="social" src="/images/unnamed.jpg"></img>
          </a>
        </p>
        <h2>Jonah Young</h2>
        <p>
          <a href="https://jyoung128.github.io/">
            <img className="social" src="/images/headshot.jpg"></img>
          </a>
        </p>
        <h2>Stephen Cahillane</h2>
        <p>
          <a href="http://stephencahillane.github.io/">
            <img className="social" src="/images/profile-pic.jpg"></img>
          </a>
        </p>
        <h2>Kai Jamison</h2>
        <p>
          <a href="https://github.com/Kai-Jamison">
            <img className="social" src="/images/Kai.jpg"></img>
          </a>
        </p>
        <h2>Skills Used</h2>
        <p>
          Java with SpringBoot as well as HTML, CSS, JavaScript, and JSON. Also
          Git/Github, Agile workflow, ReactSimple Animate, as well as CSS animate.
        </p>
      </section>
    </div>
  );
}
