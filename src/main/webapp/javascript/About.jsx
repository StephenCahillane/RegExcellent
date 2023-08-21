import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";

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
          and when you encounter a trap answer the question.
        </p>
        <h1>About our Team</h1>
        <p>
          We have worked together ove the course of the last three week in order
          to deliver this project. Through these last three weeks we have
          learned the value of working as a team and effective communication.
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
          Git/Github, Agile workflow.
        </p>
      </section>
    </div>
  );
}
