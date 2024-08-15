import { Admin, Resource } from 'react-admin'
import { authProvider } from './authProvider'
import { PaintingList } from '../components/Paintings/PaintingsList'
import dataProvider from './dataProvider'
import { PaintingShow } from '../components/PaintingShow/PaintingShow'
import { PaintingCreate } from '../components/PaintingCreate/PaintingCreate'
import PaintingEdit from '../components/PaintingEdit/PaintingEdit'
import russianMessages from 'ra-language-russian'
import polyglotI18nProvider from 'ra-i18n-polyglot'

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru')

// test flag

export const App = () => (
  <Admin
    authProvider={authProvider}
    dataProvider={dataProvider}
    i18nProvider={i18nProvider}
  >
    <Resource
      name='paintings'
      list={PaintingList}
      show={PaintingShow}
      create={PaintingCreate}
      edit={PaintingEdit}
    />
  </Admin>
)
