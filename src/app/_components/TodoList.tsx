"use client";

import { useState } from "react";
import { trpc } from "../_trpc/client";
import { serverClient } from "../_trpc/serverClient";

export default function TodoList({
  initialTodos,
}: {
  initialTodos: Awaited<ReturnType<(typeof serverClient)["getTodos"]>>;
}) {
  const getTodos = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const addTodo = trpc.addTodo.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const setDone = trpc.setDone.useMutation({
    onSettled: () => {
      getTodos.refetch();
    },
  });

  const [content, setContent] = useState("");

  return (
    <div>
      {getTodos?.data?.map((todo) => {
        return (
          <div key={todo.id}>
            <input
              type="checkbox"
              checked={!!todo.done}
              onChange={() => {
                return setDone.mutate({
                  id: todo.id,
                  done: todo.done ? 0 : 1,
                });
              }}
            />
            <span>{todo.content}</span>
          </div>
        );
      })}

      <input
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={async () => {
          if (content.length) {
            addTodo.mutate(content);
            setContent("");
          }
        }}
      >
        Add Todo
      </button>
    </div>
  );
}
