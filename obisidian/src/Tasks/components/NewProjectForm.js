import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProjectId, openProject } from "../../features/appSlice";
import {
	getFirestore,
	query,
	addDoc,
	getDocs,
	collection,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

import { firebaseApp } from "../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import AddTaskIcon from "@mui/icons-material/AddTask";
import ChatIcon from "@mui/icons-material/Chat";
import GroupIcon from "@mui/icons-material/Group";

const NewProjectForm = ({ activeModal }) => {
	const [display, setDisplay] = useState(false);
	const [hide, setHide] = useState(false);
	const [activeTab, setActiveTab] = useState("");
	const [inputval, setInputval] = useState("");
	const [projectCreated, setProjectCreated] = useState(false);
	const [projectData, setProjectData] = useState("");
	const [projects] = useCollection(
		collection(getFirestore(firebaseApp), "projects")
	);
	const projectId = useSelector(selectProjectId);

	let history = useHistory();
	let dispatch = useDispatch();

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	//Change how this is invoked
	const onSubmit = (data) => {
		console.log(data);
		setProjectData(data);
		setHide(true);
	};

	useEffect(() => {
		if (projectCreated) {
			history.push(`/${projectId}/project/${projectData.projectName}`);
		}
		setProjectCreated(false)
	}, [projectCreated]);

	useEffect(() => {
		activeModal && setDisplay(true);
	}, [activeModal]);

	const addProject = async () => {
		console.log('adding project...')
		const projectName = projectData.projectName;
		if (projectName) {
			try {
				//await til this is finished
				await addDoc(collection(db, "projects"), {
					name: projectName,
				});
			} catch (e) {
				console.error("Error adding project: ", e);
			}
		}
	};

	const createProject = async () => {
		await addProject();
		await getProjectId();
		setProjectCreated(true)
	};

	const getProjectId = async () => {
		console.log('getting project id...')
		const q = query(collection(db, "projects"));
		const queryProjects = await getDocs(q);

		await queryProjects.forEach((doc) => {
			if (doc.data().name === projectData.projectName)
				dispatch(
					openProject({
						projectId: doc.id,
						projectName: projectData.projectName
					})
				);
		});
	};

	const handleGoToProject = async () => {
		if (activeTab === "add-task") {
			createProject();
		}
	};

	return (
		<NewProjectFormContainer display={display}>
			{!hide ? (
				<Form>
					<h1>New Project</h1>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ProjectName>
							<h3>Project Name</h3>
							<input
								{...register("projectName", {
									required: true,
									onChange: (e) => setInputval(e.target.value),
								})}
							/>
							{errors.projectName && <span>This field is required</span>}
						</ProjectName>
						<FormSelect>
							<TeamSelect>
								<h3>Team</h3>
								<select {...register("Team")}>
									<option value='default'>default</option>
								</select>
							</TeamSelect>
							<PrivacySelect>
								<h3>Privacy</h3>
								<select {...register("Privacy")}>
									<option value='public'>public</option>
									<option value='private'>private</option>
								</select>
							</PrivacySelect>
						</FormSelect>
						{errors.exampleRequired && <span>This field is required</span>}
						<input type='submit' value='Continue' inputval={inputval} />
					</form>
				</Form>
			) : (
				<OptionsContainer>
					<h2>What do you want to do first?</h2>
					<Option
						className={
							activeTab === "add-task" ? "button active" : "button deactive"
						}
						onClick={() => setActiveTab("add-task")}
					>
						<AddTaskIcon />
						<OptionDetails>
							<h4>Start adding tasks</h4>
							<p>Assign, set due dates, and get to work</p>
						</OptionDetails>
					</Option>
					<Option
						className={
							activeTab === "project-context"
								? "button active"
								: "button deactive"
						}
						onClick={() => setActiveTab("project-context")}
					>
						<ChatIcon />
						<OptionDetails>
							<h4>Set project context</h4>
							<p>Attach key resources and define roles</p>
						</OptionDetails>
					</Option>
					<Option
						className={
							activeTab === "team" ? "button active" : "button deactive"
						}
						onClick={() => setActiveTab("team")}
					>
						<GroupIcon />
						<OptionDetails>
							<h4>Share with teammates</h4>
							<p>Collaborate and stay in sync</p>
						</OptionDetails>
					</Option>
					<input
						type='submit'
						value='Go to Project'
						onClick={handleGoToProject}
						/>
				</OptionsContainer>
			)}
		</NewProjectFormContainer>
	);
};

export default NewProjectForm;

const NewProjectFormContainer = styled.div`
	width: 100%;
	height: 100%;
	display: ${(props) => (props.display ? "flex" : "none")};
	flex-direction: column;
	background-color: #fff;
	justify-content: center;
	align-items: center;
`;

const Form = styled.div`
	h3 {
		font-size: 12px;
	}

	input[type="submit"] {
		height: 35px;
		width: 250px;
		background-color: #0055b3;
		color: #fff;
		border: none;
		border-radius: 10px;
		margin-top: 1em;
	}
`;

const OptionsContainer = styled.div`
	display: flex;
	flex-direction: column;

	> h2 {
		margin-bottom: 1em;
	}

	.active {
		background-color: #e7f5fe;
		border-color: #1261ad;
		transition: 0.35s ease-in-out;
	}

	input[type="submit"] {
		height: 35px;
		width: 330px;
		background-color: #0055b3;
		color: #fff;
		border: none;
		border-radius: 10px;
		margin-top: 1em;
	}
`;

const Option = styled.div`
	display: flex;
	align-items: center;
	border: solid 1px #e8e8e8;
	border-radius: 10px;
	width: 330px;
	height: 75px;
	margin-bottom: 1em;
	cursor: pointer;

	p {
		font-size: 14px;
		color: gray;
	}

	> .MuiSvgIcon-root {
		color: black;
		padding: 10px;
	}

	:hover {
		border-color: #000;
		transition: 0.35s ease-in-out;
	}
`;

const OptionDetails = styled.div`
	display: flex;
	flex-direction: column;
`;

const ProjectName = styled.div`
	display: flex;
	flex-direction: column;

	> input {
		width: 400px;
		height: 35px;
		background-color: #f5f5f5;
		border: none;
		outline: none;
		font-size: 20px;
	}

	> span {
		font-size: 14px;
		color: red;
	}
`;

const FormSelect = styled.div`
	display: flex;
	select {
		width: 200px;
		height: 35px;
		/* border-radius: 5px; */
	}

	select > option {
		/* border-radius: none; */
	}
`;

const TeamSelect = styled.div`
	margin-right: 0.25em;
`;
const PrivacySelect = styled.div`
	margin-left: 0.25em;
`;
