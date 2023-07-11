import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from  './Card.js';

const Column = ({
    column,
    index,
    deleteColumn,
    editColumnTitle,
    createCard,
    deleteCard,
    editCardContent,
    moveCard,
    reorderCards,
    searchCards,
    duplicateCard,
}) => {
    const handleDeleteColumn = () => {
        deleteColumn(column.id);
    };

    const handleEditColumnTitle = (event) => {
        const newTitle = event.target.value;
        editColumnTitle(column.id, newTitle);
    };

    const handleCreateCard = () => {
        const cardContent = window.prompt('Enter card content:');
        if (cardContent) {
            createCard(column.id, cardContent);
        }
    };

    const handleDeleteCard = (cardId) => {
        deleteCard(column.id, cardId);
    };

    const handleEditCardContent = (cardId, newContent) => {
        editCardContent(column.id, cardId, newContent);
    };

    const handleMoveCard = (sourceIndex, destinationIndex) => {
        moveCard(column.id, column.id, sourceIndex, destinationIndex);
    };

    const handleReorderCards = (startIndex, endIndex) => {
        reorderCards(column.id, startIndex, endIndex);
    };

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="column"
                >
                    <div className="editable-title">
                        <div className="drag-handle" {...provided.dragHandleProps}>
                            <span role="img" aria-label="Drag handle">&#x2630;</span>
                        </div>

                        <input
                            type="text"
                            value={column.title}
                            onChange={handleEditColumnTitle}
                        />
                        <button className="delete-button" onClick={handleDeleteColumn}>
                            X
                        </button>
                    </div>
                    <Droppable droppableId={column.id} type="card">
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className={`card-list ${snapshot.isDraggingOver ? 'dragging-over' : ''
                                    }`}
                            >
                                {column.cards.map((card, index) => (
                                    <Card
                                        key={card.id}
                                        card={card}
                                        index={index}
                                        deleteCard={handleDeleteCard}
                                        editCardContent={handleEditCardContent}
                                        moveCard={handleMoveCard}
                                        searchCards={searchCards}
                                        duplicateCard={duplicateCard}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                    <div className="add-card">
                        <button onClick={handleCreateCard}>+ Add Card</button>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
