import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FooterComponent } from "../../common/footer/footer.component";
import emailjs from "emailjs-com";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agent',
  standalone: true,
  imports: [RouterLink, NavbarComponent, FooterComponent, FormsModule],
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent {

  async sendEmail(contactForm: any): Promise<void> {
    try {
      const { contactName, subject, message } = contactForm.value; 
      const templateParams = {
        from_name: contactName,
        subject: subject,
        message: message,
        to_name: "UrbanNest Team",  
        to_email: "urbannest.test@gmail.com", 
      };

      const response = await emailjs.send(
        'service_mwjekw9', 
        'template_p5uy7me',  
        templateParams,
        '4aWBEX6hIozmLixP3'  
      );

      if (response.status === 200) {
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('An error occurred while sending the email. Please try again.');
    }
  }
}
