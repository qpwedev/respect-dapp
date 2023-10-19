import Image from "next/image";
import TodoList from "./_components/TodoList";
import { serverClient } from "./_trpc/serverClient";
import Header from "./_components/Header";

export default async function Home() {
  // const todos = await serverClient.getTodos();

  return (
    <main>
      {/* <TodoList initialTodos={todos} /> */}
      <Header />
    </main>
  );
}
