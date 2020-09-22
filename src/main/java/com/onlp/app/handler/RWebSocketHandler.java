package com.onlp.app.handler;

import com.onlp.app.onlpd.OpenNLPDemo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.socket.WebSocketHandler;
import org.springframework.web.reactive.socket.WebSocketMessage;
import org.springframework.web.reactive.socket.WebSocketSession;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * User: Sudarshan Bisht
 * Date: 2020-09-22:09:47
 */
@Component("cbWebSocketHandler")
public class RWebSocketHandler implements WebSocketHandler {

	@Autowired
	OpenNLPDemo openNLPDemo;


	/**
	 * Invoked when OpenNLPDemo new WebSocket connection is established, and allows
	 * handling of the session.
	 *
	 * @param session the session to handle
	 * @return indicates when appilcation handling of the session is complete,
	 * which should reflect the completion of the inbound message stream
	 * (i.e. connection closing) and possibly the completion of the outbound
	 * message stream and the writing of messages.
	 */
	@Override
	public Mono<Void> handle(WebSocketSession session) {
		Flux<WebSocketMessage> out = session.receive().doOnNext(message -> {
		}).concatMap(message -> {
			return Mono.just(openNLPDemo.interact(message.getPayloadAsText()));
		}).map(value -> session.textMessage(value));

		return session.send(out);
	}
}
