import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/Portal.css";
import "../../styles/OurPractice.css";
import Footer from "../../components/Footer";
import IndexResponsiveSidebar from "../../components/IndexResponsiveSidebar";

function Profile({ name, title, photo, sections }) {
  return (
    <div className="dentist-profile">
      <img src={photo} alt={name} className="dentist-photo" />
      <div className="dentist-info">
        <h3>{name}, {title}</h3>
        {sections.map((sec, idx) => (
          <div key={idx} className="dentist-section">
            <h4>{sec.heading}</h4>
            <p>{sec.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function OurPractice() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="main-container page-fade">
      <header className="top-header">
        <div className="clinic-name">San Diego Dental Studio</div>
        <button className="portal-button" onClick={() => navigate("/login")}>
          Enter Portal
        </button>
      </header>

      <IndexResponsiveSidebar activePage="our-practice" />

      <section className="content-section">
      <h2>About Our Practice</h2>
        <p>
          San Diego Dental Studio provides comprehensive, patient-centered care in the Sorrento Valley area. Led by Dr. Tom Bierman and Dr. Quan Ma, our team focuses on both preventive and restorative dentistry to support long-term oral health.
        </p>
        <p>
          We emphasize early intervention and education: routine cleanings, thorough exams, and detailed screenings are the foundation of our approach. When treatment is necessary, we develop individualized plans that prioritize comfort, function, and aesthetics.
        </p>
        <p>
          Our office adheres to the latest sterilization and safety protocols set by the ADA, CDC, and OSHA. Every member of our clinical team participates in ongoing training to stay current with emerging techniques and technologies.
        </p>
        <p>
          We understand that visiting the dentist can be stressful. That’s why we strive to create a calm, welcoming environment where patients feel supported and empowered throughout their care.
        </p>
        <p className="italics">Our goal is simple: to help you maintain a healthy, confident smile; and make sure you feel good about it every step of the way.</p>
      </section>

      
      <section className="provider-section">

        <Profile
          name="Dr. Tom Bierman"
          title="DDS"
          photo="/media/Thomas.jpg"
          sections={[
            {
              heading: "Dental Experience",
              text: "Dr. Tom Bierman earned his DDS from the University of Iowa and began his career in Washington D.C., working with one of the region’s largest dental group practices. He has completed hundreds of hours of continuing education, participated in international dental mission trips, and currently serves as a volunteer clinical instructor at UCSD’s student-run free clinic, where he mentors pre-dental students and provides care to underserved communities."
            },
            {
              heading: "Dental Services",
              text: "Dr. Bierman provides our office with knowledge in a wide range of services, including root canals, dentures, and Invisalign®. He helps us provide more comprehensive care in one convenient place for our patients."
            },
            {
              heading: "Hobbies",
              text: "In his free time Dr. Bierman enjoys traveling, playing ice hockey, reading and exploring the outdoors of California."
            }
          ]}
        />

        <Profile
          name="Dr. Quan Ma"
          title="DMD"
          photo="/media/Quan.jpg"
          sections={[
            {
              heading: "Dental Experience",
              text: "Dr. Quan Ma comes to us from the East Coast, earning his undergraduate degree at Gettysburg College and his DMD at Temple University in Philadelphia in 2007. After graduating, Dr. Ma began his career working in the Washington DC area while focusing on continuing education, taking 700 hours of classes in all elements of dentistry, including comprehensive courses at the University of Medicine and Dentistry of New Jersey and the University of Oregon."
            },
            {
              heading: "Dental Services",
              text: "Dr. Ma is a member of the San Diego Dental Society, California Dental Association, American Dental Association, and the Academy of General Dentistry. Dr. Ma is enjoying the beautiful surroundings that San Diego has to offer, he enjoys staying active outside including hiking, scuba, and hopefully surfing."
            },
            {
              heading: "Hobbies",
              text: "Dr. Ma is a strong advocate of volunteering and loves giving back to the community. He has done dental mission trips to Costa Rica, Nicaragua, the Dominican Republic, and looks forward to many more in the future. Dr. Ma also stays active in the community as a member of the San Diego Coastal Rotary Club. Dr Ma recently took a volunteer appointment at University California at San Diego as Voluntary Clinical Instructor in Family Medicine and Public Health. In this position he will be working in the Pre Dental Society's student run free dental clinic He is excited for the opportunity to help future dentists learn the practice of dentistry and provide care to low income patients in San Diego."
            }
          ]}
        />
          
          <Profile
          name="Carla"
          title="Office Manager"
          photo="/media/Carla.jpg"
          sections={[
            {
              text: "Carla's main goal in our office is to help you feel comfortable and confident that you have found your lifelong dentists here. Her experience includes over 30 years in the dental field. Carla originally started her career as a Registered Dental Assistant but soon began helping in all areas of the office, including working as the doctor's main assistant, performing all the front office duties, insurance, scheduling, and treatment presentation. Carla is a native to San Diego. She has two wonderful sons and a beautiful new granddaughter. She is also a die-hard Chargers fan."
            }
          ]}
        />

        <Profile
          name="April"
          title="Registered Dental Hygienist"
          photo="/media/April.jpg"
          sections={[
            {
              text: "April was born and raised in San Diego and has been working in dentistry since 2000. April has many interests including travel (especially to Vietnam), face painting, and hanging out with family & friends. April has two great dogs, a Siberian husky and a t-cup Chihuahua. April is a big San Diego sports fan; she loves the Chargers, Padres & Aztecs. April loves to have the ability to brighten smiles every day."
            }
          ]}
        />
        <Profile
          name="Payal"
          title="Registered Dental Hygienist"
          photo="/media/Payal.jpg"
          sections={[
            {
              text: "Payal has been in dentistry since 2009. She is a foreign-trained dentist, who received her education from a dental school in India. Since moving to California in 2014, she has continued her work in dentistry driven by a passion for education and the creation of a beautiful healthy smile. Painting, crafting, traveling, cooking and enjoying the beautiful California scenery are some of her favorite hobbies. If she did not choose a career in dentistry she would have pursued her love for art."
            }
          ]}
        />

        <Profile
          name="Mona"
          title="Registered Dental Hygienist"
          photo="/media/Mona.jpg"
          sections={[
            {
              text: "Mona was born in San Diego and grew up in North Carolina until she moved back as a teenager. She graduated from UC Santa Cruz with a Bachelors of Science in Marine Biology. She worked as a research associate in a tissue culture lab for 3 years until she decided to pursue a career in the dental field. She graduated valedictorian of her Registered Dental Assistant class and top of her Dental Hygiene program at Concorde. She finds it most rewarding to positively contribute to her patients' overall dental experiences. Mona loves to read, practice yoga, go to the gym, play the piano, spend time in nature, listen to live music, and travel. She has been to Australia, Thailand, Vietnam, Iceland, Bali, Singapore, Costa Rica, England, and Mexico. Her goal is to travel to at least one new country each year!"
            }
          ]}
        />
        <Profile
          name="Stacey"
          title="Registered Dental Hygienist"
          photo="/media/Stacey.jpg"
          sections={[
            {
              text: "Stacey has been in dentistry for 28 years and 18 of those here in this office. As you can see, she is dedicated to her work. Dentistry is always changing and improving, and she loves the advances in technology and learning new things. Stacey enjoys taking care of others. If not at the office, then she's at home spending time with her husband and son. Her family enjoys watching most sports especially football (Go Chargers!). If Stacey's not doing something with the family you will always catch her reading a book somewhere."
            }
          ]}
        />

        <Profile
          name="Daisy"
          title="Registered Dental Hygienist"
          photo="/media/Daisy.jpg"
          sections={[
            {
              text: "Daisy has been in dentistry since 2012. She started her dental career working in the front office but later transitioned to working as a Registered Dental Assistant. Daisy has a gift for connecting with patients and is particularly good at soothing anxious patients. She treats our patients like they are her own family members. She understands coming to the dentist can be difficult so she is dedicated to go the extra mile to accommodate your visit and make it as stress free as possible. Daisy moved to San Diego from Imperial Valley with her husband. In her free time she enjoys spending quality time with her 2 dogs and family exploring San Diego."
            }
          ]}
        />

      <Profile
          name="Rikki"
          title="Registered Dental Hygienist"
          photo="/media/Rikki.jpg"
          sections={[
            {
              text: "Rikki has worked in various aspects of dentistry for many years as an assistant and also a teacher. As a dedicated professional, she draws on her teaching background to educate patients about how to optimize oral health. Originally from Sweden, she has lived in San Diego since 1984. The perfect weekend is spent with family and friends outdoors either, hiking, biking, or water sports. She enjoys art, literature, music, and dance. An avid traveler, she loves to explore new places, cultures, and food, and is a self-described 'Foodie.' Curious by nature, she continues to add places, experiences, and restaurants to her Fun File."
            }
          ]}
        />

        
      </section>

      <Footer />
    </div>
  );
}

export default OurPractice;
