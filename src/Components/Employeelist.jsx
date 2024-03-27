import React, { useReducer } from 'react';
import  employees from '../Data';
import './Employeelist.css';




function reducer(state,action){
    switch(action.type){
        case 'addemployee':
            return{
                ...state,
                teamMembers:[...state.teamMembers,action.payload],
                averageAge:(state.totalAge+action.payload.age)/(state.teamMembers.length+1)
            };
        case 'removeemployee':
                const updateTeamMember=state.teamMembers.filter((member,index)=>index!==action.payload);
                const removeMember=state.teamMembers[action.payload];
                return{
                    ...state,
                    teamMembers:updateTeamMember,
                    averageAge:updateTeamMember.length>0 ?(state.totalAge-removeMember.age)/updateTeamMember.length:0
                };
        case 'sortbyage':
            const sortteam=[...state.teamMembers].sort((a,b)=>a.age-b.age);
            return{
                ...state,
                teamMembers:sortteam
            };
            
            default:
                return state
            
    }
}





const Employeelist = () => {
const initialState={
    teamMembers:[],
    totalAge:employees.reduce((acc,curr)=>acc+curr.age,0),
    averageAge:0
}
const [state,dispatch]=useReducer(reducer,initialState);

const addtoteam=(emp)=>{
    dispatch({type:'addemployee',payload:emp});
}

const removefromteam=(index)=>{
    dispatch({type:'removeemployee',payload:index})
}
const sortbyAge=()=>{
    dispatch({type:'sortbyage'})
}
function averageage(){
    if(state.teamMembers.length===0){
        return 0;
    }
    const totalage=state.teamMembers.reduce((acc,curr)=>{
        return acc+curr.age
    },0);
    const averageAge=totalage/state.teamMembers.length;
    return averageAge;
}


  return (
    <div className='container' >
        <div className='leftemployess'>
            <h3>Employee List</h3>
            <ul>
  {employees.map((emp, index) => (
    <li key={index}>
      <span>{emp.first_name} {emp.last_name}</span> 
      <span>{emp.age}</span>
      <button 
        disabled={state.teamMembers.includes(emp)}
        onClick={() => addtoteam(emp)}
      >
        Add
      </button>
    </li>
  ))}
</ul>
             </div>

             <div className="rightemployess">
                <h3>Team Members</h3>
                <ul>
                   {state.teamMembers.map((member,index)=>(
                    <li key={index}>
                       <span> {member.first_name} {member.last_name} </span>
                       <span>{member.age}</span>
                        <button
                        onClick={()=>removefromteam(index)}
                        >Remove</button>
                    </li>
                   ))}
                </ul>
                <button onClick={sortbyAge}>Sort by Age</button>
                <p className='averageage'>Average Age: {averageage()}</p>
             </div>
    </div>
  )
}

export default Employeelist