import React, { useEffect, useState, useRef } from "react";

import AddMember from "./AddMember";
import ChangeRole from "./ChangeRole";
import styled from "styled-components";
import image from "../../assets/user-img.png";

const ProjectRoles = ({ users, setUsers }) => {
	const [isActive, setIsActive] = useState(null);
	const [type, setType] = useState({ index: null, type: null });
	const membersRef = useRef();

    useEffect(() => {
        if (isActive !== null || type.index !== null) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
	});

	const handleClickOutside = (e) => {
		if (membersRef.current && !membersRef.current.contains(e.target)) {
			setIsActive(null);
			setType({ index: null, type: null });
		}

	};

	const toggleDropdown = (index, e) => {
		if (index === isActive) {
			setIsActive(null);
		} else {
			setIsActive(index);
			setType({ index: null, type: null });
		}
	};

	const changeRole = (index) => {
		setIsActive(null);
		setType({ index: index, type: "change-role" });
	};

	const setProjectOwner = (index) => {
		const Users = [...users];

		Users.map((user, userIndex) => {
			if (user.role === "Project Owner") {
				user.role = null;
			}

			if (userIndex === index) {
				user.role = "Project Owner";
			}
		});

		setIsActive(null);
	};

	const removeUser = (index) => {
		const Users = [...users];
		let member;
        //use find()
		Users.map((user, userIndex) => {
			if (userIndex === index) {
				member = user;
			}
		});

		const filteredUsers = Users.filter((user) => user !== member);

		setUsers([...filteredUsers]);
		setIsActive(null);
    };
    
    const handleAddRoleBtnClick = (e, index) => {
        e.stopPropagation();
        changeRole(index)
    }

	return (
		<Container>
			<h2>Project Roles</h2>
			<RolesList ref={membersRef}>
                <AddMember users={users} setUses={setUsers}/>
				{users.map((user, index) => (
					<UserContainer>
						<UserWrapper
						// onClick={handleOnBlur}
						// className={isActive === index ? "active" : ""}
						>
							<User onClick={(e) => toggleDropdown(index, e)}>
								<img src={image} alt='user' />
								<div className='user-details'>
									<span className='user-name'>{user.name}</span>
									<span className='user-role'>
										{user.role ? (
											user.role
										) : (
											<AddRole onClick={(e) => handleAddRoleBtnClick(e, index)}>
												<button type='button' className='user-change-role-btn'>+ Add role</button>
											</AddRole>
										)}
									</span>
								</div>
							</User>
							{isActive === index && (
								<RoleDropdown>
									<ul>
										<li onClick={() => changeRole(index)}>Change Role</li>
										<li onClick={() => setProjectOwner(index)}>
											Set as Project Owner
										</li>
										<li onClick={() => removeUser(index)}>
											Remove from Project
										</li>
									</ul>
								</RoleDropdown>
							)}
						</UserWrapper>
						{type.type === "change-role" && type.index === index && (
                            <ChangeRole users={users} setUsers={setUsers} setType={setType} user={user} index={index}/>
						)}
					</UserContainer>
				))}
			</RolesList>
		</Container>
	);
};

export default ProjectRoles;
const UserContainer = styled.div``;

const AddRole = styled.div``;



const RoleDropdown = styled.div`
	position: absolute;
	/* margin-top: 1rem; */
	background-color: white;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 0.2rem 0 1rem 0.5rem;
	width: 100%;
	height: auto;
	font-size: 14px;
	top: 80px;
	z-index: 1;
	box-sizing: border-box;

	ul {
		list-style-type: none;
		padding-left: 1rem;
	}

	li {
		margin-top: 1rem;
		cursor: pointer;
	}
`;

const Container = styled.div`
	width: 80%;
	margin-top: 1rem;
	margin-left: 3rem;

	h2 {
		margin-bottom: 1rem;
	}
`;

const User = styled.div`
	display: flex;
	padding: 1rem;
	height: 80px;
	cursor: pointer;

	img {
		width: 50px;
		height: 50px;
	}

	.user-details {
		display: flex;
		flex-direction: column;
		margin-left: 1rem;
	}

	.user-name {
		font-weight: 600;
	}

	.user-role {
		font-size: 12px;
	}
`;

const UserWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	width: 250px;
	margin-bottom: 1rem;
	margin-right: 1rem;
	height: 80px;
	background-color: #ececec;
	box-sizing: border-box;
	border-radius: 5px;

    .user-change-role-btn {
        margin-top: 5px;
        /* border: none; */
        cursor: pointer;
        z-index: 1;
    }
`;

const RolesList = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: start;
`;
