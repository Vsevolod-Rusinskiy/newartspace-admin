import {Admin, Resource,} from "react-admin";
import {authProvider} from "./authProvider";
import {PaintingList} from "../components/Paintings/PaintingsList";
import dataProvider from "./dataProvider";
import {PaintingShow} from "../components/PaintingShow/PaintingShow";
import {PaintingCreate} from "../components/PaintingCreate/PaintingCreate";
import PaintingEdit from "../components/PaintingEdit/PaintingEdit";



export const App = () =>

<Admin authProvider={authProvider} dataProvider={dataProvider}>
  <Resource name="paintings" list={PaintingList} show={PaintingShow} create={PaintingCreate}
            edit={PaintingEdit}
  />
</Admin>
