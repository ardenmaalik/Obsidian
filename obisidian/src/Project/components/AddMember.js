import React from 'react'
import styled from 'styled-components'

const AddMember = ({users, setUsers}) => {
    const addUser = () => {
        
    }
    
  return (
      
      <AddMemberWrapper onClick={addUser}>
          <div className="img-placeholder" />
          <span className="add-member">Add Member</span>
    </AddMemberWrapper>
  )
}

export default AddMember

const AddMemberWrapper = styled.div`
	display: flex;
    align-items: center;
	width: 250px;
	margin-bottom: 1rem;
	margin-right: 1rem;
	padding: 1rem;
	height: 80px;
	/* background-color: #ececec; */
	box-sizing: border-box;
	border-radius: 5px;
    cursor: pointer;

    .img-placeholder {
        width: 50px;
        height: 50px;
        border: 2px dashed #616161;
        border-radius: 50%;
    }

    span {
        margin-left: 1rem;
        color: #7e7e7e;
        font-weight: 600;
    }
`;