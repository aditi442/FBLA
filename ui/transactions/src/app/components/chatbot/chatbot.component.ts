import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, AfterViewInit {
  chatbotVisible = false;

  ngOnInit(): void {
    (window as any).chatbaseConfig = {
      chatbotId: "3pKlRH29jmHJusaFGpBZc",
      domain: "www.chatbase.co"
    };
  }

  ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = "3pKlRH29jmHJusaFGpBZc";
    script.defer = true;
    document.body.appendChild(script);
  }

  toggleChatbot(): void {
    this.chatbotVisible = !this.chatbotVisible;
  }
}
