package com.chatapplication.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.chatapplication.model.Message;

@RestController
public class MessageController {
	
	@MessageMapping("/message") // to send message
	@SendTo("/topic/get") // all user who have suscribe to this url will get this message
	public Message getMessage(@RequestBody Message message) {
		return message;
	}

}
