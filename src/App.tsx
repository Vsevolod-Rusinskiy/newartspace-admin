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
import { EventsList } from '../components/events/EventList/EventList'
import { EventShow } from '../components/events/EventShow/EventShow'
import { EventCreate } from '../components/events/EventCreate/EventCreate'
import { EventEdit } from '../components/events/EventEdit/EventEdit'
import { OrderList } from '../components/orders/OrderList/OrderList'
import { OrderShow } from '../components/orders/OrderShow/OrderShow'
import { OrderEdit } from '../components/orders/OrderEdit/OrderEdit'
import { WelcomeModalList } from '../components/welcomeModal/WelcomeModalList/WelcomeModalList'
import { WelcomeModalShow } from '../components/welcomeModal/WelcomeModalShow/WelcomeModalShow'
import { WelcomeModalCreate } from '../components/welcomeModal/WelcomeModalCreate/WelcomeModalCreate'
import { WelcomeModalEdit } from '../components/welcomeModal/WelcomeModalEdit/WelcomeModalEdit'
import { EventPhotoList } from '../components/event-photos/EventPhotoList/EventPhotoList'
import { EventPhotoShow } from '../components/event-photos/EventPhotoShow/EventPhotoShow'
import { EventPhotoCreate } from '../components/event-photos/EventPhotoCreate/EventPhotoCreate'
import { EventPhotoEdit } from '../components/event-photos/EventPhotoEdit/EventPhotoEdit'
import { AboutList } from '../components/about/AboutList/AboutList'
import { AboutShow } from '../components/about/AboutShow/AboutShow'
import { AboutCreate } from '../components/about/AboutCreate/AboutCreate'
import { AboutEdit } from '../components/about/AboutEdit/AboutEdit'
import { WorkingHoursList } from '../components/working-hours/WorkingHoursList/WorkingHoursList'
import { WorkingHoursShow } from '../components/working-hours/WorkingHoursShow/WorkingHoursShow'
import { WorkingHoursCreate } from '../components/working-hours/WorkingHoursCreate/WorkingHoursCreate'
import { WorkingHoursEdit } from '../components/working-hours/WorkingHoursEdit/WorkingHoursEdit'

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
    <Resource
      name='events'
      list={EventsList}
      show={EventShow}
      create={EventCreate}
      edit={EventEdit}
    />
    <Resource
      name='orders'
      list={OrderList}
      show={OrderShow}
      edit={OrderEdit}
    />
    <Resource
      name='welcome'
      list={WelcomeModalList}
      show={WelcomeModalShow}
      create={WelcomeModalCreate}
      edit={WelcomeModalEdit}
    />
    <Resource
      name='event-photos'
      list={EventPhotoList}
      show={EventPhotoShow}
      create={EventPhotoCreate}
      edit={EventPhotoEdit}
    />
    <Resource
      name='about'
      list={AboutList}
      show={AboutShow}
      create={AboutCreate}
      edit={AboutEdit}
    />
    <Resource
      name='working-hours'
      options={{ label: 'Working Hours' }}
      list={WorkingHoursList}
      show={WorkingHoursShow}
      create={WorkingHoursCreate}
      edit={WorkingHoursEdit}
    />
  </Admin>
)
