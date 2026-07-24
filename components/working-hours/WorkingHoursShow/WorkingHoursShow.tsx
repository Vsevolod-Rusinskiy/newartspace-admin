import {
  DeleteButton,
  Show,
  SimpleShowLayout,
  TextField,
  TopToolbar,
} from 'react-admin'

export const WorkingHoursShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TopToolbar>
          <DeleteButton label='Удалить' />
        </TopToolbar>
        <TextField source='scheduleText' label='Дни работы' />
        <TextField source='appointmentText' label='По записи' />
      </SimpleShowLayout>
    </Show>
  )
}
