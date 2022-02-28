import React from "react";
import { useRecoilState } from "recoil";
import {
	DragDropContext,
	Draggable,
	Droppable,
	DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./Components/DraggableCard";

const Wrapper = styled.div`
	display: flex;
	max-width: 480px;
	width: 100%;
	margin: 0 auto;
	justify-content: center;
	align-items: center;
	height: 100vh;
`;

const Boards = styled.div`
	display: grid;
	grid-template-columns: repeat(1, 1fr);
	width: 100%;
`;

const Board = styled.div`
	padding: 30px 10px 20px;
	background-color: ${(props) => props.theme.boardColor};
	border-radius: 5px;
	min-height: 200px;
`;

function App() {
	const [toDos, setToDos] = useRecoilState(toDoState);
	const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
		if (!destination) return;
		setToDos((oldToDos) => {
			const newToDos = [...oldToDos];
			// Delete item on source.index
			newToDos.splice(source.index, 1);
			// Put back the item on the destination.index
			newToDos.splice(destination?.index, 0, draggableId);
			return newToDos;
		});
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Wrapper>
				<Boards>
					<Droppable droppableId="one">
						{(provided) => (
							<Board
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								{toDos.map((toDo, index) => (
									<DraggableCard
										key={toDo}
										toDo={toDo}
										index={index}
									/>
								))}
								{provided.placeholder}
							</Board>
						)}
					</Droppable>
				</Boards>
			</Wrapper>
		</DragDropContext>
	);
}

export default App;
