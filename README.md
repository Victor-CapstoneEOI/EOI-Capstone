# Digitalization of Evidence of Insurability Form

## Description
> [!IMPORTANT]
***Capstone project for UST-Xpanxion / MMC SIU April - Sep 2023***

This project is dedicated to enhancing the overall user experience when completing the Evidence of Insurability form (EOI). The EOI is a critical application process, typically undertaken by new employees within an organization, where individuals provide vital health-related information, both for themselves and their dependents. This information is essential for evaluating eligibility for specific insurance coverage.

Presently, the client employs a rudimentary paper-based EOI form, distributed via traditional mail or email, with subsequent transmission to the insurance company. However, the simplicity of this form often necessitates follow-up communication by the insurance company to gather additional information.

By digitizing this EOI form, our aim is to significantly streamline and expedite the entire process for all stakeholders involved.

> [!NOTE]
> It's worth noting that the current EOI form comprises 26 primary questions and an extensive set of over 400 follow-up inquiries. While our central objective is the seamless integration of this form into an existing application, we have also created a dedicated homepage and profile page to facilitate user interaction in the current context.


## Technologies
+ MongoDB
+ Express
+ React
+ Node
  ### Libraries
  + Material UI
  + Json Forms
  + PDF lib


## Installing and Running the Project
>  [!WARNING]
> Some dependencies need to be updated

- Clone project from github repository ```git clone <link>```
- Execute ```npm i --force``` to install dependencies 
- To run project execute ```npm run dev``` 

## Scope of the Project

+ User is able to answer all questions from EOI form.
+ Data will be saved automatically to the data base as user goes thought the questions.
+ Before finilizing the form, user can edit previous sections by clicking on the edit buttons in the review page.
+ Form will not be submited if user doesn't provide a signature.
+ User will get a PDF with the information provided in the form.

## Release Notes (Version 2)
+ User will have the option to pick language of preference (English or French)
+ User's response validation.
+ Make code more dynamic for future implementation with different forms.

## The Team
+ [Leonard Mercedes](https://github.com/LMercedes03)
+ [Imane Allay](https://github.com/imaneAllay)
+ [Karina Velasquez](https://github.com/velask9)
+ [Valerie Perez](https://github.com/Valpe-24)
+ [Melissa Schaefer](https://github.com/mel-devops)
