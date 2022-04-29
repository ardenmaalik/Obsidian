import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ChangeRole = ({ users, setUsers, setType, user, index }) => {
	const [value, setValue] = useState("");

	const handleOnChange = (e) => {
		setValue(e.target.value);
	};

	const saveValue = (name) => {
        const Users = [...users];
        let arr = [];

        Users.map((user, userIndex) => {            
            if (userIndex === index) {
                arr.push({...user, role: value })
            } else {
                arr.push(user)
            }
            
        });
        
        setUsers([...arr])
        setType({index: null, type: null})

	};

	return (
		<ChangeRoleContainer>
			<div className='role-text'>
				What is {user.name}'s role in this project?
			</div>
			<div className='role-input'>
				<input type='text' onChange={(e) => handleOnChange(e)} />
				<button
					className='role-btn'
					type='button'
					onClick={() => saveValue()}
				>
					Save
				</button>
			</div>
		</ChangeRoleContainer>
	);
};

export default ChangeRole;

const ChangeRoleContainer = styled.div`
	position: absolute;
	width: 350px;
	height: auto;
	padding: 1rem;
	font-size: 12px;
	font-weight: 600;
	color: #616161;
	background-color: #fff;
	border: 1px solid #ddd;
	border-radius: 5px;
	box-sizing: border-box;
	z-index: 1;

	.role-text {
		margin-bottom: 0.5rem;
	}

	.role-input {
		display: flex;
		height: 35px;
		width: 100%;

		input {
			width: 100%;
			border-color: #ddd;
			border-radius: 5px;
		}
	}

	.role-btn {
		width: 50px;
		height: 30px;
		color: white;
		background-color: skyblue;
		border: none;
		border-radius: 5px;
		margin-left: 0.5rem;
		cursor: pointer;
	}
`;
