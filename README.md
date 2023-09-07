# Digitalization of Evidence of Insurability Form

## Description

***Capstone project for UST-Xpanxion / MMC SIU April - Sep 2023***

This project focuses on enhancing the user experience when filling out the Evidence of Insurability form (EOI). 

EOI is an application process through which the user, usually a new employee in a company, provides information on the condition of their health or their dependent's health in order to be considered for certain types of insurance coverage. The primary objective is to assess the feasibility of providing insurance coverage for the user.

Currently, the form been used by the client is a simple paper-based form that is mailed or emailed to the user, the form then will be pass to the insurance company. Because the form is oversimplified the insurance company must follow up with the user to obtain aditional information. 

With the digitalization of this form we are making the process more efficient and less time consumign for all parties envolve.

At this time the form contains 26 main questions and more than 400 follow up questions. 

While the primary goal of this project is the integration of this form into an existing application, for the context current context, a dedicated homepage and profile page were created.

## Technologies

The project was created as a MERN application, and to simplify the dynamic rendering of the forms we used the Json forms library, Material UI was used to assist with the styling of the pages, and PDF lib was use to provided the user with a final copy of the information they are providing.  


## Installing and Running the Project

- Clone project from github repository ```git clone <link>```
- Execute ```npm i --force``` to install dependencies (some dependencies need to be updated)
- To run project execute ```npm run dev``` 

## Functionality

+ User is able to answer all questions from EOI form
+ Data will be saved automatically to the data base as user goes thought the questions.
+ Before finilizing the form, user can edit previous sections by clicking on the edit buttons in the review page
+ Form will not be submited if user doesn't provide a signature.
+ User will get a PDF with the information provided in the form. 
