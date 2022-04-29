import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";

const Background = () => {
	const [descValue, setDescValue] = useState("Controlled");
	const [titleValue, setTitleValue] = useState("Controlled");
	const [titleInput, showTitleInput] = useState(false);
	const [descInput, showDescInput] = useState(false);

	const titleInputRef = useRef();
	const descInputRef = useRef();

    useEffect(() => {
        titleInput && titleInputRef.current.firstChild.firstChild.focus()
        descInput && descInputRef.current.firstChild.firstChild.focus()
    },[titleInput, descInput])
    
	const handleDescChange = (event) => {
		setDescValue(event.target.value);
	};
	const handleTitleChange = (event) => {
		setTitleValue(event.target.value);
	};


	return (
		<BackgroundContainer>
			{titleInput ? (
				<TextField
					ref={titleInputRef}
					className='standard-multiline-flexible-title'
					// label='Multiline'
					multiline
					maxRows={4}
					value={titleValue}
					onChange={handleTitleChange}
					onBlur={() => showTitleInput(!titleInput)}
					variant='standard'
				/>
			) : (
				<span
					className='background-title'
					onClick={() => showTitleInput(!titleInput)}
				>
					{titleValue ? titleValue : "Background"}
				</span>
			)}
			{descInput ? (
				<TextField
					ref={descInputRef}
					fullWidth
					className='standard-multiline-flexible-desc'
					// label='Multiline'
					multiline
					maxRows={4}
                    value={descValue}
                    onChange={handleDescChange}
                    onBlur={() => showDescInput(!descInput)}
					variant='standard'
				/>
			) : (
				<span
					className='background-desc'
					onClick={() => showDescInput(!descInput)}
				>
					{descValue ? descValue : "Write some background about your project"}
				</span>
			)}
		</BackgroundContainer>
	);
};

export default Background;

const BackgroundContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 3rem;
	margin-top: 3rem;
    min-height: 200px;

	.background-title {
		font-weight: bold;
		font-size: 24px;
	}
	> .standard-multiline-flexible-title {
		width: 50%;

		.MuiInput-root {
			font-weight: bold;
			font-size: 24px;
		}
	}
	> .standard-multiline-flexible-desc {
		width: 70%;
	}
`;
