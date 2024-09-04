import { useEffect, useRef } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [ToDoList, setTodoList] = useState([]);
  const [sequence, setSequence] = useState(null);
  const refTodoItem = useRef();

  useEffect(() => {
    let sequence = window.localStorage.getItem("sequence");
    if (sequence == null) {
      window.localStorage.setItem("sequence", "0");
      sequence = 0;
    }
    const handleSetInit = () => {
      window.localStorage.setItem("todoList", "[]");
      return "[]";
    };
    let todo = JSON.parse(
      window.localStorage.getItem("todolist") ?? handleSetInit()
    );

    setTodoList(todo);
    setSequence(Number(sequence));
  }, []);

  const handleTodoAdd = (item) => {
    if (sequence === null) {
      return;
    }
    let todo = [...ToDoList];

    todo.push({ tf: false, id: sequence + 1, text: item });

    window.localStorage.setItem("todolist", JSON.stringify(todo));
    window.localStorage.setItem("sequence", String(sequence + 1));

    setTodoList(todo);
    setSequence(sequence + 1);
    refTodoItem.current.value = "";
  };

  const handleTodoCheck = (tf, idx) => {
    let todo = [...ToDoList];
    todo[idx].tf = !tf;

    window.localStorage.setItem("todolist", JSON.stringify(todo));

    setTodoList(todo);
  };

  const handleTodoDelete = (id) => {
    let todo = [...ToDoList];
    todo = todo.filter((val) => val.id !== id);

    window.localStorage.setItem("todolist", JSON.stringify(todo));
    setTodoList(todo);
  };

  return (
    <div className="mainLayout">
      <div className="todoLayout">
        <div className="todoTop">
          <div className="todoTitle">ToDoList</div>
          <div className="todoAdd">
            {/* placeholder 속성은 입력 필드가 비어 있을 때 표시되는 안내 텍스트 */}
            <input type="text" placeholder="할 일 입력" ref={refTodoItem} />
            <div onClick={() => handleTodoAdd(refTodoItem.current.value)}>
              +
            </div>
          </div>
        </div>
        <div className="listLayout">
          {ToDoList.map((val, idx) => (
            <div className="tidoItem" ket={idx}>
              <div
                className="todoCheckBox"
                onClick={() => handleTodoCheck(val.tf, idx)}
              >
                <div className="checkIcon">{val.tf ? "✔" : ""}</div>
                <span>{val.text}</span>
              </div>
              <div
                className="DeleteBox"
                onClick={() => handleTodoDelete(val.id)}
              >
                ✖
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
