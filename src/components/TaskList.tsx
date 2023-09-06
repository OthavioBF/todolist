import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { Trash, PlusCircle, ClipboardText } from "phosphor-react";

import styles from "./TaskList.module.css";
import { v4 as uuidv4 } from "uuid";

interface TaskProps {
  id: string;
  title: string;
  conclude: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskCount, setTaskCount] = useState("");
  const [taskConcludeCount, setTaskConcludeCount] = useState("");

  function handleCreateTask(e: FormEvent) {
    e.preventDefault();

    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      conclude: false,
    };

    setTasks([...tasks, newTask]);

    setTaskTitle("");
  }

  function handleNewCommentChange(e: ChangeEvent<HTMLInputElement>) {
    setTaskTitle(e.target.value);
  }

  function handleConcludeTask(id: string) {
    let completedItemList = tasks.map((item) => {
      if (id == item.id) {
        if (item.conclude == false) {
          return { ...item, conclude: true };
        } else {
          return { ...item, conclude: false };
        }
      }
      return item;
    });

    setTasks(completedItemList);
  }

  function handleDeleteTask(id: string) {
    const deleteTask = tasks.filter((task) => task.id !== id);

    setTasks(deleteTask);
  }

  useEffect(() => {
    const value = tasks.length.toString();
    setTaskCount(value);

    let taskConcludeCount = tasks.reduce((sum, task) => {
      if (task.conclude == true) {
        return (sum += 1);
      }

      return sum;
    }, 0);

    let text = "0";

    if (tasks.length > 0) {
      text = `${taskConcludeCount} de ${value}`;
    }

    setTaskConcludeCount(text);
  }, [tasks]);

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.inputContainer}>
          <input
            value={taskTitle}
            onChange={handleNewCommentChange}
            placeholder="Adicione uma nova tarefa"
          />
          <button onClick={handleCreateTask}>
            Criar
            <PlusCircle size={17} />
          </button>
        </div>

        <header className={styles.header}>
          <h1>
            Tarefas criadas <span>{taskCount}</span>
          </h1>
          <h2>
            Concluidas <span>{taskConcludeCount}</span>
          </h2>
        </header>

        {tasks.length > 0 ? (
          <div className={styles.cardList}>
            {tasks.map((task) => (
              <div className={styles.card}>
                <div className={styles.cardText}>
                  <label className={styles.customCheckbox}>
                    <input
                      type="checkbox"
                      defaultChecked={task.conclude}
                      onClick={() => handleConcludeTask(task.id)}
                    />
                    <span className={styles.checkmark}>✓</span>
                  </label>

                  {task.conclude ? <s>{task.title}</s> : <p>{task.title}</p>}
                </div>

                <button onClick={() => handleDeleteTask(task.id)}>
                  <Trash size={24} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.cardList}>
            <aside>
              <ClipboardText size={56} style={{ marginTop: 64 }} />
              <p>
                <strong>Você ainda não tem tarefas cadastradas</strong>
                <br />
                Crie tarefas e organize seus itens a fazer
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
