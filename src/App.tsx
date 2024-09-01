import { Admin, Resource } from 'react-admin'
import { authProvider } from './authProvider'
import dataProvider from './dataProvider'
import russianMessages from 'ra-language-russian'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import { PaintingList } from '../components/paintings/PaintingsList/PaintingsList'
import { PaintingShow } from '../components/paintings/PaintingShow/PaintingShow'
import { PaintingCreate } from '../components/paintings/PaintingCreate/PaintingCreate'
import { PaintingEdit } from '../components/paintings/PaintingEdit/PaintingEdit'
import { ArtistEdit } from '../components/artists/ArtistEdit/ArtistEdit'
import { ArtistList } from '../components/artists/ArtistList/ArtistList'
import { ArtistShow } from '../components/artists/ArtistShow/ArtistShow'
import { ArtistCreate } from '../components/artists/ArtistCreate/ArtistCreate'

const i18nProvider = polyglotI18nProvider(() => russianMessages, 'ru')

// test flag = true

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
    <Resource
      name='artists'
      list={ArtistList}
      show={ArtistShow}
      create={ArtistCreate}
      edit={ArtistEdit}
    />
  </Admin>
)
