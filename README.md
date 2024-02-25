<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  
  <h2 align="center">Budget Buddy</h3>

  <p align="center">
    A web-based application that assists teams in managing their budgets, tracking their expenses, and processing reimbursements.
    <!--
    <br>
    <br>
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    -->
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#technologies">Technologies</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#setting-up-test-accounts">Setting Up Test Accounts</a></li>
        <li><a href="#running-the-app">Running the App</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project is a web application designed to streamline budget management, expense tracking, and reimbursement processing for teams. Its development stemmed from the realization that my church's ministries lack a centralised system for managing budgets and tracking expenses, hindering effective financial management and transparency within the church. 

As a result, volunteers often face difficulties accessing information about allocated budgets and the status of their reimbursement requests. Additionally, ministry leaders struggle to keep track of approved or rejected budget requests.

By centralizing these processes, we aim to improve transparency, efficiency, and accountability within the organization.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Technologies

* [![Next][Next.js]][Next-url]
* ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
* ![Chakra](https://img.shields.io/badge/chakra-%234ED1C5.svg?style=for-the-badge&logo=chakraui&logoColor=white)
* ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
* ![DigitalOcean](https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Set up Github Actions to test code on push to feature branches.
- [x] Set up Github Actions to build docker image and deploy to Digital Ocean on push to dev branch
- [x] Implemented user authentication
- [x] Allow users to reset their passwords via "Forgot my Password" 
- [x] Role-based user permissions
- [x] Invite New Users
- [x] Delete Users
- [x] Update User Roles
- [ ] Manage Budgets  ( <== Current ) 
  - [x] Create Budgets
  - [ ] Edit Budgets
  - [ ] Delete Budgets
  - [ ] Submit budget items
  - [ ] Approve budget items
  - [ ] Reject budget items
  - [ ] Delete budget items
- [ ] Manage Expenses
  - [ ] Submit an Expense
  - [ ] Reject an Expense
  - [ ] Fulfil an Expense
  - [ ] Delete an Expense
- [ ] Manage User Details
  - [ ] Update First name
  - [ ] Update Last Name
  - [ ] Update Email
  - [ ] Update Password
- [ ] Manage Bank Details
  - [ ] Create Bank Details
  - [ ] Delete Bank Details
- [ ] User Dashboard
  - [ ] See Pending budget items
  - [ ] See Pending expenses
  - [ ] See Announcments


See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

You'll need to install the Supabase CLI and setup a local instance of supabase using Docker. Follow these [instructions](https://supabase.com/docs/guides/cli/getting-started?platform=macos) to get started.

Once installed, run your local instance of Supabase and take note of its:
  - project url
  - anon key
  - service role key

These are displayed on your terminal after you start your local supabase instance.

### Installation

1. Clone the repo
   ```sh
   git clone git@github.com:alecntan/BudgetBuddy.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your project details in `.env.development`
   ```sh
   NEXT_PUBLIC_SUPABASE_URL = <PROJECT_URL>
   NEXT_PUBLIC_SUPABASE_ANON_KEY = <ANON_KEY>
   APP_DOMAIN = http://localhost:3000
   SERVICE_ROLE_KEY = <SERVICE_ROLE_KEY>
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Setting Up Test Accounts

The app is seeded with test accounts on startup. You can find these accounts in the `supabase/seed.sql` file.

### Running the App
1. Start Docker Desktop and run your local supabase instance
   
   ```sh
   supabase start
   ```
   
 2. Visit `http://localhost:3000`
 3. Login using the accounts found in `supabase/seed.sql` file

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the BSD 3-Clause License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
* [Best ReadMe Template](https://github.com/othneildrew/Best-README-Template/blob/master/README.md)
* [Markdown-Badgets](https://github.com/Ileriayo/markdown-badges)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
