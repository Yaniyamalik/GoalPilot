
import { SideBar } from "../components/Sidebar";



export default function ChatPage({ params }: { params: { chatId: string } }) {
  return (
    <div className="flex ">
      <SideBar />
    
    </div>
  );
}
