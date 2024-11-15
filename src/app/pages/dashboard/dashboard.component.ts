import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true, // Make the component standalone
  imports: [CommonModule, FormsModule, RouterModule], // Import required modules here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  searchTerm: string = '';
  filteredCourses: any[] = [];

  courses = [
    {
      title: 'Web Development',
      image: 'https://t3.ftcdn.net/jpg/02/14/53/92/360_F_214539232_YnUrtuwUEt84gHuU0qG8l7OwZvH4rnPG.jpg',
      topics: [
        'Basics of HTML & CSS',
        'Core Concepts of JavaScript',
        'Designing for Responsive Web',
        'Server-Side Development with Node.js',
        'Deploying and Hosting Websites',
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false,
      showOverlay: false
    },

    {
      title: 'Cybersecurity',
      image: 'https://st4.depositphotos.com/22162388/23954/i/450/depositphotos_239549088-stock-photo-cyber-security-data-protection-information.jpg',
      topics: [
        'Network Security Essentials',
        'Data Encryption and Cryptography',
        'Identity and Access Management (IAM)',
        'Application Security and Vulnerability Management',
        'Incident Response and Threat Detection'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false,
      showOverlay: false
    },

    {
      title: 'Cloud Computing',
      image: 'https://www.shutterstock.com/image-photo/hand-holding-cloud-icon-computing-600nw-2470498283.jpg',
      
      topics: [
        'Foundations of Cloud Computing',
        'Cloud Service Types (Infrastructure, Platform, and Software as a Service)',
        'Virtualization and Cloud Architecture',
        'Securing Cloud Environments',
        'Strategies for Migrating to the Cloud'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false
    },

    {
      title: 'Mobile App Development',
      image: 'https://img.freepik.com/free-vector/app-development-banner_33099-1720.jpg',
      topics: [
        'Basics of Mobile App Development',
        'Creating User Interfaces with React Native',
        'Connecting APIs in Mobile Applications',
        'Data Management and Storage Options',
        'Releasing Apps on App Stores'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false
    },
    

    {
      title: 'UI/UX Design',
      image: 'https://img.freepik.com/free-vector/gradient-style-ui-ux-background_52683-69621.jpg?semt=ais_hybrid',
      topics: [
        'Foundations of UI/UX Design',
        'Conducting User Research and Developing Personas',
        'Using Wireframing and Prototyping Tools',
        'Applying Design Thinking and Focusing on User-Centered Design',
        'Performing Usability Testing and Incorporating User Feedback'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false
    },

    {
      title: 'Artificial Intelligence and Data Science (AIDS)',
      image: 'https://media.istockphoto.com/id/1452604857/photo/businessman-touching-the-brain-working-of-artificial-intelligence-automation-predictive.jpg?s=612x612&w=0&k=20&c=GkAOxzduJbUKpS2-LX_l6jSKtyhdKlnPMo2ito4xpR4=',
      topics: [
        'Basics of AI and Data Science',
        'Machine Learning Methods and Approaches',
        'Data Cleaning, Transformation, and Visualization',
        'Deep Learning and Neural Networks Overview',
        'Practical AI Applications in Various Industries'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false
      
    },

    {
      title: 'Blockchain Payments',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRUvyvEy0IEGppcl5NF0A6Lk6g1RE1RcHTYA&s',
      topics: [
        'Fundamentals of Blockchain Technology',
        'Blockchain Payment Models and Systems',
        'Smart Contracts and Their Role in Blockchain',
        'Blockchain Security and Protection Features',
        'The Future of Blockchain in Financial Transactions'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false
    },
    

    {
      title: 'DevOps Engineering',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9KtlkJ_pmgv0krj_eX3LcecZHr7mdKmuVnA&s',
      topics: [
        'Overview of DevOps and Its Core Principles',
        'Continuous Integration and Continuous Delivery (CI/CD)',
        'Infrastructure Management through Code (IaC)',
        'DevOps Monitoring and Log Management',
        'Cloud Services and Automation Tools in DevOps'
      ],
      showDetails: false,
      showEnroll: false,
      showSuccess: false
    }


  ];

  constructor(private router: Router) {
    this.filteredCourses = this.courses;
  }

  filterCourses() {
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  showDetails(course: any) {
    course.showDetails = true;
  }

  hideDetails(course: any) {
    course.showDetails = false;
  }

  openCourseInfo(course: any) {
    window.open('', '_blank');
  }

  navigateToStudyPlan() {
    this.router.navigate(['/study-plan']);
  }

  navigateToProgress() {
    this.router.navigate(['/progress']);
  }
}
