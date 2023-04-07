import Navbar from "./components/Navbar";
import ProgressCol from "./components/ProgressCol";
import MainLayout from "./layouts/MainLayout";
import { ColumnType } from "./utils/enums";

function App() {

  return (
    <>
      <Navbar/>
      <MainLayout>
        <ProgressCol label={ColumnType.TODO} color='gray'/>
        <ProgressCol label={ColumnType.IN_PROGRESS} color='blue'/>
        <ProgressCol label={ColumnType.BLOCKED} color='red'/>
        <ProgressCol label={ColumnType.COMPLETED} color='green'/>
      </MainLayout>
    </>
  )
}

export default App;
