import Image from "next/image";
import TodoList from "./_components/TodoList";
import { serverClient } from "./_trpc/serverClient";
import Header from "./_components/Header";
import WidgetJar from "./_components/widgets/WidgetJar";
import WidgetPersonalities from "./_components/widgets/WidgetPersonalities";
import WidgetAccount from "./_components/widgets/WidgetAccount";

export default async function Home() {
  // const todos = await serverClient.getTodos();

  return (
    <main className="flex flex-col gap-5 m-5">
      {/* <TodoList initialTodos={todos} /> */}
      <Header />

      <WidgetPersonalities />

      <WidgetAccount />
    </main>
  );
}
