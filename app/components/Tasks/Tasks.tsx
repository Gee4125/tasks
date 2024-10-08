// "use client";
// import { useGlobalState } from "@/app/context/globalProvider";
// import React from "react";
// import styled from "styled-components";
// import CreateContent from "../Modals/CreateContent";
// import TaskItem from "../TaskItem/TaskItem";
// import { add, plus } from "@/app/utils/Icons";
// import Modal from "../Modals/Modal";

// interface Props {
//   title: string;
//   tasks?: any[] | { error: string; status: number }; // Can be an array or an error object
// }

// function Tasks({ title, tasks }: Props) {
//   const { theme, isLoading, openModal, modal } = useGlobalState();

//   // Debugging log
//   console.log('Tasks:', tasks);

//   const renderTasks = () => {
//     if (!tasks) {
//       return <p>Loading tasks...</p>;
//     }

//     // Handle the case where the API returned an error (like Unauthorized)
//     if (tasks && tasks.error) {
//       return <p>Unauthorized access. Please login.</p>;
//     }

//     // Ensure tasks is an array before attempting to map
//     if (Array.isArray(tasks) && tasks.length > 0) {
//       return tasks.map((task) => (
//         <TaskItem
//           key={task.id}
//           title={task.title}
//           description={task.description}
//           date={task.date}
//           isCompleted={task.isCompleted}
//           id={task.id}
//         />
//       ));
//     }

//     // Handle the case where there are no tasks
//     return <p>No tasks found.</p>;
//   };

//   return (
//     <TaskStyled theme={theme}>
//       {modal && <Modal content={<CreateContent />} />}
//       <h1>{title}</h1>

//       <button className="btn-rounded" onClick={openModal}>
//         {plus}
//       </button>

//       <div className="tasks grid">
//         {renderTasks()}
//         <button className="create-task" onClick={openModal}>
//           {add}
//           Add New Task
//         </button>
//       </div>
//     </TaskStyled>
//   );
// }

// const TaskStyled = styled.main`
//   position: relative;
//   padding: 2rem;
//   width: 100%;
//   background-color: ${(props) => props.theme.colorBg2};
//   border: 2px solid ${(props) => props.theme.borderColor2};
//   border-radius: 1rem;
//   height: 100%;
//   overflow-y: auto;

//   &::-webkit-scrollbar {
//     width: 0.5rem;
//   }

//   .btn-rounded {
//     position: fixed;
//     top: 4.9rem;
//     right: 5.1rem;
//     width: 3rem;
//     height: 3rem;
//     border-radius: 50%;
//     background-color: ${(props) => props.theme.colorBg};
//     border: 2px solid ${(props) => props.theme.borderColor2};
//     box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
//     color: ${(props) => props.theme.colorGrey2};
//     font-size: 1.4rem;
//     display: flex;
//     align-items: center;
//     justify-content: center;

//     @media screen and (max-width: 768px) {
//       top: 3rem;
//       right: 3.5rem;
//     }
//   }

//   .tasks {
//     margin: 2rem 0;
//   }

//   > h1 {
//     font-size: clamp(1.5rem, 2vw, 2rem);
//     font-weight: 800;
//     position: relative;

//     &::after {
//       content: "";
//       position: absolute;
//       bottom: -0.5rem;
//       left: 0;
//       width: 3rem;
//       height: 0.2rem;
//       background-color: ${(props) => props.theme.colorPrimaryGreen};
//       border-radius: 0.5rem;
//     }
//   }

//   .create-task {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     gap: 0.5rem;
//     height: 16rem;
//     color: ${(props) => props.theme.colorGrey2};
//     font-weight: 600;
//     cursor: pointer;
//     border-radius: 1rem;
//     border: 3px dashed ${(props) => props.theme.colorGrey5};
//     transition: all 0.3s ease;

//     i {
//       font-size: 1.5rem;
//       margin-right: 0.2rem;
//     }

//     &:hover {
//       background-color: ${(props) => props.theme.colorGrey5};
//       color: ${(props) => props.theme.colorGrey0};
//     }
//   }
// `;

// export default Tasks;
import { useGlobalState } from "@/app/context/globalProvider";
import React from "react";
import styled from "styled-components";
import CreateContent from "../Modals/CreateContent";
import TaskItem from "../TaskItem/TaskItem";
import { add, plus } from "@/app/utils/Icons";
import Modal from "../Modals/Modal";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
}

interface ErrorResponse {
  error: string;
  status: number;
}

interface Props {
  title: string;
  tasks?: Task[] | ErrorResponse; // Can be an array of tasks or an error object
}

function Tasks({ title, tasks }: Props) {
  const { theme, isLoading, openModal, modal } = useGlobalState();

  // Debugging log
  console.log('Tasks:', tasks);

  const renderTasks = () => {
    if (!tasks) {
      return <p>Loading tasks...</p>;
    }

    // Handle the case where the API returned an error (like Unauthorized)
    if (isErrorResponse(tasks)) {
      return <p>Unauthorized access. Please login.</p>;
    }

    // Ensure tasks is an array before attempting to map
    if (Array.isArray(tasks) && tasks.length > 0) {
      return tasks.map((task) => (
        <TaskItem
          key={task.id}
          title={task.title}
          description={task.description}
          date={task.date}
          isCompleted={task.isCompleted}
          id={task.id}
        />
      ));
    }

    // Handle the case where there are no tasks
    return <p>No tasks found.</p>;
  };

  // Type guard to check if tasks is an ErrorResponse
  const isErrorResponse = (response: any): response is ErrorResponse => {
    return typeof response === "object" && response !== null && 'error' in response;
  };

  return (
    <TaskStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{title}</h1>

      <button className="btn-rounded" onClick={openModal}>
        {plus}
      </button>

      <div className="tasks grid">
        {renderTasks()}
        <button className="create-task" onClick={openModal}>
          {add}
          Add New Task
        </button>
      </div>
    </TaskStyled>
  );
}

const TaskStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: ${(props) => props.theme.colorBg2};
  border: 2px solid ${(props) => props.theme.borderColor2};
  border-radius: 1rem;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  .btn-rounded {
    position: fixed;
    top: 4.9rem;
    right: 5.1rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colorBg};
    border: 2px solid ${(props) => props.theme.borderColor2};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      top: 3rem;
      right: 3.5rem;
    }
  }

  .tasks {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${(props) => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .create-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    height: 16rem;
    color: ${(props) => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${(props) => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${(props) => props.theme.colorGrey5};
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;

export default Tasks;
