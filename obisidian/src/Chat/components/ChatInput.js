import React, { useState } from "react";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";

import { Button } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

const ChatInput = ({ chatRef, channelName, channelId }) => {
	const [input, setInput] = useState("");
	const [user] = useAuthState(auth);
	console.log(channelId);

	const sendMessage = async (e) => {
		e.preventDefault();

		if (!channelId) {
			return false;
		}

		try {
			await addDoc(collection(db, "rooms", channelId, "messages"), {
				message: input,
				timestamp: serverTimestamp(),
				user: user.displayName,
				userImage: user.photoURL,
			});
		} catch (e) {
			console.error("Error adding message data: ", e);
		}

		chatRef?.current?.scrollIntoView({
			behavior: "smooth",
		});

		setInput("");
	};

	return (
		<ChatInputContainer>
			<form>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder={`Message #${channelName}`}
				/>
				<Button hidden type='submit' onClick={sendMessage}>
					Send Message
				</Button>
			</form>
		</ChatInputContainer>
	);
};

export default ChatInput;

const ChatInputContainer = styled.div`
	border-radius: 20px;

	> form {
		position: relative;
		display: flex;
		justify-content: center;
	}

	> form > input {
		position: fixed;
		bottom: 30px;
		width: 60%;
		border: 1px solid gray;
		border-radius: 3px;
		padding: 20px;
		outline: none;
	}

	> form > button {
		display: none !important;
		//Fix this
	}
`;
