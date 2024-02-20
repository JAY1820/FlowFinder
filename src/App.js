import React, { useState, useEffect } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';

const App = () => {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const savedColumns = localStorage.getItem('columns');
    if (savedColumns) {
      setColumns(JSON.parse(savedColumns));
    } else {
      setColumns([
        { id: 'column-1', title: 'Todo', cards: [] },
        { id: 'column-2', title: 'In Progress', cards: [] },
        { id: 'column-3', title: 'Ready for Test', cards: [] },
        { id: 'column-4', title: 'Done', cards: [] },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('columns', JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) - 6 (Saturday)
    const startDay = new Date(today);
    startDay.setDate(today.getDate() - today.getDay() + (dayOfWeek === 0 ? -6 : 1)); // Get Monday of the current week
  
    const columnDay = new Date(startDay);
    columnDay.setDate(startDay.getDate() + columns.length % 7); // Get the day of the current column
  
    const columnTitle = `${columnDay.toLocaleDateString('en-US', { weekday: 'long' })}`;
  
    const newColumn = {
      id: `column-${uuidv4()}`,
      title: columnTitle,
      cards: [],
    };
  
    setColumns((prevColumns) => [...prevColumns, newColumn]);
  };
  
  
  const deleteColumn = (columnId) => {
    setColumns((prevColumns) =>
      prevColumns.filter((column) => column.id !== columnId)
    );
  };

  const editColumnTitle = (columnId, newTitle) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId ? { ...column, title: newTitle } : column
      )
    );
  };

  const createCard = (columnId, cardContent) => {
    const newCard = { id: `card-${uuidv4()}`, content: cardContent };
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, cards: [...column.cards, newCard] }
          : column
      )
    );
  };

  const deleteCard = (columnId, cardId) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.filter((card) => card.id !== cardId),
            }
          : column
      )
    );
  };

  const editCardContent = (columnId, cardId, newContent) => {
    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? {
              ...column,
              cards: column.cards.map((card) =>
                card.id === cardId ? { ...card, content: newContent } : card
              ),
            }
          : column
      )
    );
  };

  const moveCard = (sourceColumnId, destinationColumnId, cardId, index) => {
    setColumns((prevColumns) => {
      const sourceColumn = prevColumns.find(
        (column) => column.id === sourceColumnId
      );
      const destinationColumn = prevColumns.find(
        (column) => column.id === destinationColumnId
      );

      const newSourceCards = [...sourceColumn.cards];
      const newDestinationCards = [...destinationColumn.cards];

      const [removedCard] = newSourceCards.splice(index, 1);
      newDestinationCards.splice(index, 0, removedCard);

      return prevColumns.map((column) => {
        if (column.id === sourceColumnId) {
          return { ...column, cards: newSourceCards };
        } else if (column.id === destinationColumnId) {
          return { ...column, cards: newDestinationCards };
        }
        return column;
      });
    });
  };

  const reorderCards = (columnId, startIndex, endIndex) => {
    setColumns((prevColumns) => {
      const column = prevColumns.find((col) => col.id === columnId);
      const newCards = [...column.cards];

      const [removedCard] = newCards.splice(startIndex, 1);
      newCards.splice(endIndex, 0, removedCard);

      return prevColumns.map((col) =>
        col.id === columnId ? { ...col, cards: newCards } : col
      );
    });
  };

  const searchCards = (searchTerm) => {
    // Implement the logic to search for cards
  };

  const duplicateCard = (columnId, cardId) => {
    // Implement the logic to duplicate a card
  };

  const onDragEnd = (result) => {
    // Implement the logic for onDragEnd
  };

  return (
    <div className="container">
      <div className="center-container">
        <h1 className="flowfinder-title">Flow FindeR</h1>
      </div>
      <div className="columns-container">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="columns"
              >
                {columns.map((column, index) => (
                  <Column
                    key={column.id}
                    column={column}
                    index={index}
                    deleteColumn={deleteColumn}
                    editColumnTitle={editColumnTitle}
                    createCard={createCard}
                    deleteCard={deleteCard}
                    editCardContent={editCardContent}
                    moveCard={moveCard}
                    reorderCards={reorderCards}
                    searchCards={searchCards}
                    duplicateCard={duplicateCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="add-column" onClick={addColumn}>
          + Add Column
        </div>
      </div>
    </div>
  );
};

export default App;
